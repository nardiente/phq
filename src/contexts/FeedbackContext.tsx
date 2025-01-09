import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from 'react';
import { Feedback, Tag } from '../types/feedback';
import { Roadmap } from '../types/roadmap';

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
  items: (Partial<Feedback> & {
    content?: string;
    date?: string;
  })[];
  roadmaps?: Roadmap[];
  activeTab: 'ideas' | 'comments';
  loading: boolean;
  error: string | null;
  tags: any[];
  selectedIdea: any;
  filter: {
    tags: string[];
    title: string;
  };
}

type FeedbackAction =
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
  | { type: 'SET_FILTER_TAGS'; payload: any[] }
  | { type: 'SET_FILTER_TITLE'; payload: string }
  | { type: 'SET_IDEAS'; payload: Feedback[] }
  | {
      type: 'SET_ITEMS';
      payload: (Partial<Feedback> & {
        content?: string;
        date?: string;
      })[];
    }
  | { type: 'SET_LISTING'; payload: boolean }
  | { type: 'SET_SELECTED_IDEA'; payload: Feedback }
  | { type: 'SET_TAB'; payload: 'ideas' | 'comments' }
  | { type: 'SET_TAGS'; payload: Tag[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | {
      type: 'UPDATE_IDEA';
      payload: Feedback;
    }
  | {
      type: 'UPDATE_IDEA_IN_ROADMAP';
      payload: { roadmap_id: number; idea: Feedback };
    }
  | {
      type: 'UPDATE_ITEM_STATUS';
      payload: { id: number; status: 'approved' | 'rejected' };
    };

interface FeedbackContextType {
  state: FeedbackState;
  setActiveTab: (tab: 'ideas' | 'comments') => Promise<void>;
  setFilter: (filter: {
    filtering: boolean;
    sort: string;
    status: string;
    tags: any[];
    title: string;
  }) => Promise<void>;
  setFilterTags: (tags: any[]) => Promise<void>;
  setFilterTitle: (title: string) => Promise<void>;
  setIdeas: (ideas: Feedback[]) => Promise<void>;
  setListing: (listing: boolean) => Promise<void>;
  setSelectedIdea: (idea: Feedback) => Promise<void>;
  setTags: (tags: Tag[]) => Promise<void>;
  updateIdea: (idea: Feedback) => Promise<void>;
  updateIdeaInRoadmap: (roadmap_id: number, idea: Feedback) => Promise<void>;
  updateItemStatus: (
    id: number,
    status: 'approved' | 'rejected'
  ) => Promise<void>;
}

const initialState: FeedbackState = {
  listing: false,
  filters: {
    filtering: false,
    sort: '',
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
  filter: {
    tags: [],
    title: '',
  },
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

const mockItems: {
  ideas: (Partial<Feedback> & {
    content?: string;
    date?: string;
  })[];
  comments: (Partial<Feedback> & {
    content?: string;
    date?: string;
  })[];
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
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTER':
      return {
        ...state,
        filters: action.payload,
      };
    case 'SET_FILTER_TAGS':
      return {
        ...state,
        filter: {
          ...state.filter,
          tags: action.payload,
        },
      };
    case 'SET_FILTER_TITLE':
      return {
        ...state,
        filter: {
          ...state.filter,
          title: action.payload,
        },
      };
    case 'SET_IDEAS':
      return {
        ...state,
        ideas: action.payload,
      };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_LISTING':
      return { ...state, listing: action.payload };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SELECTED_IDEA':
      return {
        ...state,
        selectedIdea: action.payload,
      };
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
    default:
      return state;
  }
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

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

  const setActiveTab = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_TAB', payload: tab });
    await fetchItems(tab);
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

  const setSelectedIdea = async (idea: Feedback) => {
    dispatch({ type: 'SET_SELECTED_IDEA', payload: idea });
  };

  const setTags = async (tags: Tag[]) => {
    dispatch({ type: 'SET_TAGS', payload: tags });
  };

  const updateIdea = async (idea: Feedback) => {
    dispatch({ type: 'UPDATE_IDEA', payload: idea });
  };

  const updateIdeaInRoadmap = async (roadmap_id: number, idea: Feedback) => {
    dispatch({
      type: 'UPDATE_IDEA_IN_ROADMAP',
      payload: { roadmap_id, idea },
    });
  };

  const updateItemStatus = async (
    id: number,
    status: 'approved' | 'rejected'
  ) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch({
        type: 'UPDATE_ITEM_STATUS',
        payload: { id, status },
      });
    } catch (error) {
      console.error({ error });
      dispatch({
        type: 'SET_ERROR',
        payload: `Failed to ${status} item. Please try again.`,
      });
    }
  };

  const value = useMemo(
    () => ({
      state,
      setActiveTab,
      setFilter,
      setFilterTags,
      setFilterTitle,
      setIdeas,
      setListing,
      setSelectedIdea,
      setTags,
      updateIdea,
      updateIdeaInRoadmap,
      updateItemStatus,
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
