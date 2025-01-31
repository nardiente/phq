import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { ApiFieldError } from '../utils/api/types';

interface ContextType {
  api_error: string;
  setApiError: Dispatch<SetStateAction<string>>;
  api_field_errors: ApiFieldError[];
  setApiFieldErrors: Dispatch<SetStateAction<ApiFieldError[]>>;
}

const AppContext = createContext<ContextType>({
  api_error: '',
  setApiError: () => {},
  api_field_errors: [],
  setApiFieldErrors: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [api_error, setApiError] = useState<string>('');
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);

  return (
    <AppContext.Provider
      value={{ api_error, setApiError, api_field_errors, setApiFieldErrors }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppContext');
  }
  return context;
}
