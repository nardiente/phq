import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { Team, TeamMember, User } from '../types/user';
import { getApi } from '../utils/api/api';
import { Moderation } from '../types/moderation';
import { Card, InvoiceHistory, Subscription } from '../types/billing';
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
import {
  designSystemItem,
  bottomMenuItems,
  mainMenuItems,
  superDuperAdminItems,
  publicViewMenuItems,
  settingsMenuItems,
} from '../constants/menuItems';
import { defaultEmails } from '../constants/emails';
import { isSuperDuperAdmin } from '../utils/user';
import { AccessHistory } from '../types/super-duper-admin';

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
  access_history: AccessHistory[];
  cards: Card[];
  email: string;
  fetching: boolean;
  first_name: string;
  getPublicUsers: () => Promise<void>;
  getSubscriptions: () => Promise<void>;
  getUserEmail: () => Promise<void>;
  githubCode: string;
  handleGetAppearance: () => Promise<void>;
  handleGetCard: () => Promise<void>;
  handleGetUser: () => Promise<void>;
  handleInvoiceHistory: () => Promise<void>;
  initialUser: UserContextConfig;
  invoices: InvoiceHistory[];
  isAuthenticated: () => boolean;
  last_name: string;
  listAccessHistory: () => Promise<void>;
  listUsers: () => Promise<void>;
  loaded: boolean;
  loading_social: boolean;
  removeUser: () => Promise<void>;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setEmails: Dispatch<SetStateAction<Emails>>;
  setFetching: Dispatch<SetStateAction<boolean>>;
  setFirstName: Dispatch<React.SetStateAction<string>>;
  setGithubCode: Dispatch<React.SetStateAction<string>>;
  setLastName: Dispatch<React.SetStateAction<string>>;
  setLoaded: Dispatch<SetStateAction<boolean>>;
  setLoadingSocial: Dispatch<React.SetStateAction<boolean>>;
  setShowBanner: Dispatch<React.SetStateAction<boolean>>;
  setTeam: Dispatch<SetStateAction<Team>>;
  setUser: Dispatch<React.SetStateAction<UserContextConfig | undefined>>;
  showBanner: boolean;
  subscriptions: Subscription[];
  team: Team;
  user?: UserContextConfig;
  users: User[];
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
  access_history: [],
  cards: [],
  email: '',
  fetching: false,
  first_name: '',
  getPublicUsers: async () => Promise.resolve(),
  getSubscriptions: async () => Promise.resolve(),
  getUserEmail: async () => Promise.resolve(),
  githubCode: '',
  handleGetAppearance: async () => Promise.resolve(),
  handleGetCard: async () => Promise.resolve(),
  handleGetUser: async () => Promise.resolve(),
  handleInvoiceHistory: async () => Promise.resolve(),
  initialUser,
  invoices: [],
  isAuthenticated: () => false,
  last_name: '',
  listAccessHistory: async () => Promise.resolve(),
  listUsers: async () => Promise.resolve(),
  loaded: false,
  loading_social: false,
  removeUser: async () => Promise.resolve(),
  setEmail: () => {},
  setEmails: () => {},
  setFetching: () => {},
  setFirstName: () => {},
  setGithubCode: () => {},
  setLastName: () => {},
  setLoaded: () => {},
  setLoadingSocial: () => {},
  setShowBanner: () => {},
  setTeam: () => {},
  setUser: () => {},
  showBanner: false,
  subscriptions: [],
  team: { anonymousSessions: [], members: [], publicUsers: [] },
  user: undefined,
  users: [],
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { is_public, setMenuItems } = useApp();

  const [access_history, setAccessHistory] = useState<AccessHistory[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [email, setEmail] = useState<string>('');
  const [emails, setEmails] = useState<Emails>(defaultEmails);
  const [fetching, setFetching] = useState<boolean>(false);
  const [first_name, setFirstName] = useState<string>('');
  const [githubCode, setGithubCode] = useState<string>('');
  const [invoices, setInvoices] = useState<InvoiceHistory[]>([]);
  const [last_name, setLastName] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading_social, setLoadingSocial] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [team, setTeam] = useState<Team>({
    anonymousSessions: [],
    members: [],
    publicUsers: [],
  });
  const [user, setUser] = useState<UserContextConfig | undefined>(initialUser);
  const [users, setUsers] = useState<User[]>([]);

  const userProfile = is_public ? user?.admin_profile : user?.user;

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    setUser((prev) =>
      prev ? { ...prev, emails } : { ...initialUser, emails }
    );
  }, [emails]);

  useEffect(() => {
    setAppearanceColors(user?.appearance);
  }, [user?.appearance]);

  useEffect(() => {
    if (user?.admin_profile?.kasl_key) {
      setCustomerKaslKey(user.admin_profile.kasl_key);
    }
  }, [user?.admin_profile]);

  useEffect(() => {
    if (isSuperDuperAdmin(user?.user)) {
      listAccessHistory();
    }
  }, [user?.user]);

  useEffect(() => {
    if (!is_public && userProfile?.id) {
      Promise.all([
        getSubscriptions(),
        handleGetCard(),
        handleInvoiceHistory(),
      ]);
    }
  }, [userProfile?.id]);

  const getPublicUsers = async () => {
    setFetching(true);
    getApi<TeamMember>({ url: 'users/me/team' }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setTeam(res.results.data.team);
      }
    });
  };

  const getSubscriptions = async () => {
    setFetching(true);
    getApi<Subscription[]>({ url: 'billing' }).then((res) => {
      setFetching(false);
      const { results } = res ?? {};
      const { data: subscriptions } = results ?? {};
      if (subscriptions) {
        setSubscriptions(subscriptions);
      }
    });
  };

  const getUserEmail = async () => {
    setFetching(true);
    getApi<Emails>({ url: 'emails' }).then((res) => {
      setFetching(false);
      const {
        results: { data },
      } = res;
      if (data) {
        setEmails(data);
        setUser((prev) =>
          prev ? { ...prev, emails: data } : { ...initialUser, emails: data }
        );
      }
    });
  };

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

  const handleGetCard = async () => {
    setFetching(true);
    getApi<Card[]>({
      url: 'billing/card',
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setCards(res.results.data);
      }
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
          setUser((prev) =>
            prev ? { ...prev, ...result } : { ...initialUser, ...result }
          );
          setMenuItems(
            is_public
              ? publicViewMenuItems
              : isSuperDuperAdmin(result.user)
                ? superDuperAdminItems
                : [
                    ...mainMenuItems,
                    ...settingsMenuItems,
                    ...bottomMenuItems,
                    designSystemItem,
                  ]
          );
        }
      })
      .finally(() => {
        setFetching(false);
        setLoaded(true);
      });
  };

  const handleInvoiceHistory = async () => {
    setFetching(true);
    getApi<InvoiceHistory[]>({
      url: 'billing/invoice-history',
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setInvoices(res.results.data);
      }
    });
  };

  const isAuthenticated = (): boolean => {
    return getKaslKey() !== undefined;
  };

  const listAccessHistory = async () => {
    setFetching(true);
    getApi<AccessHistory[]>({ url: 'users/access-history' }).then((res) => {
      setFetching(false);
      const {
        results: { data },
      } = res;
      if (data) {
        setAccessHistory(data);
      }
    });
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

  const removeUser = async () =>
    setUser((prev) =>
      prev ? { ...prev, user: undefined } : { ...initialUser, user: undefined }
    );

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
        access_history,
        cards,
        email,
        fetching,
        first_name,
        getPublicUsers,
        getSubscriptions,
        getUserEmail,
        githubCode,
        handleGetAppearance,
        handleGetCard,
        handleGetUser,
        handleInvoiceHistory,
        initialUser,
        invoices,
        isAuthenticated,
        last_name,
        listAccessHistory,
        listUsers,
        loaded,
        loading_social,
        removeUser,
        setEmail,
        setEmails,
        setFetching,
        setFirstName,
        setGithubCode,
        setLastName,
        setLoaded,
        setLoadingSocial,
        setShowBanner,
        setTeam,
        setUser,
        showBanner,
        subscriptions,
        team,
        user,
        users,
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
