import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  Notification,
  NotificationRequest,
  UserNotification,
} from '../types/notification';
import { getApi, postApi } from '../utils/api/api';
import { useSocket } from './SocketContext';
import { SocketAction } from '../types/socket';
import { useUser } from './UserContext';
import { FeedbackComment } from '../types/feedback';
import { useApp } from './AppContext';

interface UserNotificationState {
  fetching: boolean;
  loading: boolean;
  userNotification: UserNotification;
}

type UserNotificationAction =
  | { type: 'SET_FETCHING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_NOTIFICATION'; payload: Notification }
  | {
      type: 'SET_USER_NOTIFICATION';
      payload: UserNotification;
    }
  | { type: 'UPDATE_NOTIFICATION'; payload: Notification };

interface UserNotificationContextType {
  state: UserNotificationState;
  create: (notification: NotificationRequest) => Promise<void>;
  getNotifications: (seeMore?: boolean) => void;
  setFetching: (value: boolean) => Promise<void>;
  setUserNotification: (userNotification: UserNotification) => Promise<void>;
  updateNotification: (notification: Notification) => Promise<void>;
}

const initialState: UserNotificationState = {
  fetching: true,
  loading: false,
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
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        userNotification: {
          ...state.userNotification,
          notifications: [
            action.payload,
            ...state.userNotification.notifications,
          ],
        },
      };
    case 'SET_USER_NOTIFICATION':
      return { ...state, userNotification: action.payload };
    case 'UPDATE_NOTIFICATION':
      return {
        ...state,
        userNotification: {
          ...state.userNotification,
          notifications: state.userNotification.notifications.map(
            (notification) =>
              notification.id === action.payload.id
                ? action.payload
                : notification
          ),
        },
      };
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

  const { is_public } = useApp();
  const {
    state: { action, message, socket },
    setAction,
  } = useSocket();
  const { user: userContext } = useUser();
  const { moderation, project, user } = userContext ?? {};

  useEffect(() => {
    if (
      !project?.id ||
      !message?.data.projectId ||
      project.id !== message.data.projectId
    ) {
      return;
    }

    switch (action) {
      case SocketAction.ADD_COMMENT:
        if (
          !is_public &&
          moderation?.allow_anonymous_access &&
          moderation.moderate_settings.comments
        ) {
          const comment: FeedbackComment = message.data.comment;
          create({
            feedback_id: comment.feedback_id,
            feedback_comment_id: comment.id,
            message:
              'A new <a class="active-link-color" href="/moderation">comment</a> is added to an idea and requires approval.',
            notified_user_id: user?.id ?? 0,
          });
        }
        break;
      case SocketAction.ADD_IDEA:
        if (
          !is_public &&
          moderation?.allow_anonymous_access &&
          moderation.moderate_settings.feedback
        ) {
          create({
            feedback_id: message.data.idea.id,
            message:
              'A new <a class="active-link-color" href="/moderation">idea</a> is submitted and requires approval.',
            notified_user_id: user?.id ?? 0,
          });
        }
        break;
      case SocketAction.UPDATE_NOTIFICATION:
        getNotifications();
        dispatch({
          type: 'UPDATE_NOTIFICATION',
          payload: message.data.notification,
        });
        break;
      default:
        break;
    }
    setAction();
  }, [action]);

  const create = async (notification: NotificationRequest) => {
    setLoading(true);
    postApi<Notification>({ url: 'notifications', payload: notification }).then(
      (res) => {
        setLoading(false);
        if (res.results.data) {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: res.results.data,
          });
        }
      }
    );
  };

  const getNotifications = (seeMore?: boolean) => {
    setFetching(true);
    const params = {};
    if (!seeMore) {
      Object.assign(params, { limit: 3 });
    }

    getApi<UserNotification>({
      url: 'notifications',
      params: params,
      // useSessionToken: is_public && moderation?.allow_anonymous_access === true, // Uncomment if needed
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

  const setLoading = async (value: boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: value,
    });
  };

  const setUserNotification = async (userNotification: UserNotification) => {
    dispatch({
      type: 'SET_USER_NOTIFICATION',
      payload: userNotification,
    });
  };

  const updateNotification = async (notification: Notification) => {
    dispatch({ type: 'UPDATE_NOTIFICATION', payload: notification });
    socket?.emit('message', {
      action: SocketAction.UPDATE_NOTIFICATION,
      data: { notification, projectId: project?.id },
    });
  };

  const value = useMemo(
    () => ({
      state,
      create,
      getNotifications,
      setFetching,
      setUserNotification,
      updateNotification,
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
