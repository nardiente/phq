import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useUser } from './UserContext';
import { io, Socket } from 'socket.io-client';
import { SocketAction } from '../types/socket';
import { useApp } from './AppContext';

interface SocketMessage {
  action: SocketAction;
  data: { projectId?: number; [key: string]: any };
}

interface SocketState {
  action?: SocketAction;
  message?: SocketMessage;
  socket: Socket | null;
}

type Action =
  | { type: 'SET_ACTION'; payload?: SocketAction }
  | { type: 'SET_MESSAGE'; payload?: SocketMessage }
  | { type: 'SET_SOCKET'; payload: any };

interface SocketContextType {
  state: SocketState;
  setAction: (action?: SocketAction) => void;
  setSocket: (socket: any) => void;
}

const initialState: SocketState = {
  socket: null,
};

function socketReducer(
  state: SocketState = initialState,
  action: Action
): SocketState {
  switch (action.type) {
    case 'SET_ACTION':
      return { ...state, action: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const { is_public } = useApp();
  const { initialUser, user, setUser } = useUser();
  const { admin_profile, project, user: user_profile } = user ?? {};

  const [state, dispatch] = useReducer(socketReducer, initialState);
  const { action, message, socket } = state;

  useEffect(() => {
    if (
      !project?.id ||
      !message?.data.projectId ||
      project.id !== message.data.projectId
    ) {
      return;
    }

    switch (action) {
      case SocketAction.UPDATE_MODERATION:
        setUser((prev) =>
          prev
            ? { ...prev, moderation: message.data.moderation }
            : { ...initialUser, moderation: message.data.moderation }
        );
        break;
      case SocketAction.UPDATE_APPEARANCE:
        setUser((prev) =>
          prev
            ? { ...prev, appearance: message.data.appearance }
            : { ...initialUser, appearance: message.data.appearance }
        );
        break;
      default:
        break;
    }

    setAction();
  }, [action]);

  useEffect(() => {
    if (project?.id && socket === null) {
      setSocket(io(import.meta.env.VITE_SOCKET_URL));
    }
  }, [project]);

  useEffect(() => {
    if (socket !== null) {
      socket.on('error', (error: any) => {
        console.error('Connection error:', error);
      });

      socket.on('connect', () => {
        console.log('Connected to server:', socket.id);

        const profile = is_public ? admin_profile : user_profile;

        socket.emit('message', {
          action: 'setTagCreator',
          data: {
            id: profile?.id,
            name: profile?.full_name?.substring(0, 20),
            projectId: project?.id,
          },
        });
      });

      socket.on('close', () => {
        console.warn('Connection closed.');
        setSocket(null);
      });

      socket.on('message', (msg: SocketMessage) => {
        const {
          action,
          data: { projectId },
        } = msg;

        setMessage(msg);
        if (projectId === project?.id) {
          setAction(action);
        }
      });
    }
  }, [socket]);

  const setAction = (action?: SocketAction) => {
    dispatch({ type: 'SET_ACTION', payload: action });
  };

  const setMessage = (action?: SocketMessage) => {
    dispatch({ type: 'SET_MESSAGE', payload: action });
  };

  const setSocket = (socket: any) => {
    dispatch({ type: 'SET_SOCKET', payload: socket });
  };

  const value = useMemo(
    () => ({
      state,
      setAction,
      setSocket,
    }),
    [state]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
