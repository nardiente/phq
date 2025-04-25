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
import { SegmentProvider } from './SegmentContext/SegmentProvider';

type ContextProvidersProps = { children: ReactNode };

const ContextProviders: React.FC<ContextProvidersProps> = ({ children }) => {
  return (
    <AppProvider>
      <OnboardingProvider>
        <UserProvider>
          <SocketProvider>
            <PanelProvider>
              <FeedbackProvider>
                <WhatsNewProvider>
                  <UserNotificationProvider>
                    <DropdownProvider>
                      <UnsavedChangesProvider>
                        <SegmentProvider>{children}</SegmentProvider>
                      </UnsavedChangesProvider>
                    </DropdownProvider>
                  </UserNotificationProvider>
                </WhatsNewProvider>
              </FeedbackProvider>
            </PanelProvider>
          </SocketProvider>
        </UserProvider>
      </OnboardingProvider>
    </AppProvider>
  );
};

export default ContextProviders;
