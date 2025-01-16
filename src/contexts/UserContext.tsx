import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { User } from '../types/user';
import { getApi, postApi } from '../utils/api/api';
import { Moderation } from '../types/moderation';
import { Subscription } from '../types/billing';
import { Project } from '../types/project';
import { ProjectAppearance } from '../types/appearance';
import { Permissions } from '../types/common';
import {
  getKaslKey,
  getSessionToken,
  setCustomerKaslKey,
  setSessionToken,
} from '../utils/localStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from './SocketContext';
import { UserNotification } from '../types/notification';
import { Tag } from '../types/feedback';
import { useFeedback } from './FeedbackContext';
import { useUserNotification } from './UserNotificationContext';
import { generateToken } from '../utils/token';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const { setTags } = useFeedback();
  const { setFetching: setFetchingNotification, setUserNotification } =
    useUserNotification();
  const { setSocketTags, setSocket } = useSocket();

  const [fetching, setFetching] = useState<boolean>(false);
  const [user, setUser] = useState<UserContextConfig>(initialUser);
  const { admin_profile, user: user_profile, moderation } = user ?? {};
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [first_name, setFirstName] = useState<string>('');
  const [githubCode, setGithubCode] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading_social, setLoadingSocial] = useState<boolean>(false);

  const is_admin = import.meta.env.VITE_SYSTEM_TYPE === 'admin';
  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (
      (getKaslKey() !== null || !is_admin) &&
      pathname !== '/four-oh-four' &&
      pathname !== '/sign-in/google'
    ) {
      handleGetUser().catch(() => {
        if (!is_admin) {
          navigate('/dashboard');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (is_public && moderation?.user_login === true) {
      checkSession();
    }
  }, [moderation]);

  useEffect(() => {
    if (
      (admin_profile || user_profile) &&
      socket.current?.readyState !== WebSocket.OPEN
    ) {
      startWebSocket();
    }
  }, [admin_profile, user_profile]);

  const checkSession = async () => {
    const token = getSessionToken() ?? (await generateToken());
    setCustomerKaslKey(user?.admin_profile?.kasl_key ?? '');
    setFetching(true);
    postApi<User & { token?: string }>({
      url: 'auth/check-session',
      payload: { token },
      useCustomerKey: true,
    })
      .then((res) => {
        if (res.results.data) {
          if (res.headers['kasl-key']) {
            setSessionToken(res.headers['kasl-key'].toString());
          }
          setUser((prev) => ({ ...prev, user: res.results.data }));
        }
      })
      .finally(() => setFetching(false));
  };

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

  const startWebSocket = () => {
    socket.current = new WebSocket(import.meta.env.VITE_SOCKET_URL);

    socket.current.onerror = (error) => {
      console.error('WebSocket on error error:', error);
      socket.current?.close();
    };

    socket.current.onopen = () => {
      const profile = is_public ? admin_profile : user_profile;
      if (socket.current?.readyState === WebSocket.OPEN) {
        console.log('WebSocket on open.');
        socket.current?.send(
          JSON.stringify({
            action: 'setTagCreator',
            id: profile?.id,
            name: profile?.full_name?.substring(0, 20),
          })
        );
      }
      setInterval(() => {
        if (socket.current?.readyState === WebSocket.OPEN) {
          socket.current?.send(
            JSON.stringify({
              action: 'ping',
              id: profile?.id,
              name: profile?.full_name?.substring(0, 20),
            })
          );
        }
      }, 1000);
    };
    socket.current.onclose = () => {
      console.error('WebSocket closed.');
      socket.current?.close();
      window.location.reload();
    };
    socket.current.onmessage = (event: any) => {
      if (event.data) {
        const profile = is_public ? admin_profile : user_profile;
        const data = JSON.parse(event.data);
        if (
          data.message?.includes(' updated a tag.') &&
          data.memberUpdatedTag?.id === profile?.id
        ) {
          console.log('WebSocket on message event data:', data);
          handleListTag();
          setSocketTags(true);
        }
        if (
          data.message?.includes('sent a notifications') &&
          data.memberNotified?.id === profile?.id
        ) {
          getNotifications();
        }
      }
    };

    setSocket(socket.current);
  };

  const handleListTag = () => {
    getApi<Tag[]>({
      url: 'tags',
      params: is_public
        ? {
            domain: window.location.host,
          }
        : undefined,
      useCustomerKey: is_public && moderation?.user_login === true,
    }).then((res) => {
      if (is_public && res.results.error === 'error-client.bad-request') {
        navigate('/dashboard');
      }
      if (res.results.data) {
        setTags(res.results.data);
      }
    });
  };

  const getNotifications = (seeMore?: boolean) => {
    setFetchingNotification(true);
    const params = {};
    if (!seeMore) {
      Object.assign(params, { limit: 3 });
    }

    getApi<UserNotification>({
      url: 'notifications',
      params: params,
      // useSessionToken: is_public && moderation?.user_login === true, // Uncomment if needed
    }).then((res) => {
      setFetchingNotification(false);
      if (res.results.data) {
        setUserNotification(res.results.data);
      }
    });
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
