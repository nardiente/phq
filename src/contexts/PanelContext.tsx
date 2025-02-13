import { createContext, useContext, useMemo } from 'react';

import { ReactNode } from 'react';
import { useReducer } from 'react';

interface State {
  isOpen: boolean;
  activePage: string;
  successType: string;
  deleteType: string;
  deleteId: number;
  panel_loading: boolean;
  comment_id?: number;
  commentIdToDelete?: number;
  mentioned_users: any[];
  active_tab: string;
  activeItem: any;
}

const initialState: State = {
  isOpen: false,
  activePage: 'add_idea',
  successType: '',
  deleteType: '',
  deleteId: 0,
  panel_loading: false,
  mentioned_users: [],
  active_tab: '',
  activeItem: null,
};

enum ActionTypes {
  SET_IS_OPEN = 'SET_IS_OPEN',
  SET_PANEL_NAME = 'SET_PANEL_NAME',
  SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE',
  SET_SUCCESS_TYPE = 'SET_SUCCESS_TYPE',
  SET_DELETE_TYPE = 'SET_DELETE_TYPE',
  SET_DELETE_ID = 'SET_DELETE_ID',
  SET_PANEL_LOADING = 'SET_PANEL_LOADING',
  SET_PANEL_COMMENT_ID = 'SET_PANEL_COMMENT_ID',
  SET_PANEL_COMMENT_ID_TO_DELETE = 'SET_PANEL_COMMENT_ID_TO_DELETE',
  SET_MENTIONED_USERS = 'SET_MENTIONED_USERS',
  ADD_MENTIONED_USERS = 'ADD_MENTIONED_USERS',
  SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM',
}

type PanelAction =
  | { type: ActionTypes.SET_IS_OPEN; payload: boolean }
  | { type: ActionTypes.SET_ACTIVE_PAGE; payload: string }
  | { type: ActionTypes.SET_SUCCESS_TYPE; payload: string }
  | { type: ActionTypes.SET_DELETE_TYPE; payload: string }
  | { type: ActionTypes.SET_DELETE_ID; payload: number }
  | { type: ActionTypes.SET_PANEL_LOADING; payload: boolean }
  | { type: ActionTypes.SET_PANEL_COMMENT_ID; payload?: number }
  | {
      type: ActionTypes.SET_PANEL_COMMENT_ID_TO_DELETE;
      payload?: number;
    }
  | { type: ActionTypes.SET_MENTIONED_USERS; payload: any }
  | { type: ActionTypes.ADD_MENTIONED_USERS; payload: any }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: ActionTypes.SET_ACTIVE_ITEM; payload: any };

function panelReducer(state: State, action: PanelAction): State {
  switch (action.type) {
    case ActionTypes.SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case ActionTypes.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case ActionTypes.SET_SUCCESS_TYPE:
      return {
        ...state,
        successType: action.payload,
      };
    case ActionTypes.SET_DELETE_TYPE:
      return {
        ...state,
        deleteType: action.payload,
      };
    case ActionTypes.SET_DELETE_ID:
      return {
        ...state,
        deleteId: action.payload,
      };
    case ActionTypes.SET_PANEL_LOADING:
      return {
        ...state,
        panel_loading: action.payload,
      };
    case ActionTypes.SET_PANEL_COMMENT_ID:
      return {
        ...state,
        comment_id: action.payload,
      };
    case ActionTypes.SET_PANEL_COMMENT_ID_TO_DELETE:
      return {
        ...state,
        commentIdToDelete: action.payload,
      };
    case ActionTypes.SET_MENTIONED_USERS:
      return {
        ...state,
        mentioned_users: action.payload,
      };
    case ActionTypes.ADD_MENTIONED_USERS:
      return {
        ...state,
        mentioned_users: [...state.mentioned_users, action.payload],
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        active_tab: action.payload,
      };
    case ActionTypes.SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
}

interface PanelContextType {
  state: State;
  setIsOpen: (value: boolean) => Promise<void>;
  setActivePage: (value: string) => Promise<void>;
  setSuccessType: (value: string) => Promise<void>;
  setDeleteType: (value: string) => Promise<void>;
  setDeleteId: (value: number) => Promise<void>;
  setPanelLoading: (value: boolean) => Promise<void>;
  setPanelCommentId: (value?: number) => Promise<void>;
  setPanelCommentIdToDelete: (value?: number) => Promise<void>;
  setMentionedUser: (value: any) => Promise<void>;
  addMentionedUser: (value: any) => Promise<void>;
  setActiveTab: (active_tab: string) => Promise<void>;
  setActiveItem: (value: any) => Promise<void>;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(panelReducer, initialState);

  const setIsOpen = async (value: boolean) => {
    dispatch({ type: ActionTypes.SET_IS_OPEN, payload: value });
  };

  const setActivePage = async (value: string) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_PAGE, payload: value });
  };

  const setSuccessType = async (value: string) => {
    dispatch({ type: ActionTypes.SET_SUCCESS_TYPE, payload: value });
  };

  const setDeleteType = async (value: string) => {
    dispatch({ type: ActionTypes.SET_DELETE_TYPE, payload: value });
  };

  const setDeleteId = async (value: number) => {
    dispatch({ type: ActionTypes.SET_DELETE_ID, payload: value });
  };

  const setPanelLoading = async (value: boolean) => {
    dispatch({ type: ActionTypes.SET_PANEL_LOADING, payload: value });
  };

  const setPanelCommentId = async (value?: number) => {
    dispatch({ type: ActionTypes.SET_PANEL_COMMENT_ID, payload: value });
  };

  const setPanelCommentIdToDelete = async (value?: number) => {
    dispatch({
      type: ActionTypes.SET_PANEL_COMMENT_ID_TO_DELETE,
      payload: value,
    });
  };

  const setMentionedUser = async (value: any) => {
    dispatch({ type: ActionTypes.SET_MENTIONED_USERS, payload: value });
  };

  const addMentionedUser = async (value: any) => {
    dispatch({ type: ActionTypes.ADD_MENTIONED_USERS, payload: value });
  };

  const setActiveTab = async (active_tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: active_tab });
  };

  const setActiveItem = async (value: any) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_ITEM, payload: value });
  };

  const value = useMemo(
    () => ({
      state,
      setIsOpen,
      setActivePage,
      setSuccessType,
      setDeleteType,
      setDeleteId,
      setPanelLoading,
      setPanelCommentId,
      setPanelCommentIdToDelete,
      setMentionedUser,
      addMentionedUser,
      setActiveTab,
      setActiveItem,
    }),
    [state]
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
}
