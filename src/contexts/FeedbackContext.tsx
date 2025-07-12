import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';
import {
  Feedback,
  FeedbackComment,
  FeedbackTag,
  Tag,
  UpvoteLog,
} from '../types/feedback';
import { Roadmap } from '../types/roadmap';
import { getApi, putApi } from '../utils/api/api';
import { useUser } from './UserContext';
import { useSocket } from './SocketContext';
import { SocketAction } from '../types/socket';
import { useApp } from './AppContext';

interface FeedbackState {
  activeTab: 'ideas' | 'comments';
  comments: FeedbackComment[];
  commentsForApproval: FeedbackComment[];
  error: string | null;
  filter: {
    filtering: boolean;
    sort: string;
    status: string;
    tags: string[];
    title: string;
  };
  filteredIdeas: Feedback[];
  ideas: Feedback[];
  ideasForApproval: Feedback[];
  items: (Partial<Feedback> & { content?: string; date?: string })[];
  listing: boolean;
  loading: boolean;
  roadmaps: Roadmap[];
  roadmapsWithUpvotes: Roadmap[];
  selectedIdea: Feedback | null;
  tags: Tag[];
  upvotes: UpvoteLog[];
}

type FeedbackAction =
  | { type: 'ADD_IDEA'; payload: Feedback }
  | { type: 'ADD_ROADMAP'; payload: Roadmap }
  | { type: 'UPDATE_UPVOTE'; payload: UpvoteLog }
  | { type: 'DELETE_ROADMAP'; payload: Roadmap }
  | { type: 'DELETE_BY_ID'; payload: number }
  | {
      type: 'DELETE_IDEA_IN_ROADMAP_BY_ID';
      payload: { roadmap_id: number; idea_id: number };
    }
  | { type: 'FILTER_SET_DEFAULT' }
  | { type: 'SET_COMMENTS'; payload: FeedbackComment[] }
  | { type: 'SET_COMMENTS_FOR_APPROVAL'; payload: FeedbackComment[] }
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
  | { type: 'SET_FILTERED_IDEAS'; payload: Feedback[] }
  | { type: 'SET_IDEAS'; payload: Feedback[] }
  | { type: 'SET_IDEAS_FOR_APPROVAL'; payload: Feedback[] }
  | {
      type: 'SET_ITEMS';
      payload: (Partial<Feedback> & { content?: string; date?: string })[];
    }
  | { type: 'SET_LISTING'; payload: boolean }
  | { type: 'SET_ROADMAPS'; payload: Roadmap[] }
  | { type: 'SET_ROADMAPS_WITH_UPVOTES'; payload: Roadmap[] }
  | { type: 'SET_SELECTED_IDEA'; payload: Feedback | null }
  | { type: 'SET_TAB'; payload: 'ideas' | 'comments' }
  | { type: 'SET_TAGS'; payload: Tag[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_UPVOTES'; payload: UpvoteLog[] }
  | { type: 'UPDATE_COMMENT'; payload: FeedbackComment }
  | { type: 'UPDATE_IDEA'; payload: Feedback }
  | {
      type: 'UPDATE_ITEM_STATUS';
      payload: {
        id: number;
        admin_approval_status: 'approved' | 'rejected' | 'pending';
      };
    }
  | { type: 'UPDATE_ROADMAP'; payload: Roadmap };

interface FeedbackContextType {
  state: FeedbackState;
  addIdea: (idea: Feedback) => Promise<void>;
  addRoadmap: (roadmap: Roadmap) => Promise<void>;
  deleteIdeaById: (id: number) => Promise<void>;
  deleteIdeaInRoadmapById: (
    roadmap_id: number,
    idea_id: number
  ) => Promise<void>;
  handleFilterData: (data: Roadmap) => Roadmap;
  handleFilterRoadmaps: (data: Roadmap[]) => Roadmap[];
  handleGetStatus: () => Promise<void>;
  handleListFeedback: (queryStringParameters?: {
    [name: string]: string;
  }) => Promise<void>;
  handleListTag: () => void;
  listComments: (queryStringParameters?: {
    [name: string]: string;
  }) => Promise<void>;
  listUpvotes: () => Promise<void>;
  setActiveTab: (tab: 'ideas' | 'comments') => Promise<void>;
  setDefaultFilter: () => Promise<void>;
  setFilter: (filter: {
    filtering: boolean;
    sort: string;
    status: string;
    tags: string[];
    title: string;
  }) => Promise<void>;
  setIdeas: (ideas: Feedback[]) => Promise<void>;
  setIdeasForApproval: (ideas: Feedback[]) => Promise<void>;
  setListing: (listing: boolean) => Promise<void>;
  setRoadmaps: (roadmaps: Roadmap[]) => Promise<void>;
  setSelectedIdea: (idea: Feedback | null) => Promise<void>;
  setTags: (tags: Tag[]) => Promise<void>;
  setUpvotes: (upvotes: UpvoteLog[]) => Promise<void>;
  updateIdea: (idea: Feedback) => Promise<void>;
  updateCommentStatus: (item: Partial<FeedbackComment>) => Promise<void>;
  updateItemStatus: (item: Partial<Feedback>) => Promise<void>;
  updateRoadmap: (roadmap: Roadmap) => Promise<void>;
}

const initialState: FeedbackState = {
  activeTab: 'ideas',
  comments: [],
  commentsForApproval: [],
  error: null,
  filter: {
    filtering: false,
    sort: 'Newest',
    status: '',
    tags: [],
    title: '',
  },
  filteredIdeas: [],
  ideas: [],
  ideasForApproval: [],
  items: [],
  listing: false,
  loading: true,
  roadmaps: [],
  roadmapsWithUpvotes: [],
  selectedIdea: null,
  tags: [],
  upvotes: [],
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

function feedbackReducer(
  state: FeedbackState,
  action: FeedbackAction
): FeedbackState {
  switch (action.type) {
    case 'ADD_IDEA':
      return {
        ...state,
        ideas: [action.payload, ...(state.ideas || [])],
        roadmaps: state.roadmaps?.map((roadmap) => {
          if (roadmap.id === action.payload.status_id) {
            return {
              ...roadmap,
              upvotes: [...(roadmap.upvotes ?? []), action.payload],
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
    case 'UPDATE_UPVOTE':
      return { ...state, upvotes: [...(state.upvotes ?? []), action.payload] };
    case 'DELETE_ROADMAP':
      return {
        ...state,
        roadmaps: state.roadmaps.filter(
          (roadmap) => roadmap.id !== action.payload.id
        ),
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
        filter: {
          filtering: false,
          sort: '',
          status: '',
          tags: [],
          title: '',
        },
      };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_COMMENTS_FOR_APPROVAL':
      return { ...state, commentsForApproval: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_FILTERED_IDEAS':
      return { ...state, filteredIdeas: action.payload };
    case 'SET_IDEAS':
      return { ...state, ideas: action.payload };
    case 'SET_IDEAS_FOR_APPROVAL':
      return { ...state, ideasForApproval: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_LISTING':
      return { ...state, listing: action.payload };
    case 'SET_ROADMAPS':
      return { ...state, roadmaps: action.payload || [] };
    case 'SET_ROADMAPS_WITH_UPVOTES':
      return { ...state, roadmapsWithUpvotes: action.payload || [] };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SELECTED_IDEA':
      return { ...state, selectedIdea: action.payload };
    case 'SET_UPVOTES':
      return { ...state, upvotes: action.payload };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case 'UPDATE_IDEA':
      return {
        ...state,
        ideas: state.ideas?.map((idea) =>
          idea.id === action.payload.id ? action.payload : idea
        ),
        roadmaps: state.roadmaps?.map((roadmap) => {
          if (roadmap.id === action.payload.status_id) {
            return {
              ...roadmap,
              upvotes: roadmap.upvotes?.find(
                (upvote) => upvote.id === action.payload.id
              )
                ? roadmap.upvotes?.map((upvote) =>
                    upvote.id === action.payload.id ? action.payload : upvote
                  )
                : [...(roadmap.upvotes ?? []), action.payload],
            };
          }
          return {
            ...roadmap,
            upvotes: roadmap.upvotes?.filter(
              (upvote) => upvote.id !== action.payload.id
            ),
          };
        }),
      };
    case 'UPDATE_ITEM_STATUS':
      return {
        ...state,
        ideas: state.ideas.map((item) =>
          item.id === action.payload.id
            ? { ...item, admin_approval_status: item.admin_approval_status }
            : item
        ),
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

  const { activeTab, comments, filter, filteredIdeas, ideas, roadmaps } = state;
  const { filtering, sort, status, tags, title } = filter;

  const { is_public } = useApp();
  const { user: userContext } = useUser();
  const { moderation, project } = userContext ?? {};
  const { id: projectId } = project ?? {};
  const {
    state: { action, message, socket },
    setAction,
  } = useSocket();

  useEffect(() => {
    if (window.location.pathname === '/emails') {
      handleListFeedback();
      listComments();
      listUpvotes();
    }
  }, []);

  useEffect(() => {
    if (
      !projectId ||
      !message?.data.projectId ||
      message.data.projectId !== projectId
    ) {
      return;
    }

    const comment: FeedbackComment = message.data.comment;
    const idea: Feedback = message.data.idea;
    const roadmap: Roadmap = message.data.roadmap;
    const roadmaps: Roadmap[] = message.data.roadmaps;
    const tag: Tag = message.data.tag;
    const tags: Tag[] = message.data.tags;

    switch (action) {
      case SocketAction.ADD_COMMENT:
        dispatch({
          type: 'SET_COMMENTS',
          payload: [...comments, comment],
        });
        break;
      case SocketAction.DELETE_COMMENT:
        dispatch({
          type: 'SET_COMMENTS',
          payload: comments.filter((prev) => prev.id !== comment.id),
        });
        break;
      case SocketAction.UPDATE_COMMENT:
        dispatch({ type: 'UPDATE_COMMENT', payload: comment });
        if (message.data.admin_approval_status === 'approved') {
          const updatedIdea = ideas.find(
            (idea) => idea.id === comment.feedback_id
          );
          if (updatedIdea) {
            updateIdea({
              ...updatedIdea,
              comment_count: (updatedIdea.comment_count ?? 0) + 1,
            });
          }
        }
        break;

      case SocketAction.ADD_IDEA:
        addIdea(idea);
        break;
      case SocketAction.DELETE_IDEA:
        if (idea.id) {
          deleteIdeaById(idea.id);
          if (idea.status_id) {
            deleteIdeaInRoadmapById(idea.status_id, idea.id);
          }
        }
        break;
      case SocketAction.UPDATE_IDEA:
        const updatedIdea = ideas.find((prev) => prev.id === idea.id);
        if (!updatedIdea) {
          addIdea(idea);
        } else {
          updateIdea(idea);
        }
        break;

      case SocketAction.UPDATE_TAG:
        handleListFeedback();
        break;

      case SocketAction.ADD_ROADMAP:
        addRoadmap(roadmap);
        break;
      case SocketAction.DELETE_ROADMAP:
        dispatch({ type: 'DELETE_ROADMAP', payload: roadmap });
        break;
      case SocketAction.UPDATE_ROADMAP:
        updateRoadmap(roadmap);
        break;
      case SocketAction.SET_ROADMAPS:
        setRoadmaps(roadmaps);
        break;

      case SocketAction.DELETE_TAG:
        dispatch({
          type: 'SET_TAGS',
          payload: state.tags.filter((prev) => prev.id !== tag.id),
        });
        break;
      case SocketAction.SET_TAGS:
        setTags(tags);
        break;

      case SocketAction.UPDATE_UPVOTE:
        listUpvotes();
        break;

      default:
        break;
    }
    setAction();
  }, [action]);

  useEffect(() => {
    if (window.location.pathname === '/moderation') {
      fetchItems(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    setCommentsForApproval(
      comments.filter(
        (comment) =>
          !comment.deleted && comment.admin_approval_status === 'pending'
      )
    );
  }, [comments]);

  useEffect(() => {
    setFilteredIdeas(
      ideas.filter(
        (idea) =>
          !idea.deleted &&
          (idea.admin_approval_status === 'approved' ||
            idea.admin_approval_status === undefined)
      )
    );
    setIdeasForApproval(
      ideas.filter(
        (idea) => !idea.deleted && idea.admin_approval_status === 'pending'
      )
    );
  }, [ideas]);

  useEffect(() => {
    if (projectId) {
      handleListFeedback();
      handleGetStatus();
      handleListTag();
    }
  }, [filtering, sort, status, tags.length, title, projectId]);

  useEffect(() => {
    if (filteredIdeas.length > 0 && roadmaps.length > 0) {
      setBoardItems(filteredIdeas, roadmaps);
    }
  }, [filteredIdeas, roadmaps]);

  const fetchItems = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (tab === 'ideas') {
        await handleListFeedback({ admin_approval_status: 'pending' });
      }
      if (tab === 'comments') {
        await listComments({ admin_approval_status: 'pending' });
      }
    } catch (error) {
      console.error({ error });
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to load feedback items. Please try again.',
      });
    }
  };

  const handleFilterData = (data: Roadmap) => {
    if (!title && !tags.length) {
      return data;
    }

    const filterTitleLower = title.toLowerCase();
    const filterTagLower = tags.map((tag) => tag.toLowerCase());

    const filteredUpvotes =
      data.upvotes?.filter((upvote) => {
        const titleMatch =
          !filterTitleLower ||
          upvote.title?.toLowerCase().includes(filterTitleLower);

        const tagMatch =
          !filterTagLower.length ||
          upvote.feedback_tags?.some((feedbackTag: FeedbackTag) => {
            const tag = feedbackTag.tag;
            return tag && filterTagLower.includes(tag.tag.toLowerCase());
          });

        return titleMatch && tagMatch;
      }) || [];

    const dataWithFilteredUpvotes = { ...data, upvotes: filteredUpvotes };

    return dataWithFilteredUpvotes;
  };

  const handleFilterRoadmaps = (data: Roadmap[]) => {
    if (!title && !tags.length) {
      return data;
    }

    const filterTitleLower = title.toLowerCase();
    const filterTagLower = tags.map((tag) => tag.toLowerCase());

    const filteredRoadmaps = data.map((roadmap) => {
      const filteredUpvotes =
        roadmap.upvotes?.filter((upvote) => {
          const titleMatch =
            !filterTitleLower ||
            upvote.title?.toLowerCase().includes(filterTitleLower);

          const tagMatch =
            !filterTagLower.length ||
            upvote.feedback_tags?.some((feedbackTag: FeedbackTag) => {
              const tag = feedbackTag.tag;
              return tag && filterTagLower.includes(tag.tag.toLowerCase());
            });

          return titleMatch && tagMatch;
        }) || [];

      return { ...roadmap, upvotes: filteredUpvotes };
    });

    return filteredRoadmaps;
  };

  const handleListFeedback = async (queryStringParameters?: {
    [name: string]: string;
  }) => {
    const url = is_public
      ? `feedback/list/${window.location.host}`
      : 'feedback/list-upvote';

    const {
      filter: { sort, status, tags, title },
    } = state;

    dispatch({ type: 'SET_LOADING', payload: true });
    setListing(true);
    getApi<Feedback[]>({
      url,
      params: {
        ...queryStringParameters,
        sort,
        status,
        tags: tags.join(','),
        title,
      },
      useSessionToken: is_public && moderation?.allow_anonymous_access === true,
    })
      .then((res) => {
        const { results } = res ?? {};
        const { data } = results ?? {};
        if (data) {
          setIdeas(data);
        }
      })
      .catch((err) => {
        console.error('handleListFeedback', { err });
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
        setListing(false);
      });
  };

  const handleListTag = () => {
    getApi<Tag[]>({
      url: 'tags',
      useCustomerKey: is_public && moderation?.allow_anonymous_access === true,
    }).then((res) => {
      if (res.results.data) {
        setTags(res.results.data);
      }
    });
  };

  const handleGetStatus = async () => {
    setListing(true);
    getApi<Roadmap[]>({ url: 'roadmaps' })
      .then((res) => {
        if (res.results.data) {
          const data = res.results.data;
          setRoadmaps(data);
        }
      })
      .finally(() => setListing(false));
  };

  const setBoardItems = (ideas: Feedback[], roadmaps: Roadmap[]) => {
    const roadmapUpvotes = roadmaps.map((roadmap) => ({
      ...roadmap,
      upvotes: ideas
        .filter((idea) => !idea.deleted && idea.status_id === roadmap.id)
        .sort((a, b) => a.index - b.index),
    }));

    dispatch({ type: 'SET_ROADMAPS_WITH_UPVOTES', payload: roadmapUpvotes });
  };

  const addIdea = async (idea: Feedback) => {
    dispatch({ type: 'ADD_IDEA', payload: idea });
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

  const listComments = async (queryStringParameters?: {
    [name: string]: string;
  }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    getApi<FeedbackComment[]>({
      url: 'feedback/comments',
      params: queryStringParameters,
      useSessionToken: is_public && moderation?.allow_anonymous_access === true,
    })
      .then((res) => {
        if (res.results.data) {
          dispatch({ type: 'SET_COMMENTS', payload: res.results.data });
        }
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const listUpvotes = async () => {
    getApi<UpvoteLog[]>({ url: 'feedback/upvotes' }).then((res) => {
      if (res.results.data) {
        dispatch({ type: 'SET_UPVOTES', payload: res.results.data });
      }
    });
  };

  const setActiveTab = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_TAB', payload: tab });
  };

  const setCommentsForApproval = async (comments: FeedbackComment[]) => {
    dispatch({ type: 'SET_COMMENTS_FOR_APPROVAL', payload: comments });
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

  const setFilteredIdeas = async (filteredIdeas: Feedback[]) => {
    dispatch({ type: 'SET_FILTERED_IDEAS', payload: filteredIdeas });
  };

  const setListing = async (listing: boolean) => {
    dispatch({ type: 'SET_LISTING', payload: listing });
  };

  const setIdeas = async (ideas: Feedback[]) => {
    dispatch({ type: 'SET_IDEAS', payload: ideas });
  };

  const setIdeasForApproval = async (ideas: Feedback[]) => {
    dispatch({ type: 'SET_IDEAS_FOR_APPROVAL', payload: ideas });
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

  const setUpvotes = async (upvotes: UpvoteLog[]) => {
    dispatch({ type: 'SET_UPVOTES', payload: upvotes });
  };

  const updateIdea = async (idea: Feedback) => {
    dispatch({ type: 'UPDATE_IDEA', payload: idea });
  };

  const updateCommentStatus = async (comment: Partial<FeedbackComment>) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    const { id, feedback_id, admin_approval_status, rejected_reason } = comment;
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      putApi<FeedbackComment>(`feedback/${feedback_id}/comment/${id}`, {
        admin_approval_status,
        rejected_reason,
      })
        .then((res) => {
          const {
            results: { data },
          } = res;
          if (data) {
            socket?.emit('message', {
              action: SocketAction.UPDATE_COMMENT,
              data: {
                admin_approval_status,
                comment: data,
                projectId,
              },
            });
          }
        })
        .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
    } catch (error) {
      console.error({ error });
      dispatch({
        type: 'SET_ERROR',
        payload: `Failed to ${admin_approval_status} comment. Please try again.`,
      });
    }
  };

  const updateItemStatus = async (item: Partial<Feedback>) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    const { id, admin_approval_status, rejected_reason } = item;
    if (id === 0) {
      return;
    }
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      putApi<Feedback>(`feedback/${id}`, {
        admin_approval_status,
        rejected_reason,
        title: item.title,
        status_name: item.status?.name,
      })
        .then((res) => {
          if (res.results.data) {
            const updatedIdea = res.results.data;
            updateIdea(updatedIdea);
            socket?.emit('message', {
              action: SocketAction.UPDATE_IDEA,
              data: { idea: updatedIdea, projectId },
            });
          }
        })
        .finally(() => {
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    } catch (error) {
      console.error({ error });
      dispatch({
        type: 'SET_ERROR',
        payload: `Failed to ${admin_approval_status} item. Please try again.`,
      });
    }
  };

  const updateRoadmap = async (roadmap: Roadmap) => {
    dispatch({ type: 'UPDATE_ROADMAP', payload: roadmap });
  };

  const value = useMemo(
    () => ({
      state,
      addIdea,
      addRoadmap,
      deleteIdeaById,
      handleFilterData,
      handleFilterRoadmaps,
      handleGetStatus,
      handleListFeedback,
      handleListTag,
      deleteIdeaInRoadmapById,
      listComments,
      listUpvotes,
      setActiveTab,
      setDefaultFilter,
      setFilter,
      setIdeas,
      setIdeasForApproval,
      setListing,
      setRoadmaps,
      setSelectedIdea,
      setTags,
      setUpvotes,
      updateCommentStatus,
      updateIdea,
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
