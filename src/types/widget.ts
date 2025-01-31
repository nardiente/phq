export interface WidgetConfig {
  widgetId?: string;
  widgetType: 'Popover' | 'Modal' | 'Sidebar' | 'Embed';
  sections?: {
    ideas: boolean;
    roadmap: boolean;
    announcements: boolean;
  };
  appearance: {
    title?: string;
    description?: string;
    position?: 'Left' | 'Right';
    placement?: 'Top left' | 'Top right' | 'Bottom left' | 'Bottom right';
    width: string;
    height?: string;
    offset?: string;
    backgroundColor: string;
    textColor: 'Light' | 'Dark';
    showCompanyLogo?: boolean;
    theme?: string;
  };
  launcherType: 'Floating' | 'Tab';

  // Launcher properties
  cssSelector?: string;
  matchAllElements?: boolean;
  launcherText?: string;
  launcherPosition: 'Left' | 'Right';
  launcherIcon?: string;
  iconColor: 'Light' | 'Dark';
  backgroundColor: string;
  notificationType?: 'Count' | 'Dot' | 'None';

  // Widget behavior
  preventScroll?: boolean;
  hideCloseButton?: boolean;

  targeting?: {
    timing: string;
    location: string;
    delay: number;
  };
  advanced?: {
    openInNewWindow: boolean;
    hideBranding: boolean;
    mediaQuery: string;
    hostnames: string[];
  };
}

export const defaultWidgetConfig: WidgetConfig = {
  widgetType: 'Popover',
  sections: {
    ideas: true,
    roadmap: true,
    announcements: true,
  },
  appearance: {
    title: 'The title for your Widget...',
    description:
      'Suggest a feature, read through our Roadmap and check out our latest feature releases.',
    position: 'Right',
    width: '450px',
    backgroundColor: '#f9fafb',
    textColor: 'Light',
    showCompanyLogo: true,
    theme: 'Inherit from company',
  },
  launcherType: 'Floating',
  launcherPosition: 'Right',
  iconColor: 'Light',
  backgroundColor: '#5a00cd',
  notificationType: 'Count',
  preventScroll: false,
  hideCloseButton: false,

  targeting: {
    timing: 'Immediately',
    location: 'All pages',
    delay: 0,
  },
  advanced: {
    openInNewWindow: false,
    hideBranding: false,
    mediaQuery: '',
    hostnames: [],
  },
};
