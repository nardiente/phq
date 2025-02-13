import { WidgetConfig } from './widget';

export type WidgetStatus = 'draft' | 'published';

export interface SavedWidget {
  id?: number;
  name: string;
  config: WidgetConfig;
  status: WidgetStatus;
  lastUpdated: string; // ISO date string
  createdAt: string; // ISO date string
}
