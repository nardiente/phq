import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { DropdownProvider } from './DropdownContext';
import { UserNotificationProvider } from './UserNotificationContext';
import { WhatsNewProvider } from './WhatsNewContext';
import { UnsavedChangesProvider } from './UnsavedChangesContext';
import { FeedbackProvider } from './FeedbackContext';
import { SocketProvider } from './SocketContext';
import { PanelProvider } from './PanelContext';
import { OnboardingProvider } from './OnboardingContext';
import { AppProvider } from './AppContext';

type ContextProvidersProps = { children: ReactNode };

const ContextProviders: React.FC<ContextProvidersProps> = ({ children }) => {
  return (
    <AppProvider>
      <OnboardingProvider>
        <SocketProvider>
          <PanelProvider>
            <UserProvider>
              <FeedbackProvider>
                <WhatsNewProvider>
                  <UserNotificationProvider>
                    <DropdownProvider>
                      <UnsavedChangesProvider>
                        {children}
                      </UnsavedChangesProvider>
                    </DropdownProvider>
                  </UserNotificationProvider>
                </WhatsNewProvider>
              </FeedbackProvider>
            </UserProvider>
          </PanelProvider>
        </SocketProvider>
      </OnboardingProvider>
    </AppProvider>
  );
};

export default ContextProviders;
