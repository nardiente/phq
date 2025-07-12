import { useUser } from './contexts/UserContext';
import { FC, useEffect } from 'react';
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getCustomerKaslKey,
  getSessionToken,
  setCustomerKaslKey,
  setKaslKey,
  setSessionToken,
  getImpersonator,
} from './utils/localStorage';
import { postApi } from './utils/api/api';
import { generateToken } from './utils/token';
import { User } from './types/user';
import { Permissions } from './types/common';
import {
  FAVICON_EMPTY_PLACEHOLDER,
  FAVICON_PLACEHOLDER,
} from './constants/placeholders';
import { useApp } from './contexts/AppContext';
import { isSuperDuperAdmin } from './utils/user';
import { usePanel } from './contexts/PanelContext';

const App: FC = () => {
  const { is_public } = useApp();
  const {
    initialUser,
    user,
    showBanner,
    isAuthenticated,
    setFetching,
    setShowBanner,
    setUser,
  } = useUser();
  const { admin_profile, moderation, project, user: user_profile } = user ?? {};
  const { is_index_search_engine } = project ?? {};
  const { setPanelLoading } = usePanel();

  const userProfile = user_profile ?? admin_profile;
  const { email, favicon } = userProfile ?? {};

  const impersonator = getImpersonator();

  useEffect(() => {
    if (
      is_public &&
      admin_profile?.kasl_key &&
      moderation?.allow_anonymous_access
    ) {
      setCustomerKaslKey(admin_profile.kasl_key);
      authenticate();
    }
  }, [admin_profile, moderation?.allow_anonymous_access]);

  useEffect(() => {
    if (!is_public || (is_public && userProfile?.id)) {
      checkSubscriptionBanner();

      let gistScript: any, metaTag: any;

      const linkIconTag: HTMLLinkElement | null =
        document.querySelector('link[rel="icon"]');
      if (linkIconTag) {
        linkIconTag.href =
          favicon ??
          (is_public ? FAVICON_EMPTY_PLACEHOLDER : FAVICON_PLACEHOLDER);
      }

      if (!is_public || (is_public && email?.endsWith('@producthq.io'))) {
        // Remove clarity script
        // clarity = document.createElement('script')
        // clarity.src =
        //     'https://s3.amazonaws.com/app.productfeedback.co/scripts/clarity.min.js'
        // clarity.async = true
        // document.body.appendChild(clarity)

        gistScript = document.createElement('script');
        gistScript.src =
          'https://s3.amazonaws.com/app.productfeedback.co/scripts/gist.js';
        document.head.appendChild(gistScript);
      }

      if (is_public && !is_index_search_engine) {
        metaTag = document.createElement('meta');
        metaTag.name = 'robots';
        metaTag.content = 'noindex';

        document.head.appendChild(metaTag);
      }

      return () => {
        if (!is_public || (is_public && email?.endsWith('@producthq.io'))) {
          // Remove clarity cleanup
          // document.body.removeChild(clarity)
          document.head.removeChild(gistScript);
        }

        if (is_public && !is_index_search_engine) {
          document.head.removeChild(metaTag);
        }
      };
    }
  }, [userProfile, email, favicon, is_index_search_engine]);

  const authenticate = async () => {
    const token = getSessionToken();
    const isNew = moderation?.allow_anonymous_access === true && !token;
    await checkSession(token ?? (await generateToken()), isNew);
  };

  const checkSession = async (token: string, isNew: boolean) => {
    setFetching(true);
    postApi<User>({
      url: 'auth/check-session',
      payload: { token, isNew },
      useCustomerKey: getCustomerKaslKey() !== undefined,
    })
      .then((res) => {
        const {
          results: { data },
        } = res;
        if (data) {
          const { kasl_key, token } = data;
          if (token) {
            setSessionToken(token);
          }
          if (kasl_key) {
            setKaslKey(kasl_key);
          }
          setUser((prev) =>
            prev ? { ...prev, user: data } : { ...initialUser, user: data }
          );
        }
      })
      .finally(() => setFetching(false));
  };

  const checkSubscriptionBanner = () => {
    if (!is_public) {
      if (
        user?.user &&
        !isSuperDuperAdmin(user.user) &&
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

  return (
    <>
      {!is_public && isAuthenticated() && impersonator && impersonator.id && (
        <div className="w-full bg-purple-700 text-white font-semibold py-[8px] text-center fixed top-[0] left-[0] z-[2000]">
          {`Super Duper admin "${
            impersonator.full_name ||
            impersonator.email ||
            `User #${impersonator.id}`
          }" is active`}
        </div>
      )}
      {/* Spacer for fixed impersonator bar */}
      {impersonator && impersonator.id && <div className="h-[40px]" />}
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
