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
import { Permissions } from '../types/common';

interface UserContextConfig {
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
}

const initialUser: UserContextConfig = {
  admin_profile: undefined,
  user: undefined,
  project: undefined,
  appearance: undefined,
  subscription: undefined,
  permissions: [],
  rbac_permissions: [],
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

  const is_admin = import.meta.env.SYSTEM_TYPE === 'admin';

  const handleGetUser = async () => {
    setFetching(true);
    getApi<UserContextConfig>(
      `users/me${
        import.meta.env.SYSTEM_TYPE === 'public'
          ? `/public/${window.location.host}`
          : ''
      }`
    )
      .then((res) => {
        if (res.results.data) {
          const result = res.results.data;
          setUser(result);

          if (is_admin) {
            if (
              !result.subscription ||
              result.subscription.status === 'Inactive' ||
              !result.permissions.includes(Permissions.ADD_IDEA)
            ) {
              if (
                window.location.pathname !== '/pricing' &&
                window.location.pathname !== '/success' &&
                window.location.pathname !== '/ob-board' &&
                window.location.pathname !== '/ob-idea' &&
                window.location.pathname !== '/ob-tags' &&
                window.location.pathname !== '/ob-survey' &&
                window.location.pathname !== '/ob-success'
              ) {
                setShowBanner(true);
              }
            } else {
              setShowBanner(false);
            }
          }

          // dispatch(setPanelLoading(false));
        }
      })
      .finally(() => setFetching(false));
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
      }}
    >
      {showBanner && (
        <div className="restrict-banner">
          <div className="content">
            {!user.permissions.includes(Permissions.ADD_IDEA) &&
            user.permissions.length > 0 ? (
              <>
                You&apos;ve reached your plan limit, you may top up{' '}
                <a href="/pricing">here</a>.
              </>
            ) : (
              <>
                {user.subscription?.is_trial ? 'Your trial has ended. ' : ''}You
                have limited access to your account.
              </>
            )}

            <button onClick={() => setShowBanner(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
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
