import { useState } from 'react';
import WidgetsSidebar from '../components/WidgetsSidebar';
import { WidgetConfig } from '../types/widget';
import { WidgetPreview } from '../components/WidgetPreview';

export default function WidgetsPage() {
  const initialConfig: WidgetConfig = {
    widgetType: 'Popover',
    launcherType: 'Floating',
    backgroundColor: '#5a00cd',
    iconColor: 'Light',
    launcherIcon: 'Bolt',
    launcherPosition: 'Right',
    appearance: {
      width: '450px',
      height: '600px',
      offset: '16px',
      placement: 'Bottom right',
      backgroundColor: '#ffffff',
      textColor: 'Dark',
    },
  };

  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>(initialConfig);
  // const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    'widget-type'
  );

  const handleConfigUpdate = (field: keyof WidgetConfig, value: any) => {
    setWidgetConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSectionChange = (section: string | null) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <WidgetsSidebar
          config={widgetConfig}
          onConfigUpdate={handleConfigUpdate}
          onClose={() => {
            /* handle close */
          }}
          onSectionChange={handleSectionChange}
        />
      </div>
      <div className="flex-1 relative bg-gray-100">
        <div className="absolute inset-0">
          <WidgetPreview
            config={widgetConfig}
            isConfiguring={true}
            activeSection={activeSection ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
