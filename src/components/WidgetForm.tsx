import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import WidgetsSidebar from './WidgetsSidebar';
import { WidgetConfig } from '../types/widget';
import { NewWidgetPreview } from './WidgetPreview/NewWidgetPreview';
import { getApi, postApi, putApi } from '../utils/api/api';
import { SavedWidget } from '../types/savedWidget';

export const WidgetForm = ({
  id,
  setShowWidgetForm,
}: {
  id?: number;
  setShowWidgetForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    name: 'My first widget',
    widgetType: 'Modal',
    launcherType: 'Tab',
    launcherPosition: 'Right',
    backgroundColor: '#FF6334',
    appearance: {
      width: '450px',
      height: '600px',
      position: 'Right',
      preventScroll: false,
      hideCloseButton: false,
    },
  });
  const [, setActiveSection] = useState<string | null>('widget-type');
  const [editingWidgetId, setEditingWidgetId] = useState<number>();

  useEffect(() => {
    const loadWidget = async (widgetId: number) => {
      console.log('Loading widget with ID:', widgetId);
      getApi<SavedWidget>({ url: `widgets/${widgetId}` }).then((res) => {
        const {
          results: { data },
        } = res;

        if (data) {
          console.log('Widget data:', data);
          setEditingWidgetId(data.id);
          setWidgetConfig({
            name: data.name,
            ...data.config,
          });
        }
      });
    };

    console.log('ID parameter:', id);
    if (id) {
      loadWidget(id);
    }
  }, [id]);

  const handleConfigUpdate = (newConfig: WidgetConfig) => {
    console.log('WidgetsPage config update:', {
      appearance: newConfig.appearance,
    });
    setWidgetConfig(newConfig);
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
    <div className="flex h-screen">
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <WidgetsSidebar
          config={widgetConfig}
          onConfigUpdate={handleConfigUpdate}
          onSave={handleSave}
          onClose={() => setShowWidgetForm(false)}
          onSectionChange={setActiveSection}
        />
      </div>

      <NewWidgetPreview config={widgetConfig} />
    </div>
  );
};
