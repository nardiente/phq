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
import { MenuItem } from '../components/layout/SidebarMenu';
import { publicViewMenuItems } from '../constants/menuItems';

interface ContextType {
  api_error: string;
  setApiError: Dispatch<SetStateAction<string>>;
  api_field_errors: ApiFieldError[];
  setApiFieldErrors: Dispatch<SetStateAction<ApiFieldError[]>>;
  roadmap_colors: RoadmapColor[];
  setRoadmapColors: Dispatch<SetStateAction<RoadmapColor[]>>;
  is_public: boolean;
  menuItems: MenuItem[];
  setMenuItems: Dispatch<SetStateAction<MenuItem[]>>;
}

const AppContext = createContext<ContextType>({
  api_error: '',
  setApiError: () => {},
  api_field_errors: [],
  setApiFieldErrors: () => {},
  roadmap_colors: [],
  setRoadmapColors: () => {},
  is_public: import.meta.env.VITE_SYSTEM_TYPE === 'public',
  menuItems: [],
  setMenuItems: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [api_error, setApiError] = useState<string>('');
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [roadmap_colors, setRoadmapColors] = useState<RoadmapColor[]>([]);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  useEffect(() => {
    handleGetRoadmapColors();
  }, []);

  useEffect(() => {
    if (is_public) {
      setMenuItems(publicViewMenuItems);
    }
  }, [is_public]);

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
        is_public,
        menuItems,
        setMenuItems,
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
