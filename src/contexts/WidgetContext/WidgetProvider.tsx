import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Widget, WidgetActionTypes, WidgetConfig, WidgetState } from './type';
import { widgetReducer } from './reducer';
import { deleteApi, getApi, postApi, putApi } from '../../utils/api/api';
import { useWhatsNew } from '../WhatsNewContext';
import { useUser } from '../UserContext';
import { useSocket } from '../SocketContext';
import { SocketAction } from '../../types/socket';
import { getCustomerKaslKey } from '../../utils/localStorage';
import { useApp } from '../AppContext';

const initialState: WidgetState = {
  config: {
    name: 'My first widget',
    widgetType: 'Modal',
    launcherType: 'Tab',
    launcherPosition: 'Right',
    backgroundColor: '#FF6334',
    appearance: {
      backgroundColor: '#ff6334',
      width: '450px',
      height: '600px',
      position: 'Right',
      preventScroll: false,
      hideCloseButton: false,
    },
    notificationType: 'Count',
    sections: {
      active: 'ideas',
      announcements: true,
      ideas: true,
      roadmap: true,
    },
  },
  fetching: false,
  loading: false,
  widgets: [],
};

interface WidgetContextType {
  state: WidgetState;
  addWidget: (widget: Partial<Widget>) => Promise<void>;
  deleteWidget: (id: number) => Promise<void>;
  getNotificationCount: () => Promise<void>;
  listWidgets: () => Promise<void>;
  loadPublishedWidget: () => Promise<void>;
  loadWidget: (id: number) => Promise<void>;
  setEditingWidgetId: (id?: number) => void;
  setWidgetConfig: (config: WidgetConfig) => void;
  updateWidget: (widget: Partial<Widget>) => Promise<void>;
}

const Context = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(widgetReducer, initialState);

  const { is_public } = useApp();
  const {
    state: { posts },
    listWhatsNew,
  } = useWhatsNew();
  const { user: userContext } = useUser();
  const { admin_profile, moderation, project, user } = userContext ?? {};
  const {
    state: { action, message, socket },
    setAction,
  } = useSocket();

  useEffect(() => {
    if (
      !project?.id ||
      !message?.data.projectId ||
      message.data.projectId !== project.id
    ) {
      return;
    }

    const widget: Widget = message.data.widget;

    switch (action) {
      case SocketAction.ADD_WIDGET:
        dispatch({
          type: WidgetActionTypes.ADD,
          payload: widget,
        });
        break;
      case SocketAction.DELETE_WIDGET:
        dispatch({
          type: WidgetActionTypes.DELETE,
          payload: widget.id ?? 0,
        });
        break;
      case SocketAction.UPDATE_WIDGET:
        dispatch({
          type: WidgetActionTypes.UPDATE,
          payload: widget,
        });
        if (is_public) {
          setWidgetConfig(widget.config);
          dispatch({ type: WidgetActionTypes.SET_WIDGET, payload: widget });
        }
        break;
      default:
        break;
    }
    setAction();
  }, [action]);

  useEffect(() => {
    if (is_public && project?.id) {
      loadPublishedWidget();
    }
  }, [project]);

  const addWidget = async (widget: Partial<Widget>) => {
    dispatch({ type: WidgetActionTypes.LOADING, payload: true });
    postApi<Widget>({ url: 'widgets', payload: widget })
      .then((res) => {
        if (res.results.data) {
          setEditingWidgetId(res.results.data.id);
          dispatch({
            type: WidgetActionTypes.ADD,
            payload: res.results.data,
          });
          socket?.emit('message', {
            action: SocketAction.ADD_WIDGET,
            data: {
              user_id: user?.id,
              projectId: project?.id,
              widget: res.results.data,
            },
          });
        }
      })
      .finally(() =>
        dispatch({ type: WidgetActionTypes.LOADING, payload: false })
      );
  };

  const deleteWidget = async (id: number) => {
    dispatch({ type: WidgetActionTypes.LOADING, payload: true });
    deleteApi<Widget>({ url: `widgets/${id}` })
      .then((res) => {
        if (res.results.data) {
          dispatch({
            type: WidgetActionTypes.DELETE,
            payload: res.results.data.id ?? 0,
          });
          socket?.emit('message', {
            action: SocketAction.DELETE_WIDGET,
            data: {
              user_id: user?.id,
              projectId: project?.id,
              widget: res.results.data,
            },
          });
        }
      })
      .finally(() =>
        dispatch({ type: WidgetActionTypes.LOADING, payload: false })
      );
  };

  const listWidgets = async () => {
    dispatch({ type: WidgetActionTypes.FETCHING, payload: true });
    setEditingWidgetId(undefined);
    getApi<Widget[]>({ url: 'widgets' })
      .then((res) => {
        if (res.results.data) {
          dispatch({
            type: WidgetActionTypes.SET,
            payload: res.results.data,
          });
        }
      })
      .finally(() =>
        dispatch({ type: WidgetActionTypes.FETCHING, payload: false })
      );
  };

  const loadPublishedWidget = async () => {
    const customerKey = getCustomerKaslKey();
    getApi<Widget>({
      url: 'widgets/published',
      useCustomerKey:
        customerKey !== undefined && customerKey.trim().length > 0,
      useSessionToken: is_public && moderation?.allow_anonymous_access === true,
    }).then(async (res) => {
      const {
        results: { data },
      } = res;

      if (data) {
        setEditingWidgetId(data.id);
        dispatch({ type: WidgetActionTypes.SET_WIDGET, payload: data });
        setWidgetConfig({
          ...data.config,
          notificationCount:
            !data.config.notificationCount ||
            data.config.notificationCount === 0
              ? await countUnreadPosts()
              : data.config.notificationCount,
        });
      }
    });
  };

  const loadWidget = async (id: number) => {
    getApi<Widget>({ url: `widgets/${id}` }).then(async (res) => {
      const {
        results: { data },
      } = res;

      if (data) {
        setEditingWidgetId(id);
        dispatch({ type: WidgetActionTypes.SET_WIDGET, payload: data });
        setWidgetConfig({
          ...data.config,
          notificationCount:
            !data.config.notificationCount ||
            data.config.notificationCount === 0
              ? await countUnreadPosts()
              : data.config.notificationCount,
        });
      }
    });
  };

  const setEditingWidgetId = (id?: number) => {
    dispatch({ type: WidgetActionTypes.SET_EDITING_WIDGET_ID, payload: id });
  };

  const setWidgetConfig = async (config: Partial<WidgetConfig>) => {
    dispatch({
      type: WidgetActionTypes.SET_WIDGET_CONFIG,
      payload: config,
    });
  };

  const updateWidget = async (updatedWidget: Partial<Widget>) => {
    dispatch({ type: WidgetActionTypes.LOADING, payload: true });
    putApi<Widget>(`widgets/${updatedWidget.id}`, updatedWidget)
      .then((res) => {
        if (res.results.data) {
          dispatch({
            type: WidgetActionTypes.UPDATE,
            payload: { ...res.results.data, ...updatedWidget },
          });
          socket?.emit('message', {
            action: SocketAction.UPDATE_WIDGET,
            data: {
              user_id: user?.id,
              projectId: project?.id,
              widget: res.results.data,
            },
          });
        }
      })
      .finally(() => {
        dispatch({ type: WidgetActionTypes.LOADING, payload: false });
      });
  };

  const countUnreadPosts = async () => {
    if (posts.length === 0) {
      await listWhatsNew();
    }

    return posts.filter(
      (post) =>
        !post.views.some(
          (view) =>
            view.created_by === (is_public ? admin_profile?.id : user?.id)
        )
    ).length;
  };

  const getNotificationCount = async () => {
    if (posts.length === 0) {
      await listWhatsNew();
    }

    setWidgetConfig({
      ...state.config,
      notificationCount: await countUnreadPosts(),
    });
  };

  const value = useMemo(
    () => ({
      state,
      addWidget,
      deleteWidget,
      getNotificationCount,
      listWidgets,
      loadPublishedWidget,
      loadWidget,
      setEditingWidgetId,
      setWidgetConfig,
      updateWidget,
    }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useWidget() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
}
