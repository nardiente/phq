import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ApiFieldError } from '../utils/api/types';
import { RoadmapColor } from '../types/roadmap';
import { getApi } from '../utils/api/api';

interface ContextType {
  api_error: string;
  setApiError: Dispatch<SetStateAction<string>>;
  api_field_errors: ApiFieldError[];
  setApiFieldErrors: Dispatch<SetStateAction<ApiFieldError[]>>;
  roadmap_colors: RoadmapColor[];
  setRoadmapColors: Dispatch<SetStateAction<RoadmapColor[]>>;
}

const AppContext = createContext<ContextType>({
  api_error: '',
  setApiError: () => {},
  api_field_errors: [],
  setApiFieldErrors: () => {},
  roadmap_colors: [],
  setRoadmapColors: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [api_error, setApiError] = useState<string>('');
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [roadmap_colors, setRoadmapColors] = useState<RoadmapColor[]>([]);

  useEffect(() => {
    handleGetRoadmapColors();
  }, []);

  const handleGetRoadmapColors = () => {
    getApi<RoadmapColor[]>({ url: 'roadmaps/colors' }).then((res) => {
      if (res.results.data) {
        setRoadmapColors(res.results.data);
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        api_error,
        setApiError,
        api_field_errors,
        setApiFieldErrors,
        roadmap_colors,
        setRoadmapColors,
      }}
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
