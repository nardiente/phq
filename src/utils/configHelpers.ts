import { WidgetConfig } from '../contexts/WidgetContext/type';

export const getSectionVisibility = (
  config: WidgetConfig,
  sectionKey: keyof Required<WidgetConfig>['sections']
) => {
  return config.sections?.[sectionKey] !== false;
};

export const getBackgroundColor = (config: WidgetConfig) => {
  return config.appearance.backgroundColor;
};

export const getTextColor = (config: WidgetConfig) => {
  return config.appearance.textColor === 'Light'
    ? 'text-white'
    : 'text-gray-900';
};
