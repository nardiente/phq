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
import { RbacPermission, Role, RolesPermission } from '../types/user';

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
  fetching: boolean;
  permissions: RbacPermission[];
  rolesPermission: RolesPermission[];
  roles: Role[];
}

const AppContext = createContext<ContextType>({
  api_error: '',
  setApiError: () => {},
  api_field_errors: [],
  setApiFieldErrors: () => {},
  roadmap_colors: [],
  setRoadmapColors: () => {},
  is_public: import.meta.env.VITE_SYSTEM_TYPE === 'public',
  menuItems: publicViewMenuItems,
  setMenuItems: () => {},
  fetching: false,
  permissions: [],
  rolesPermission: [],
  roles: [],
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [api_error, setApiError] = useState<string>('');
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [roadmap_colors, setRoadmapColors] = useState<RoadmapColor[]>([]);
  const [permissions, setPermissions] = useState<RbacPermission[]>([]);
  const [rolesPermission, setRolesPermission] = useState<RolesPermission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  useEffect(() => {
    if (is_public) {
      setMenuItems(publicViewMenuItems);
    }

    if (!is_public) {
      const rbcaPermissionsPromise = getApi<RbacPermission[]>({
        url: 'users/rbac-permissions',
      });

      const rolesPermissionPromise = getApi<RolesPermission[]>({
        url: 'users/roles-permission',
      });

      const rolesPromise = getApi<Role[]>({ url: 'users/roles' });

      Promise.all([
        rbcaPermissionsPromise,
        rolesPermissionPromise,
        rolesPromise,
      ]).then(([rbcaPermissionsRes, rolesPermissionRes, rolesRes]) => {
        setFetching(false);
        setPermissions(rbcaPermissionsRes.results.data || []);
        setRolesPermission(rolesPermissionRes.results.data || []);
        setRoles(rolesRes.results.data ?? []);
      });
    }

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
        is_public,
        menuItems,
        setMenuItems,
        fetching,
        permissions,
        roles,
        rolesPermission,
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
