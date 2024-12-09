import { UserProvider, useUser } from './contexts/UserContext';
import { UserNotificationProvider } from './contexts/UserNotificationContext';
import { SocketProvider } from './contexts/SocketContext';
import { BoostProvider } from './contexts/BoostContext';
import { UnsavedChangesProvider } from './contexts/UnsavedChangesContext';
import { DropdownProvider } from './contexts/DropdownContext';
import { FeedbackProvider } from './contexts/FeedbackContext';
import { FC, useEffect } from 'react';
import AppRoutes from './routes/routes';

const App: FC = () => {
  const { user } = useUser();

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  useEffect(() => {
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
      linkIconTag.type = 'image/x-icon';
      linkIconTag.href = '/static/icons/favicon.ico';
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

  return (
    <SocketProvider>
      <FeedbackProvider>
        <UserNotificationProvider>
          <UserProvider>
            <DropdownProvider>
              <UnsavedChangesProvider>
                <BoostProvider>
                  <AppRoutes />
                </BoostProvider>
              </UnsavedChangesProvider>
            </DropdownProvider>
          </UserProvider>
        </UserNotificationProvider>
      </FeedbackProvider>
    </SocketProvider>
  );
};

export default App;
