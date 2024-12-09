import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface SocketState {
  socket: any;
  tags: boolean;
}

type SocketAction =
  | { type: 'SET_SOCKET'; payload: any }
  | { type: 'SET_SOCKET_TAGS'; payload: boolean };

interface SocketContextType {
  state: SocketState;
  setSocket: (socket: any) => void;
  setSocketTags: (value: boolean) => void;
}

const initialState: SocketState = {
  socket: null,
  tags: false,
};

function socketReducer(
  state: SocketState = initialState,
  action: SocketAction
): SocketState {
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    case 'SET_SOCKET_TAGS':
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(socketReducer, initialState);

  const setSocket = (socket: any) => {
    dispatch({ type: 'SET_SOCKET', payload: socket });
  };

  const setSocketTags = (value: boolean) => {
    dispatch({ type: 'SET_SOCKET_TAGS', payload: value });
  };

  const value = useMemo(
    () => ({
      state,
      setSocket,
      setSocketTags,
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
