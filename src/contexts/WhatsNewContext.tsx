import { createContext, useContext, useEffect, useMemo } from 'react';

import { ReactNode } from 'react';
import { useReducer } from 'react';
import { ChangeType, Image, WhatsNew } from '../types/whats-new';
import { getApi } from '../utils/api/api';
import { useApp } from './AppContext';

interface State {
  change_types: ChangeType[];
  fetching: boolean;
  is_continue_reading: boolean;
  posts: WhatsNew[];
  selectedPost?: WhatsNew;
  showAddForm: boolean;
  statusFilter?: number[];
  whats_new_id: number;
  whats_new_preview_id: number;
}

const initialState: State = {
  change_types: [],
  fetching: false,
  is_continue_reading: false,
  posts: [],
  showAddForm: false,
  statusFilter: [],
  whats_new_id: 0,
  whats_new_preview_id: 0,
};

enum ActionTypes {
  ADD_POST = 'ADD_POST',
  DELETE = 'DELETE',
  DELETE_BY_ID = 'DELETE_BY_ID',
  SET_CHANGE_TYPES = 'SET_CHANGE_TYPES',
  SET_FETCHING = 'SET_FETCHING',
  SET_IS_CONTINUE_READING = 'SET_IS_CONTINUE_READING',
  SET_POSTS = 'SET_POSTS',
  SET_SELECTED_POST = 'SET_SELECTED_POST',
  SET_SHOW_ADD_FORM = 'SET_SHOW_ADD_FORM',
  SET_STATUS_FILTER = 'SET_STATUS_FILTER',
  SET_WHATS_NEW_ID = 'SET_WHATS_NEW_ID',
  SET_WHATS_NEW_PREVIEW_ID = 'SET_WHATS_NEW_PREVIEW_ID',
  UPDATE = 'UPDATE',
}

type Action =
  | { type: ActionTypes.ADD_POST; payload: WhatsNew }
  | { type: ActionTypes.DELETE; payload: WhatsNew }
  | { type: ActionTypes.DELETE_BY_ID; payload: number }
  | { type: ActionTypes.SET_CHANGE_TYPES; payload: ChangeType[] }
  | { type: ActionTypes.SET_FETCHING; payload: boolean }
  | {
      type: ActionTypes.SET_IS_CONTINUE_READING;
      payload: boolean;
    }
  | { type: ActionTypes.SET_POSTS; payload: WhatsNew[] }
  | { type: ActionTypes.SET_SELECTED_POST; payload?: WhatsNew }
  | { type: ActionTypes.SET_SHOW_ADD_FORM; payload: boolean }
  | { type: ActionTypes.SET_STATUS_FILTER; payload?: number[] }
  | { type: ActionTypes.SET_WHATS_NEW_ID; payload: number }
  | {
      type: ActionTypes.SET_WHATS_NEW_PREVIEW_ID;
      payload: number;
    }
  | { type: ActionTypes.UPDATE; payload: WhatsNew };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...(state.posts ?? [])],
      };
    case ActionTypes.DELETE:
      return {
        ...state,
        posts: state.posts?.filter((post) => post.id != action.payload.id),
      };
    case ActionTypes.DELETE_BY_ID:
      return {
        ...state,
        posts: state.posts?.filter((post) => post.id != action.payload),
      };
    case ActionTypes.UPDATE:
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case ActionTypes.SET_CHANGE_TYPES:
      return { ...state, change_types: action.payload };
    case ActionTypes.SET_FETCHING:
      return { ...state, fetching: action.payload };
    case ActionTypes.SET_IS_CONTINUE_READING:
      return {
        ...state,
        is_continue_reading: action.payload,
      };
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ActionTypes.SET_SELECTED_POST:
      return { ...state, selectedPost: action.payload };
    case ActionTypes.SET_SHOW_ADD_FORM:
      return { ...state, showAddForm: action.payload };
    case ActionTypes.SET_STATUS_FILTER:
      return { ...state, statusFilter: action.payload };
    case ActionTypes.SET_WHATS_NEW_ID:
      return {
        ...state,
        whats_new_id: action.payload,
      };
    case ActionTypes.SET_WHATS_NEW_PREVIEW_ID:
      return {
        ...state,
        whats_new_preview_id: action.payload,
      };
    default:
      return state;
  }
}

interface ContextType {
  state: State;
  listWhatsNew: (filters?: number[]) => Promise<void>;
  addPost: (post: WhatsNew) => Promise<void>;
  deletePost: (post: WhatsNew) => Promise<void>;
  deletePostById: (id: number) => Promise<void>;
  updatePost: (post: WhatsNew) => Promise<void>;
  setFetching: (fetching: boolean) => Promise<void>;
  setIsContinueReading: (is_continue_reading: boolean) => Promise<void>;
  setPosts: (posts: WhatsNew[]) => Promise<void>;
  setSelectedPost: (selectedPost?: WhatsNew) => Promise<void>;
  setShowAddForm: (showAddForm: boolean) => Promise<void>;
  setWhatsNewId: (whats_new_id: number) => Promise<void>;
  setWhatsNewPreviewId: (whats_new_preview_id: number) => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

export function WhatsNewProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { is_public } = useApp();

  useEffect(() => {
    listChangeType();
    if (window.location.pathname === '/widgets') {
      listWhatsNew();
    }
  }, []);

  const listChangeType = async () => {
    getApi<ChangeType[]>({ url: 'whatsnew/change-types' }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setChangeTypes(data);
      }
    });
  };

  const listWhatsNew = async (filters?: number[]) => {
    setStatusFilter(filters);
    const url = is_public
      ? `whatsnew/public/${window.location.host}`
      : 'whatsnew';

    setFetching(true);
    getApi<WhatsNew[]>({
      url,
      params:
        filters && filters.length > 0
          ? { change_type_id: filters?.join(',') }
          : undefined,
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        const data = res.results.data;
        setPosts(
          data.map((datum) => {
            if (!datum.images) {
              datum.images = [
                {
                  image: datum.image,
                  image_height: datum.image_height,
                  image_width: datum.image_width,
                },
              ] as Image[];
            }
            return datum;
          })
        );
        setIsContinueReading(false);
      }
    });
  };

  const addPost = async (post: WhatsNew) => {
    dispatch({ type: ActionTypes.ADD_POST, payload: post });
  };

  const deletePost = async (post: WhatsNew) => {
    dispatch({ type: ActionTypes.DELETE, payload: post });
  };

  const deletePostById = async (id: number) => {
    dispatch({ type: ActionTypes.DELETE_BY_ID, payload: id });
  };

  const updatePost = async (post: WhatsNew) => {
    dispatch({ type: ActionTypes.UPDATE, payload: post });
  };

  const setChangeTypes = async (changeTypes: ChangeType[]) => {
    dispatch({ type: ActionTypes.SET_CHANGE_TYPES, payload: changeTypes });
  };

  const setFetching = async (fetching: boolean) => {
    dispatch({ type: ActionTypes.SET_FETCHING, payload: fetching });
  };

  const setIsContinueReading = async (is_continue_reading: boolean) => {
    dispatch({
      type: ActionTypes.SET_IS_CONTINUE_READING,
      payload: is_continue_reading,
    });
  };

  const setPosts = async (posts: WhatsNew[]) => {
    dispatch({ type: ActionTypes.SET_POSTS, payload: posts });
  };

  const setSelectedPost = async (selectedPost?: WhatsNew) => {
    dispatch({ type: ActionTypes.SET_SELECTED_POST, payload: selectedPost });
  };

  const setShowAddForm = async (showAddForm: boolean) => {
    dispatch({ type: ActionTypes.SET_SHOW_ADD_FORM, payload: showAddForm });
  };

  const setStatusFilter = async (filters?: number[]) => {
    dispatch({ type: ActionTypes.SET_STATUS_FILTER, payload: filters });
  };

  const setWhatsNewId = async (whats_new_id: number) => {
    dispatch({ type: ActionTypes.SET_WHATS_NEW_ID, payload: whats_new_id });
  };

  const setWhatsNewPreviewId = async (whats_new_preview_id: number) => {
    dispatch({
      type: ActionTypes.SET_WHATS_NEW_PREVIEW_ID,
      payload: whats_new_preview_id,
    });
  };

  const value = useMemo(
    () => ({
      state,
      listWhatsNew,
      addPost,
      deletePost,
      deletePostById,
      updatePost,
      setFetching,
      setIsContinueReading,
      setPosts,
      setSelectedPost,
      setShowAddForm,
      setWhatsNewId,
      setWhatsNewPreviewId,
    }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useWhatsNew() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useWhatsNew must be used within a WhatsNewProvider');
  }
  return context;
}
