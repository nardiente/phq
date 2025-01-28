import { useUser } from './contexts/UserContext';
import { FC, useEffect } from 'react';
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getSessionToken,
  setCustomerKaslKey,
  setSessionToken,
} from './utils/localStorage';
import { useSocket } from './contexts/SocketContext';
import { UserNotification } from './types/notification';
import { getApi, postApi } from './utils/api/api';
import { Tag } from './types/feedback';
import { useFeedback } from './contexts/FeedbackContext';
import { useUserNotification } from './contexts/UserNotificationContext';
import { generateToken } from './utils/token';
import { User } from './types/user';
import { Permissions } from './types/common';
import { usePanel } from './contexts/PanelContext';

const App: FC = () => {
  const { user, showBanner, handleGetUser, setShowBanner, setUser } = useUser();
  const { admin_profile, user: user_profile, moderation } = user ?? {};
  const {
    state: { socket },
    setSocket,
    setSocketTags,
  } = useSocket();
  const { setTags } = useFeedback();
  const { setFetching, setUserNotification } = useUserNotification();
  const { setPanelLoading } = usePanel();

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (is_public && moderation?.user_login === true) {
      checkSession();
    }
  }, [moderation]);

  useEffect(() => {
    checkSubscriptionBanner();

    let linkIconTag: any, metaTag: any;

    if (
      !is_public ||
      (is_public && user?.admin_profile?.email?.endsWith('@producthq.io'))
    ) {
      // clickConnect = document.createElement('script')
      // clickConnect.src =
      //   'https://s3.amazonaws.com/app.productfeedback.co/scripts/clickConnect.js'
      // clickConnect.async = true
      // document.body.appendChild(clickConnect)

      // Remove clarity script
      // clarity = document.createElement('script')
      // clarity.src =
      //     'https://s3.amazonaws.com/app.productfeedback.co/scripts/clarity.min.js'
      // clarity.async = true
      // document.body.appendChild(clarity)

      linkIconTag = document.createElement('link');
      linkIconTag.rel = 'icon';
      linkIconTag.type = 'image/svg+xml';
      linkIconTag.href = '/favicon.ico';
      document.head.appendChild(linkIconTag);
    }

    if (is_public && !user?.admin_profile?.email?.endsWith('@producthq.io')) {
      document.title = '';
      const link = document.querySelector(
        'link[rel~="icon"]'
      ) as HTMLLinkElement;
      if (link) {
        link.href = '';
      }
    }

    if (is_public && !user?.project?.is_index_search_engine) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      metaTag.content = 'noindex';

      document.head.appendChild(metaTag);
    }

    return () => {
      if (
        !is_public ||
        (is_public && user?.admin_profile?.email?.endsWith('@producthq.io'))
      ) {
        // document.body.removeChild(clickConnect)
        // Remove clarity cleanup
        // document.body.removeChild(clarity)
        document.head.removeChild(linkIconTag);
      }

      if (is_public && !user?.admin_profile?.email?.endsWith('@producthq.io')) {
        document.title = '';
        const link = document.querySelector(
          'link[rel~="icon"]'
        ) as HTMLLinkElement;
        if (link) {
          link.href = '';
        }
      }

      if (is_public && !user?.project?.is_index_search_engine) {
        document.head.removeChild(metaTag);
      }
    };
  }, [user]);

  useEffect(() => {
    if (
      (admin_profile || user_profile) &&
      socket?.current?.readyState !== WebSocket.OPEN
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

  const checkSubscriptionBanner = () => {
    if (!is_public) {
      if (
        user?.user &&
        (!user.subscription ||
          user.subscription.status === 'Inactive' ||
          !user.permissions.includes(Permissions.ADD_IDEA))
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

    setPanelLoading(false);
  };

  const startWebSocket = () => {
    setSocket({ current: new WebSocket(import.meta.env.VITE_SOCKET_URL) });

    if (socket !== null) {
      socket.current.onerror = (error: any) => {
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
    }
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
      if (res.results.data) {
        setTags(res.results.data);
      }
    });
  };

  const getNotifications = (seeMore?: boolean) => {
    setFetching(true);
    const params = {};
    if (!seeMore) {
      Object.assign(params, { limit: 3 });
    }

    getApi<UserNotification>({
      url: 'notifications',
      params: params,
      // useSessionToken: is_public && moderation?.user_login === true, // Uncomment if needed
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setUserNotification(res.results.data);
      }
    });
  };

  return (
    <>
      {showBanner === true && (
        <div className="restrict-banner">
          <div className="content">
            {!user?.permissions.includes(Permissions.ADD_IDEA) &&
            (user?.permissions.length ?? 0) > 0 ? (
              <>
                You&apos;ve reached your plan limit, you may top up{' '}
                <a href="/pricing">here</a>.
              </>
            ) : (
              <>
                {user?.subscription?.is_trial ? 'Your trial has ended. ' : ''}
                You have limited access to your account.
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
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
