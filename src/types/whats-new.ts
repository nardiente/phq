export interface ChangeType {
  id: number;
  name: string;
  change_type_color: ChangeTypeColor;
}

export interface Image {
  image: string;
  image_height: string;
  image_width: string;
}

export interface PlatformArea {
  id: number;
  name: string;
}

export interface WhatsNew {
  id: number;
  title: string;
  change_type_id: number;
  platform_area_id: number;
  description: string;
  formatted_description: string;
  image: string;
  image_height: string;
  image_width: string;
  images?: Image[];
  publication: string;
  created_by: number;
  publish_on: string;
  publish_on_date: string;
  change_type: ChangeType;
  change_types: ChangeType[];
  scheduled_date?: string;
  emoji_list: any;
  my_emoji: any;
  pinned?: boolean;
  clicks: WhatsNewClick[];
  shares: WhatsNewShare[];
  views: WhatsNewView[];
}

export interface WhatsNewClick {
  id: number;
  whats_new_id: number;
  created_by?: number | null;
  ip_address?: string | null;
}

export interface WhatsNewShare {
  id: number;
  whats_new_id: number;
  created_by?: number | null;
  ip_address?: string | null;
}

export interface WhatsNewView {
  id: number;
  whats_new_id: number;
  created_by?: number | null;
  ip_address?: string | null;
}

export interface ChangeTypeColor {
  font_color: string;
  background_color: string;
  id: number;
}

export enum Publications {
  DRAFT = 'Draft',
  PREVIEW = 'Preview',
  PUBLISHED = 'Published',
}
