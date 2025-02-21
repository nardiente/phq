import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from 'react';
import { Feedback, Tag } from '../types/feedback';
import { Roadmap } from '../types/roadmap';
import { getApi } from '../utils/api/api';
import { useUser } from './UserContext';

interface FeedbackState {
  listing: boolean;
  filters: {
    filtering: boolean;
    sort: string;
    status: string;
    tags: any[];
    title: string;
  };
  ideas: Feedback[];
  items: (Partial<Feedback> & { content?: string; date?: string })[];
  roadmaps?: Roadmap[];
  activeTab: 'ideas' | 'comments';
  loading: boolean;
  error: string | null;
  tags: any[];
  selectedIdea: Feedback | null;
  filter: { tags: string[]; title: string };
}

type FeedbackAction =
  | { type: 'ADD_IDEA'; payload: Feedback }
  | {
      type: 'ADD_IDEA_IN_ROADMAP';
      payload: { roadmap_id: number; idea: Feedback };
    }
  | { type: 'ADD_ROADMAP'; payload: Roadmap }
  | { type: 'DELETE_BY_ID'; payload: number }
  | {
      type: 'DELETE_IDEA_IN_ROADMAP_BY_ID';
      payload: { roadmap_id: number; idea_id: number };
    }
  | { type: 'FILTER_SET_DEFAULT' }
  | {
      type: 'SET_FILTER';
      payload: {
        filtering: boolean;
        sort: string;
        status: string;
        tags: any[];
        title: string;
      };
    }
  | { type: 'SET_FILTER_DEFAULT' }
  | { type: 'SET_FILTER_TAGS'; payload: any[] }
  | { type: 'SET_FILTER_TITLE'; payload: string }
  | { type: 'SET_IDEAS'; payload: Feedback[] }
  | {
      type: 'SET_ITEMS';
      payload: (Partial<Feedback> & { content?: string; date?: string })[];
    }
  | { type: 'SET_LISTING'; payload: boolean }
  | { type: 'SET_ROADMAPS'; payload: Roadmap[] }
  | { type: 'SET_SELECTED_IDEA'; payload: Feedback | null }
  | { type: 'SET_TAB'; payload: 'ideas' | 'comments' }
  | { type: 'SET_TAGS'; payload: Tag[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_IDEA'; payload: Feedback }
  | {
      type: 'UPDATE_IDEA_IN_ROADMAP';
      payload: { roadmap_id: number; idea: Feedback };
    }
  | {
      type: 'UPDATE_ITEM_STATUS';
      payload: { id: number; status: 'approved' | 'rejected' };
    }
  | { type: 'UPDATE_ROADMAP'; payload: Roadmap };

interface FeedbackContextType {
  state: FeedbackState;
  handleListFeedback: (filtering: boolean) => Promise<void>;
  addIdea: (idea: Feedback) => Promise<void>;
  addIdeaInRoadmap: (roadmap_id: number, idea: Feedback) => Promise<void>;
  addRoadmap: (roadmap: Roadmap) => Promise<void>;
  deleteIdeaById: (id: number) => Promise<void>;
  deleteIdeaInRoadmapById: (
    roadmap_id: number,
    idea_id: number
  ) => Promise<void>;
  setActiveTab: (tab: 'ideas' | 'comments') => Promise<void>;
  setDefaultFilter: () => Promise<void>;
  setFilter: (filter: {
    filtering: boolean;
    sort: string;
    status: string;
    tags: any[];
    title: string;
  }) => Promise<void>;
  setFilterDefault: () => Promise<void>;
  setFilterTags: (tags: any[]) => Promise<void>;
  setFilterTitle: (title: string) => Promise<void>;
  setIdeas: (ideas: Feedback[]) => Promise<void>;
  setListing: (listing: boolean) => Promise<void>;
  setRoadmaps: (roadmaps: Roadmap[]) => Promise<void>;
  setSelectedIdea: (idea: Feedback | null) => Promise<void>;
  setTags: (tags: Tag[]) => Promise<void>;
  updateIdea: (idea: Feedback) => Promise<void>;
  updateIdeaInRoadmap: (roadmap_id: number, idea: Feedback) => Promise<void>;
  updateItemStatus: (
    id: number,
    status: 'approved' | 'rejected'
  ) => Promise<void>;
  updateRoadmap: (roadmap: Roadmap) => Promise<void>;
}

const initialState: FeedbackState = {
  listing: false,
  filters: {
    filtering: false,
    sort: 'Newest',
    status: '',
    tags: [],
    title: '',
  },
  ideas: [],
  items: [],
  activeTab: 'ideas',
  loading: false,
  error: null,
  tags: [],
  selectedIdea: null,
  filter: { tags: [], title: '' },
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

const mockItems: {
  ideas: (Partial<Feedback> & { content?: string; date?: string })[];
  comments: (Partial<Feedback> & { content?: string; date?: string })[];
} = {
  ideas: [
    {
      id: 1,
      title: 'Add dark mode support',
      description:
        'It would be great to have a dark mode option for better visibility in low-light conditions. This would help reduce eye strain during night-time usage.',
      author: { full_name: 'Sarah Chen' },
      created_at: new Date('Mar 15, 2024'),
      tags: ['Enhancement'],
      vote: 1,
    },
    {
      id: 2,
      title: 'Bulk action support',
      description:
        'Please add the ability to perform actions on multiple items at once. This would save a lot of time when managing large numbers of items.',
      author: { full_name: 'Michael Park' },
      created_at: new Date('Mar 14, 2024'),
      tags: ['Feature'],
      vote: 1,
    },
    {
      id: 3,
      title: 'Export data to CSV',
      description:
        'Would love to have the ability to export our data to CSV format for further analysis in spreadsheet software.',
      author: { full_name: 'Emma Rodriguez' },
      created_at: new Date('Mar 13, 2024'),
      tags: ['Feature'],
      vote: 1,
    },
  ],
  comments: [
    {
      id: 4,
      title: 'Re: Mobile responsiveness',
      content:
        'The mobile experience could be improved. The buttons are too small to tap accurately on my phone.',
      author: { full_name: 'David Kim' },
      date: 'Mar 15, 2024',
    },
    {
      id: 5,
      title: 'Re: Search functionality',
      content:
        'The new search feature is great, but it would be even better if we could filter by date range.',
      author: { full_name: 'Lisa Thompson' },
      date: 'Mar 14, 2024',
    },
    {
      id: 6,
      title: 'Re: Dashboard widgets',
      content:
        'Love the new dashboard layout! One suggestion: allow us to resize the widgets for better customization.',
      author: { full_name: 'James Wilson' },
      date: 'Mar 13, 2024',
    },
  ],
};

function feedbackReducer(
  state: FeedbackState,
  action: FeedbackAction
): FeedbackState {
  switch (action.type) {
    case 'ADD_IDEA':
      return { ...state, ideas: [action.payload, ...(state.ideas || [])] };
    case 'ADD_IDEA_IN_ROADMAP':
      return {
        ...state,
        roadmaps: state.roadmaps?.map((roadmap) => {
          if (roadmap.id === action.payload.roadmap_id) {
            return {
              ...roadmap,
              upvotes: [...(roadmap.upvotes ?? []), action.payload.idea],
            };
          }
          return roadmap;
        }),
      };
    case 'ADD_ROADMAP':
      return {
        ...state,
        roadmaps: [...(state.roadmaps || []), action.payload],
      };
    case 'DELETE_BY_ID':
      return {
        ...state,
        ideas: state.ideas?.filter((idea) => idea.id != action.payload),
      };
    case 'DELETE_IDEA_IN_ROADMAP_BY_ID':
      return {
        ...state,
        roadmaps: state.roadmaps?.map((roadmap) => {
          if (roadmap.id === action.payload.roadmap_id) {
            return {
              ...roadmap,
              upvotes: roadmap.upvotes?.filter(
                (upvote) => upvote.id !== action.payload.idea_id
              ),
            };
          }
          return roadmap;
        }),
      };
    case 'FILTER_SET_DEFAULT':
      return {
        ...state,
        filters: {
          filtering: false,
          sort: '',
          status: '',
          tags: [],
          title: '',
        },
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: action.payload };
    case 'SET_FILTER_DEFAULT':
      return { ...state, filter: { tags: [], title: '' } };
    case 'SET_FILTER_TAGS':
      return { ...state, filter: { ...state.filter, tags: action.payload } };
    case 'SET_FILTER_TITLE':
      return { ...state, filter: { ...state.filter, title: action.payload } };
    case 'SET_IDEAS':
      return { ...state, ideas: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_LISTING':
      return { ...state, listing: action.payload };
    case 'SET_ROADMAPS':
      return { ...state, roadmaps: action.payload || [] };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SELECTED_IDEA':
      return { ...state, selectedIdea: action.payload };
    case 'UPDATE_IDEA':
      return {
        ...state,
        ideas: state.ideas?.map((idea) =>
          idea.id === action.payload.id ? action.payload : idea
        ),
      };
    case 'UPDATE_IDEA_IN_ROADMAP':
      return {
        ...state,
        roadmaps: state.roadmaps?.map((roadmap) => {
          if (roadmap.id === action.payload.roadmap_id) {
            return {
              ...roadmap,
              upvotes: roadmap.upvotes?.map((upvote) =>
                upvote.id === action.payload.idea.id
                  ? action.payload.idea
                  : upvote
              ),
            };
          }
          return roadmap;
        }),
      };
    case 'UPDATE_ITEM_STATUS':
      return {
        ...state,
        ideas: state.ideas.filter((item) => item.id !== action.payload.id),
      };
    case 'UPDATE_ROADMAP':
      return {
        ...state,
        roadmaps: state.roadmaps?.map((roadmap) =>
          roadmap.id === action.payload.id ? action.payload : roadmap
        ),
      };
    default:
      return state;
  }
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  const { user } = useUser();
  const { moderation } = user ?? {};

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  const fetchItems = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const items = mockItems[tab];
      dispatch({ type: 'SET_ITEMS', payload: items });
    } catch (error) {
      console.error({ error });
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to load feedback items. Please try again.',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleListFeedback = async (filtering: boolean) => {
    const url = is_public
      ? `feedback/list/${window.location.host}`
      : 'feedback/list-upvote';

    const {
      filters: { sort, status, tags, title },
    } = state;

    dispatch({ type: 'SET_LOADING', payload: true });
    setListing(true);
    getApi<Feedback[]>({
      url,
      params: { sort, status, tags: tags.join(','), title },
      useSessionToken: is_public && moderation?.user_login === true,
    })
      .then((res) => {
        setListing(false);
        if (res.results.data) {
          setIdeas(res.results.data);
        }
        if (!filtering) {
          handleListTag();
        }
      })
      .catch((err) => console.error('handleListFeedback', { err }))
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const handleListTag = () => {
    getApi<Tag[]>({
      url: 'tags',
      params: is_public ? { domain: window.location.host } : undefined,
      useCustomerKey: is_public && moderation?.user_login === true,
    }).then((res) => {
      if (res.results.data) {
        setTags(res.results.data);
      }
      handleGetStatus();
    });
  };

  const handleGetStatus = () => {
    getApi<Roadmap[]>({
      url: 'roadmaps',
      params: { domain: window.location.host },
    }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setRoadmaps(data);
      }
    });
  };

  const addIdea = async (idea: Feedback) => {
    dispatch({ type: 'ADD_IDEA', payload: idea });
  };

  const addIdeaInRoadmap = async (roadmap_id: number, idea: Feedback) => {
    dispatch({ type: 'ADD_IDEA_IN_ROADMAP', payload: { roadmap_id, idea } });
  };

  const addRoadmap = async (roadmap: Roadmap) => {
    dispatch({ type: 'ADD_ROADMAP', payload: roadmap });
  };

  const deleteIdeaById = async (id: number) => {
    dispatch({ type: 'DELETE_BY_ID', payload: id });
  };

  const deleteIdeaInRoadmapById = async (
    roadmap_id: number,
    idea_id: number
  ) => {
    dispatch({
      type: 'DELETE_IDEA_IN_ROADMAP_BY_ID',
      payload: { roadmap_id, idea_id },
    });
  };

  const setActiveTab = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_TAB', payload: tab });
    await fetchItems(tab);
  };

  const setDefaultFilter = async () => {
    dispatch({ type: 'FILTER_SET_DEFAULT' });
  };

  const setFilter = async (filter: {
    filtering: boolean;
    sort: string;
    status: string;
    tags: any[];
    title: string;
  }) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setFilterDefault = async () => {
    dispatch({ type: 'SET_FILTER_DEFAULT' });
  };

  const setFilterTags = async (tags: any[]) => {
    dispatch({ type: 'SET_FILTER_TAGS', payload: tags });
  };

  const setFilterTitle = async (title: string) => {
    dispatch({ type: 'SET_FILTER_TITLE', payload: title });
  };

  const setListing = async (listing: boolean) => {
    dispatch({ type: 'SET_LISTING', payload: listing });
  };

  const setIdeas = async (ideas: Feedback[]) => {
    dispatch({ type: 'SET_IDEAS', payload: ideas });
  };

  const setRoadmaps = async (roadmaps: Roadmap[]) => {
    dispatch({ type: 'SET_ROADMAPS', payload: roadmaps });
  };

  const setSelectedIdea = async (idea: Feedback | null) => {
    dispatch({ type: 'SET_SELECTED_IDEA', payload: idea });
  };

  const setTags = async (tags: Tag[]) => {
    dispatch({ type: 'SET_TAGS', payload: tags });
  };

  const updateIdea = async (idea: Feedback) => {
    dispatch({ type: 'UPDATE_IDEA', payload: idea });
  };

  const updateIdeaInRoadmap = async (roadmap_id: number, idea: Feedback) => {
    dispatch({ type: 'UPDATE_IDEA_IN_ROADMAP', payload: { roadmap_id, idea } });
  };

  const updateItemStatus = async (
    id: number,
    status: 'approved' | 'rejected'
  ) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch({ type: 'UPDATE_ITEM_STATUS', payload: { id, status } });
    } catch (error) {
      console.error({ error });
      dispatch({
        type: 'SET_ERROR',
        payload: `Failed to ${status} item. Please try again.`,
      });
    }
  };

  const updateRoadmap = async (roadmap: Roadmap) => {
    dispatch({ type: 'UPDATE_ROADMAP', payload: roadmap });
  };

  const value = useMemo(
    () => ({
      state,
      handleListFeedback,
      addIdea,
      addIdeaInRoadmap,
      addRoadmap,
      deleteIdeaById,
      deleteIdeaInRoadmapById,
      setActiveTab,
      setDefaultFilter,
      setFilter,
      setFilterDefault,
      setFilterTags,
      setFilterTitle,
      setIdeas,
      setListing,
      setRoadmaps,
      setSelectedIdea,
      setTags,
      updateIdea,
      updateIdeaInRoadmap,
      updateItemStatus,
      updateRoadmap,
    }),
    [state]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}
