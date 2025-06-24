import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { User } from '../types/user';
import { getApi } from '../utils/api/api';
import { Moderation } from '../types/moderation';
import { Subscription } from '../types/billing';
import { Project } from '../types/project';
import { ProjectAppearance } from '../types/appearance';
import { getKaslKey, setCustomerKaslKey } from '../utils/localStorage';
import {
  default_active_link_color,
  default_background_color,
  default_button_text_color,
  default_primary_button_border,
  default_primary_button_color,
  default_text_color,
  sign_in_button_color,
  sign_in_button_text_color,
  sign_in_button_text_hover_color,
  sign_up_button_hover_color,
  sign_in_button_border_color,
  sign_in_button_hover_color,
  sign_up_button_color,
  sign_up_button_text_color,
  sign_up_button_text_hover_color,
  sign_up_button_border_color,
  tags_active_background_color,
  tags_active_text_color,
  tags_default_background_color,
  tags_default_text_color,
  check_box_active_color,
} from '../types/appearance-colours';
import { Emails } from '../types/email';
import { useApp } from './AppContext';

export interface UserContextConfig {
  admin_profile?: User;
  user?: User;
  project?: Project;
  appearance?: ProjectAppearance;
  subscription?: Subscription;
  permissions: any[];
  rbac_permissions: any[];
  moderation?: Moderation;
  emails?: Emails;
}

interface UserContextType {
  fetching: boolean;
  user?: UserContextConfig;
  setFetching: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<React.SetStateAction<UserContextConfig | undefined>>;
  handleGetAppearance: () => Promise<void>;
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
  loaded: boolean;
  setLoaded: Dispatch<SetStateAction<boolean>>;
  users: User[];
  listUsers: () => Promise<void>;
  removeUser: () => Promise<void>;
  initialUser: UserContextConfig;
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
  handleGetAppearance: async () => Promise.resolve(),
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
  loaded: false,
  setLoaded: () => {},
  users: [],
  listUsers: async () => Promise.resolve(),
  removeUser: async () => Promise.resolve(),
  initialUser,
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { is_public } = useApp();

  const [email, setEmail] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [first_name, setFirstName] = useState<string>('');
  const [githubCode, setGithubCode] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading_social, setLoadingSocial] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [user, setUser] = useState<UserContextConfig | undefined>(initialUser);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    setAppearanceColors(user?.appearance);
  }, [user?.appearance]);

  useEffect(() => {
    if (user?.admin_profile?.kasl_key) {
      setCustomerKaslKey(user.admin_profile.kasl_key);
    }
  }, [user?.admin_profile]);

  const handleGetAppearance = async () => {
    getApi<ProjectAppearance>({
      url: 'projects/appearance',
    }).then((appearance) => {
      const data = appearance.results.data;
      setUser((prev) =>
        prev
          ? { ...prev, appearance: data }
          : { ...initialUser, appearance: data }
      );
    });
  };

  const handleGetUser = async () => {
    setFetching(true);
    getApi<UserContextConfig>({
      url: `users/me${is_public ? `/public/${window.location.host}` : ''}`,
    })
      .then((res) => {
        if (res.results.data) {
          const result = res.results.data;
          setUser(result);
        }
      })
      .finally(() => {
        setFetching(false);
        setLoaded(true);
      });
  };

  const isAuthenticated = (): boolean => {
    return getKaslKey() !== undefined;
  };

  const listUsers = async () => {
    setFetching(true);
    getApi<User[]>({ url: 'users' })
      .then((res) => {
        const { results } = res ?? {};
        const { data } = results ?? {};
        if (data) {
          setUsers(data);
        }
      })
      .finally(() => setFetching(false));
  };

  const removeUser = async () => setUser(undefined);

  const setAppearanceColors = (appearance?: ProjectAppearance) => {
    document.documentElement.style.setProperty(
      '--public-view-active-link-color',
      appearance?.active_link_color || default_active_link_color
    );
    document.documentElement.style.setProperty(
      '--public-view-background-color',
      appearance?.background_color || default_background_color
    );
    document.documentElement.style.setProperty(
      '--public-view-button-text-color',
      appearance?.button_text_color || default_button_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-default-text-color',
      appearance?.default_text_color || default_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-primary-button-border',
      appearance?.primary_button_border || default_primary_button_border
    );
    document.documentElement.style.setProperty(
      '--public-view-primary-button-color',
      appearance?.primary_button_color || default_primary_button_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-color',
      appearance?.sign_in_button_color || sign_in_button_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-border-color',
      appearance?.sign_in_button_border_color || sign_in_button_border_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-hover-color',
      appearance?.sign_in_button_hover_color || sign_in_button_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-text-color',
      appearance?.sign_in_button_text_color || sign_in_button_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-text-hover-color',
      appearance?.sign_in_button_text_hover_color ||
        sign_in_button_text_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-color',
      appearance?.sign_up_button_color || sign_up_button_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-border-color',
      appearance?.sign_up_button_border_color || sign_up_button_border_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-hover-color',
      appearance?.sign_up_button_hover_color || sign_up_button_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-text-color',
      appearance?.sign_up_button_text_color || sign_up_button_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-text-hover-color',
      appearance?.sign_up_button_text_hover_color ||
        sign_up_button_text_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-active-background-color',
      appearance?.tags_active_background_color || tags_active_background_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-active-text-color',
      appearance?.tags_active_text_color || tags_active_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-default-background-color',
      appearance?.tags_default_background_color || tags_default_background_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-default-text-color',
      appearance?.tags_default_text_color || tags_default_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-check-box-active-color',
      appearance?.check_box_active_color || check_box_active_color
    );
  };

  return (
    <UserContext.Provider
      value={{
        fetching,
        setFetching,
        user,
        setUser,
        handleGetAppearance,
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
        loaded,
        setLoaded,
        users,
        listUsers,
        removeUser,
        initialUser,
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
