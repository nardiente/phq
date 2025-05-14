export interface Targeting {
  delay?: number;
  devices?: string;
  hostnames?: string[];
  location?: string;
  timing?: string;
}

export interface WidgetAppearance {
  title?: string;
  description?: string;
  placement?: 'Top left' | 'Top right' | 'Bottom left' | 'Bottom right';
  offset?: string;
  width?: string;
  height?: string;
  preventScroll?: boolean;
  hideCloseButton?: boolean;
  position?: 'Left' | 'Right';
  backgroundColor?: string;
  textColor?: 'Light' | 'Dark';
}

export interface WidgetConfig {
  id?: string;
  name?: string;
  widgetType: 'Popover' | 'Modal' | 'Sidebar' | 'Embed';
  launcherType: 'Tab' | 'Floating';
  launcherPosition: 'Left' | 'Right';
  launcherIcon?: 'Bolt' | 'Roadmap' | 'WhatsNew' | 'Idea';
  launcherText?: string;
  iconColor?: 'Light' | 'Dark';
  backgroundColor?: string;
  notificationCount?: number;
  notificationType?: 'Count' | 'Dot' | 'None';
  appearance: WidgetAppearance;
  sections?: {
    ideas: boolean;
    roadmap: boolean;
    announcements: boolean;
    active: 'ideas' | 'roadmap' | 'announcements';
  };
  targeting?: Targeting;
  matchAllElements?: boolean;
  cssSelector?: string;
  advanced?: {
    openInNewWindow: boolean;
    hideBranding: boolean;
    mediaQuery: string;
  };
}

export const defaultWidgetConfig: WidgetConfig = {
  name: 'My first widget',
  widgetType: 'Sidebar',
  launcherType: 'Tab',
  launcherPosition: 'Right',
  launcherText: "What's new",
  launcherIcon: 'Bolt',
  iconColor: 'Light',
  backgroundColor: '#ff6334',
  notificationType: 'Count',
  appearance: {
    width: '450px',
    height: '600px',
    offset: '16px',
    position: 'Right',
    backgroundColor: '#ff6334',
    textColor: 'Light',
    placement: 'Bottom right',
  },
  sections: {
    active: 'ideas',
    ideas: true,
    roadmap: true,
    announcements: true,
  },
  targeting: {
    timing: 'Immediately',
    location: 'All pages',
    delay: 0,
  },
  advanced: {
    openInNewWindow: false,
    hideBranding: false,
    mediaQuery: '',
  },
};
