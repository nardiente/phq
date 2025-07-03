import { useUser } from './contexts/UserContext';
import { FC, useEffect } from 'react';
import AppRoutes from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import {
  getCustomerKaslKey,
  getSessionToken,
  setCustomerKaslKey,
  setKaslKey,
  setSessionToken,
} from './utils/localStorage';
import { postApi } from './utils/api/api';
import { generateToken } from './utils/token';
import { User } from './types/user';
import {
  FAVICON_EMPTY_PLACEHOLDER,
  FAVICON_PLACEHOLDER,
} from './constants/placeholders';
import { useApp } from './contexts/AppContext';

const App: FC = () => {
  const { is_public } = useApp();
  const { initialUser, user: userContext, setFetching, setUser } = useUser();
  const { admin_profile, moderation, project, user } = userContext ?? {};
  const { is_index_search_engine } = project ?? {};

  const userProfile = is_public ? admin_profile : user;
  const { email, favicon } = userProfile ?? {};

  useEffect(() => {
    if (is_public && admin_profile?.kasl_key) {
      setCustomerKaslKey(admin_profile.kasl_key);
      authenticate();
    }
  }, [admin_profile]);

  useEffect(() => {
    if (!is_public || (is_public && userProfile?.id)) {
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

  return <AppRoutes />;
};

export default App;
