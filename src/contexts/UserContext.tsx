import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from '../types/user';
import { getApi } from '../utils/api/api';
import { Moderation } from '../types/moderation';
import { Subscription } from '../types/billing';
import { Project } from '../types/project';
import { ProjectAppearance } from '../types/appearance';
import { getKaslKey } from '../utils/localStorage';

export interface UserContextConfig {
  admin_profile?: User;
  user?: User;
  project?: Project;
  appearance?: ProjectAppearance;
  subscription?: Subscription;
  permissions: any[];
  rbac_permissions: any[];
  moderation?: Moderation;
}

interface UserContextType {
  fetching: boolean;
  user?: UserContextConfig;
  setFetching: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<React.SetStateAction<UserContextConfig>>;
  handleGetUser: () => Promise<void>;
  first_name: string;
  setFirstName: Dispatch<React.SetStateAction<string>>;
  githubCode: string;
  setGithubCode: Dispatch<React.SetStateAction<string>>;
  last_name: string;
  setLastName: Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  loading_social: boolean;
  setLoadingSocial: Dispatch<React.SetStateAction<boolean>>;
  showBanner: boolean;
  setShowBanner: Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: () => boolean;
}

const initialUser: UserContextConfig = {
  admin_profile: undefined,
  user: undefined,
  project: undefined,
  appearance: undefined,
  subscription: undefined,
  permissions: [],
  rbac_permissions: [],
  moderation: undefined,
};

const UserContext = createContext<UserContextType>({
  email: '',
  fetching: false,
  first_name: '',
  githubCode: '',
  handleGetUser: async () => Promise.resolve(),
  last_name: '',
  loading_social: false,
  setEmail: () => {},
  setFetching: () => {},
  setFirstName: () => {},
  setGithubCode: () => {},
  setLastName: () => {},
  setLoadingSocial: () => {},
  setShowBanner: () => {},
  setUser: () => {},
  showBanner: false,
  isAuthenticated: () => false,
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [user, setUser] = useState<UserContextConfig>(initialUser);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [first_name, setFirstName] = useState<string>('');
  const [githubCode, setGithubCode] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading_social, setLoadingSocial] = useState<boolean>(false);

  const handleGetUser = async () => {
    setFetching(true);
    getApi<UserContextConfig>({
      url: `users/me${
        import.meta.env.VITE_SYSTEM_TYPE === 'public'
          ? `/public/${window.location.host}`
          : ''
      }`,
    })
      .then((res) => {
        if (res.results.data) {
          const result = res.results.data;
          setUser(result);
        }
      })
      .finally(() => setFetching(false));
  };

  const isAuthenticated = (): boolean => {
    return getKaslKey() !== null;
  };

  return (
    <UserContext.Provider
      value={{
        fetching,
        setFetching,
        user,
        setUser,
        handleGetUser,
        first_name,
        setFirstName,
        githubCode,
        setGithubCode,
        last_name,
        setLastName,
        email,
        setEmail,
        loading_social,
        setLoadingSocial,
        showBanner,
        setShowBanner,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
