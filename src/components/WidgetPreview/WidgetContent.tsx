import { UI_TEXT } from '../../constants/uiText';
import { useWidget } from '../../contexts/WidgetContext/WidgetProvider';
import {
  getSectionVisibility,
  getBackgroundColor,
  getTextColor,
} from '../../utils/configHelpers';
import { IdeasContent } from './Ideas/IdeasContent';
import { RoadmapContent } from './Roadmap/RoadmapContent';
import { WhatsNewContent } from './WhatsNew/WhatsNewContent';

// Shared mock data
export const WidgetContent = () => {
  const {
    state: { config },
  } = useWidget();

  // Validate required props
  if (!config) {
    return null;
  }

  // Validate required config properties
  if (!config.sections) {
    return null;
  }

  const handleError = (error: Error) => {
    console.error('Error in WidgetContent:', error);
    // Could add error boundary or fallback UI here
  };

  try {
    return (
      <div className="widget-content">
        <header
          className="p-4"
          style={{ backgroundColor: getBackgroundColor(config) }}
        >
          <h1 className={getTextColor(config)}>
            {config.appearance.title || UI_TEXT.WIDGET_HEADERS.DEFAULT_TITLE}
          </h1>
          <p className={getTextColor(config)}>
            {config.appearance.description ||
              UI_TEXT.WIDGET_HEADERS.DEFAULT_DESCRIPTION}
          </p>
        </header>
        <WidgetInterface />
      </div>
    );
  } catch (error) {
    handleError(error as Error);
    return null;
  }
};

// Separate component for the main interface
const WidgetInterface = () => {
  const {
    state: { config },
  } = useWidget();

  return (
    <>
      {/* Tabs */}
      <WidgetTabs />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Only show Ideas section for now since it's fully implemented */}
          {config.sections?.active === 'ideas' && <IdeasContent />}
          {config.sections?.active === 'roadmap' && <RoadmapContent />}
          {config.sections?.active === 'announcements' && <WhatsNewContent />}
        </div>
      </div>
    </>
  );
};

// Separate components for each section
const WidgetTabs = () => {
  const {
    state: { config },
    setWidgetConfig,
  } = useWidget();

  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {getSectionVisibility(config, 'ideas') && (
          <button
            className={`px-4 py-2 ${config.sections?.active === 'ideas' ? 'text-[#FF6334] border-b-2 border-[#FF6334] font-medium' : 'text-gray-600'}`}
            onClick={() =>
              setWidgetConfig({
                ...config,
                sections: {
                  ...config.sections,
                  active: 'ideas',
                  announcements: true,
                  ideas: true,
                  roadmap: true,
                },
              })
            }
          >
            {UI_TEXT.WIDGET_SECTIONS.IDEAS}
          </button>
        )}
        {getSectionVisibility(config, 'roadmap') && (
          <button
            className={`px-4 py-2 ${config.sections?.active === 'roadmap' ? 'text-[#FF6334] border-b-2 border-[#FF6334] font-medium' : 'text-gray-600'}`}
            onClick={() =>
              setWidgetConfig({
                ...config,
                sections: {
                  ...config.sections,
                  active: 'roadmap',
                  announcements: true,
                  ideas: true,
                  roadmap: true,
                },
              })
            }
          >
            {UI_TEXT.WIDGET_SECTIONS.ROADMAP}
          </button>
        )}
        {getSectionVisibility(config, 'announcements') && (
          <button
            className={`px-4 py-2 ${config.sections?.active === 'announcements' ? 'text-[#FF6334] border-b-2 border-[#FF6334] font-medium' : 'text-gray-600'}`}
            onClick={() =>
              setWidgetConfig({
                ...config,
                sections: {
                  ...config.sections,
                  active: 'announcements',
                  announcements: true,
                  ideas: true,
                  roadmap: true,
                },
              })
            }
          >
            {UI_TEXT.WIDGET_SECTIONS.WHATS_NEW}
          </button>
        )}
      </div>
    </div>
  );
};
