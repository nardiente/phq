export const defaultWidgetConfig: WidgetConfig = {
  name: 'My first widget',
  widgetType: 'Modal',
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
    preventScroll: false,
    hideCloseButton: false,
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

export interface Targeting {
  delay?: number;
  devices?: string;
  hostnames?: string[];
  location?: string;
  timing?: string;
}

export interface Widget {
  id?: number;
  user_id?: number;
  name: string;
  config: WidgetConfig;
  status: WidgetStatus;
  lastUpdated: string; // ISO date string
  createdAt: string; // ISO date string
}

export type WidgetAction =
  | { type: WidgetActionTypes.ADD; payload: Widget }
  | { type: WidgetActionTypes.DELETE; payload: number }
  | { type: WidgetActionTypes.FETCHING; payload: boolean }
  | { type: WidgetActionTypes.LOADING; payload: boolean }
  | { type: WidgetActionTypes.SET; payload: Widget[] }
  | {
      type: WidgetActionTypes.SET_EDITING_WIDGET_ID;
      payload: number | undefined;
    }
  | { type: WidgetActionTypes.SET_WIDGET; payload: Widget }
  | {
      type: WidgetActionTypes.SET_WIDGET_CONFIG;
      payload: Partial<WidgetConfig>;
    }
  | { type: WidgetActionTypes.UPDATE; payload: Widget };

export enum WidgetActionTypes {
  ADD = 'ADD',
  DELETE = 'DELETE',
  FETCHING = 'FETCHING',
  LOADING = 'LOADING',
  SET = 'SET',
  SET_EDITING_WIDGET_ID = 'SET_EDITING_WIDGET_ID',
  SET_WIDGET = 'SET_WIDGET',
  SET_WIDGET_CONFIG = 'SET_WIDGET_CONFIG',
  UPDATE = 'UPDATE',
}

export interface WidgetAdvanced {
  openInNewWindow: boolean;
  hideBranding: boolean;
  mediaQuery: string;
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
  sections?: WidgetSection;
  targeting?: Targeting;
  matchAllElements?: boolean;
  cssSelector?: string;
  advanced?: WidgetAdvanced;
}

export interface WidgetSection {
  ideas: boolean;
  roadmap: boolean;
  announcements: boolean;
  active: 'ideas' | 'roadmap' | 'announcements';
}

export interface WidgetState {
  config: WidgetConfig;
  editingWidgetId?: number;
  fetching: boolean;
  loading: boolean;
  widget?: Widget;
  widgets: Widget[];
}

export type WidgetStatus = 'draft' | 'published';
