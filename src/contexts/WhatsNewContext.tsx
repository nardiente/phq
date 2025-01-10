import { createContext, useContext, useMemo } from 'react';

import { ReactNode } from 'react';
import { useReducer } from 'react';
import { WhatsNew } from '../types/whats-new';

interface State {
  posts: WhatsNew[];
}

const initialState: State = {
  posts: [],
};

enum ActionTypes {
  SET_POSTS = 'SET_POSTS',
  ADD_POST = 'ADD_POST',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  DELETE_BY_ID = 'DELETE_BY_ID',
}

type Action =
  | { type: ActionTypes.SET_POSTS; payload: WhatsNew[] }
  | { type: ActionTypes.ADD_POST; payload: WhatsNew }
  | { type: ActionTypes.UPDATE; payload: WhatsNew }
  | { type: ActionTypes.DELETE; payload: WhatsNew }
  | { type: ActionTypes.DELETE_BY_ID; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ActionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...(state.posts ?? [])],
      };
    case ActionTypes.UPDATE:
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
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
    default:
      return state;
  }
}

interface ContextType {
  state: State;
  setPosts: (posts: WhatsNew[]) => Promise<void>;
  addPost: (post: WhatsNew) => Promise<void>;
  updatePost: (post: WhatsNew) => Promise<void>;
  deletePost: (post: WhatsNew) => Promise<void>;
  deletePostById: (id: number) => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

export function WhatsNewProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPosts = async (posts: WhatsNew[]) => {
    dispatch({ type: ActionTypes.SET_POSTS, payload: posts });
  };

  const addPost = async (post: WhatsNew) => {
    dispatch({ type: ActionTypes.ADD_POST, payload: post });
  };

  const updatePost = async (post: WhatsNew) => {
    dispatch({ type: ActionTypes.UPDATE, payload: post });
  };

  const deletePost = async (post: WhatsNew) => {
    dispatch({ type: ActionTypes.DELETE, payload: post });
  };

  const deletePostById = async (id: number) => {
    dispatch({ type: ActionTypes.DELETE_BY_ID, payload: id });
  };

  const value = useMemo(
    () => ({
      state,
      setPosts,
      addPost,
      updatePost,
      deletePost,
      deletePostById,
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
