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
        <UserProvider>
          <PanelProvider>
            <FeedbackProvider>
              <WhatsNewProvider>
                <UserNotificationProvider>
                  <SocketProvider>
                    <DropdownProvider>
                      <UnsavedChangesProvider>
                        {children}
                      </UnsavedChangesProvider>
                    </DropdownProvider>
                  </SocketProvider>
                </UserNotificationProvider>
              </WhatsNewProvider>
            </FeedbackProvider>
          </PanelProvider>
        </UserProvider>
      </OnboardingProvider>
    </AppProvider>
  );
};

export default ContextProviders;
