import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { DropdownProvider } from './DropdownContext';
import { UserNotificationProvider } from './UserNotificationContext';
import { WhatsNewProvider } from './WhatsNewContext';
import { UnsavedChangesProvider } from './UnsavedChangesContext';
import { FeedbackProvider } from './FeedbackContext';
import { SocketProvider } from './SocketContext';
import { PanelProvider } from './PanelContext';
import { BoostProvider } from './BoostContext';

type ContextProvidersProps = {
  children: ReactNode;
};

const ContextProviders: React.FC<ContextProvidersProps> = ({ children }) => {
  return (
    <SocketProvider>
      <PanelProvider>
        <FeedbackProvider>
          <WhatsNewProvider>
            <UserNotificationProvider>
              <DropdownProvider>
                <UnsavedChangesProvider>
                  <BoostProvider>
                    <UserProvider>{children}</UserProvider>
                  </BoostProvider>
                </UnsavedChangesProvider>
              </DropdownProvider>
            </UserNotificationProvider>
          </WhatsNewProvider>
        </FeedbackProvider>
      </PanelProvider>
    </SocketProvider>
  );
};

export default ContextProviders;
