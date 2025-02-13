import { useState, useEffect } from 'react';
import WidgetsSidebar from '../components/WidgetsSidebar';
import { WidgetConfig } from '../types/widget';
import { useNavigate, useParams } from 'react-router-dom';
import { generateId } from '../utils/generateId';
import { NewWidgetPreview } from '../components/WidgetPreview/NewWidgetPreview';

export default function WidgetsPage() {
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
      hideCloseButton: false
    }
  });
  const [activeSection, setActiveSection] = useState<string | null>('widget-type');
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleConfigUpdate = (newConfig: WidgetConfig) => {
    console.log('WidgetsPage config update:', {
      appearance: newConfig.appearance
    });
    setWidgetConfig(newConfig);
  };

  useEffect(() => {
    const loadWidget = async (widgetId: string) => {
      console.log('Loading widget with ID:', widgetId);
      try {
        const response = await fetch(`http://localhost:3001/widgets/${widgetId}`);
        if (!response.ok) {
          throw new Error('Failed to load widget');
        }
        const data = await response.json();
        console.log('Widget data:', data);
        setEditingWidgetId(data.id);
        setWidgetConfig({
          name: data.name,
          ...data.config
        });
      } catch (error) {
        console.error('Error loading widget:', error);
      }
    };

    console.log('ID parameter:', id);
    if (id) {
      loadWidget(id);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const widgetData = {
        id: editingWidgetId || generateId(), // Use existing ID if editing
        name: widgetConfig.name,
        config: widgetConfig,
        status: 'draft',
        lastUpdated: new Date().toISOString()
      };

      const endpoint = editingWidgetId 
        ? `http://localhost:3001/widgets/${editingWidgetId}`
        : 'http://localhost:3001/widgets';

      const response = await fetch(endpoint, {
        method: editingWidgetId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widgetData)
      });

      if (!response.ok) {
        throw new Error('Failed to save widget');
      }

      navigate('/widgets');
    } catch (error) {
      console.error('Error saving widget:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <WidgetsSidebar
          config={widgetConfig}
          onConfigUpdate={handleConfigUpdate}
          onSave={handleSave}
          onClose={() => navigate('/widgets')}
          onSectionChange={setActiveSection}
        />
      </div>

      <NewWidgetPreview config={widgetConfig} />
    </div>
  );
}
