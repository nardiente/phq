import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { SocketProvider } from './SocketContext';
import { FeedbackProvider } from './FeedbackContext';
import { UserNotificationProvider } from './UserNotificationContext';
import { PanelProvider } from './PanelContext';

interface ContextProvidersProps {
  children: ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <UserProvider>
      <SocketProvider>
        <FeedbackProvider>
          <UserNotificationProvider>
            <PanelProvider>
              {children}
            </PanelProvider>
          </UserNotificationProvider>
        </FeedbackProvider>
      </SocketProvider>
    </UserProvider>
  );
} 