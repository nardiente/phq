import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { WidgetsSidebar } from './WidgetsSidebar';
import { NewWidgetPreview } from './WidgetPreview/NewWidgetPreview';
import { useWhatsNew } from '../contexts/WhatsNewContext';
import { useUser } from '../contexts/UserContext';
import AddPostForm from './whats_new/add_post_form/AddPostForm';
import { defaultWidgetConfig, Widget } from '../contexts/WidgetContext/type';
import { useWidget } from '../contexts/WidgetContext/WidgetProvider';

export const WidgetForm = ({
  id,
  setShowWidgetForm,
}: {
  id?: number;
  setShowWidgetForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    state: { posts, showAddForm },
    setShowAddForm,
  } = useWhatsNew();
  const {
    state: { editingWidgetId, config: widgetConfig, widget: savedWidget },
    addWidget,
    getNotificationCount,
    loadWidget,
    setWidgetConfig,
    updateWidget,
  } = useWidget();
  const { user: userDetails } = useUser();
  const { project } = userDetails ?? {};

  const [, setActiveSection] = useState<string | null>('widget-type');

  useEffect(() => {
    setShowAddForm(false);
  }, []);

  useEffect(() => {
    if (id) {
      loadWidget(id);
    }
  }, [id]);

  useEffect(() => {
    if (project?.id) {
      getNotificationCount();
    }
  }, [posts.length, project]);

  const handleSave = async (shouldClose: boolean = false) => {
    const widgetData: Widget = {
      id: editingWidgetId,
      name: widgetConfig.name ?? '',
      config: widgetConfig,
      status: savedWidget?.status ?? 'draft',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    if (editingWidgetId) {
      await updateWidget(widgetData);
    } else {
      await addWidget(widgetData);
    }
    if (shouldClose) {
      setWidgetConfig(defaultWidgetConfig);
      setShowWidgetForm(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <WidgetsSidebar
          onSave={handleSave}
          onClose={() => setShowWidgetForm(false)}
          onSectionChange={setActiveSection}
        />
      </div>

      <NewWidgetPreview className="flex-1 relative" />

      {showAddForm && <AddPostForm />}
    </div>
  );
};
