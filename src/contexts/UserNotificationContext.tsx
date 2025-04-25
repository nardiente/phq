import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { UserNotification } from '../types/notification';
import { getApi } from '../utils/api/api';
import { useSocket } from './SocketContext';
import { SocketAction } from '../types/socket';

interface UserNotificationState {
  fetching: boolean;
  userNotification: UserNotification;
}

type UserNotificationAction =
  | { type: 'SET_FETCHING'; payload: boolean }
  | {
      type: 'SET_NOTIFICATION';
      payload: UserNotification;
    };

interface UserNotificationContextType {
  state: UserNotificationState;
  getNotifications: (seeMore?: boolean) => void;
  setFetching: (value: boolean) => Promise<void>;
  setUserNotification: (userNotification: UserNotification) => Promise<void>;
}

const initialState: UserNotificationState = {
  fetching: true,
  userNotification: {
    has_unread: false,
    notifications: [],
  },
};

function userNotificationReducer(
  state: UserNotificationState,
  action: UserNotificationAction
): UserNotificationState {
  switch (action.type) {
    case 'SET_FETCHING':
      return { ...state, fetching: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, userNotification: action.payload };
    default:
      return state;
  }
}

const UserNotificationContext = createContext<
  UserNotificationContextType | undefined
>(undefined);

export function UserNotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(userNotificationReducer, initialState);

  const {
    state: { action },
    setAction,
  } = useSocket();

  useEffect(() => {
    switch (action) {
      case SocketAction.UPDATE_NOTIFICATION:
        getNotifications();
        break;
      default:
        break;
    }
    setAction();
  }, [action]);

  const getNotifications = (seeMore?: boolean) => {
    setFetching(true);
    const params = {};
    if (!seeMore) {
      Object.assign(params, { limit: 3 });
    }

    getApi<UserNotification>({
      url: 'notifications',
      params: params,
      // useSessionToken: is_public && moderation?.user_login === true, // Uncomment if needed
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setUserNotification(res.results.data);
      }
    });
  };

  const setFetching = async (value: boolean) => {
    dispatch({
      type: 'SET_FETCHING',
      payload: value,
    });
  };

  const setUserNotification = async (userNotification: UserNotification) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: userNotification,
    });
  };

  const value = useMemo(
    () => ({
      state,
      getNotifications,
      setFetching,
      setUserNotification,
    }),
    [state]
  );

  return (
    <UserNotificationContext.Provider value={value}>
      {children}
    </UserNotificationContext.Provider>
  );
}

export function useUserNotification() {
  const context = useContext(UserNotificationContext);
  if (context === undefined) {
    throw new Error(
      'useUserNotification must be used within a UserNotificationProvider'
    );
  }
  return context;
}
