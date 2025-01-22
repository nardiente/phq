import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { OnboardingPages } from '../types/onboarding';

interface State {
  activePage: OnboardingPages;
  token: string;
}

const initialState: State = {
  activePage: OnboardingPages.WELCOME,
  token: '',
};

enum ActionTypes {
  SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE',
  SET_TOKEN = 'SET_TOKEN',
}

type Action =
  | { type: ActionTypes.SET_ACTIVE_PAGE; payload: OnboardingPages }
  | { type: ActionTypes.SET_TOKEN; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}

interface ContextType {
  state: State;
  setActivePage: (page: OnboardingPages) => Promise<void>;
  setToken: (token: string) => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setActivePage = async (page: OnboardingPages) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_PAGE, payload: page });
  };

  const setToken = async (token: string) => {
    dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
  };

  const value = useMemo(
    () => ({
      state,
      setActivePage,
      setToken,
    }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useOnboarding() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within a OnboardingProvider');
  }
  return context;
}
