import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import WidgetsSidebar from './WidgetsSidebar';
import { WidgetConfig } from '../types/widget';
import { NewWidgetPreview } from './WidgetPreview/NewWidgetPreview';
import { getApi, postApi, putApi } from '../utils/api/api';
import { SavedWidget } from '../types/savedWidget';
import { useWhatsNew } from '../contexts/WhatsNewContext';
import { useUser } from '../contexts/UserContext';

export const WidgetForm = ({
  id,
  setShowWidgetForm,
}: {
  id?: number;
  setShowWidgetForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    state: { posts },
    listWhatsNew,
  } = useWhatsNew();
  const { user: userDetails } = useUser();
  const { user } = userDetails ?? {};

  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
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
  });
  const [, setActiveSection] = useState<string | null>('widget-type');
  const [editingWidgetId, setEditingWidgetId] = useState<number>();

  useEffect(() => {
    getNotificationCount();
  }, []);

  useEffect(() => {
    const loadWidget = async (widgetId: number) => {
      getApi<SavedWidget>({ url: `widgets/${widgetId}` }).then((res) => {
        const {
          results: { data },
        } = res;

        if (data) {
          setEditingWidgetId(widgetId);
          setWidgetConfig((prev) => ({
            ...prev,
            name: prev.name,
            ...{ ...data.config, notificationCount: countUnreadPosts() },
          }));
        }
      });
    };

    if (id) {
      loadWidget(id);
    }
  }, [id]);

  useEffect(() => {
    if (user?.id) {
      getNotificationCount();
    }
  }, [posts.length, user]);

  const countUnreadPosts = () => {
    return posts.filter(
      (post) => !post.views.some((view) => view.created_by === user?.id)
    ).length;
  };

  const getNotificationCount = async () => {
    if (posts.length === 0) {
      await listWhatsNew();
    }

    setWidgetConfig((prev) => ({
      ...prev,
      notificationCount: countUnreadPosts(),
    }));
  };

  const handleSave = async () => {
    const widgetData: SavedWidget = {
      id: editingWidgetId,
      name: widgetConfig.name ?? '',
      config: widgetConfig,
      status: 'draft',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    if (editingWidgetId) {
      delete widgetData.id;
      putApi(`widgets/${editingWidgetId}`, widgetData).then((res) => {
        if (res.results.data) {
          setShowWidgetForm(false);
        }
      });
    } else {
      postApi({ url: 'widgets', payload: widgetData }).then((res) => {
        if (res.results.data) {
          setShowWidgetForm(false);
        }
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <WidgetsSidebar
          config={widgetConfig}
          onConfigUpdate={setWidgetConfig}
          onSave={handleSave}
          onClose={() => setShowWidgetForm(false)}
          onSectionChange={setActiveSection}
        />
      </div>

      <NewWidgetPreview config={widgetConfig} />
    </div>
  );
};
