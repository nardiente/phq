export interface Project {
  id?: number;
  created_at?: Date;
  created_by: number;
  custom_domain: string;
  description: string;
  hide_datetime?: boolean;
  is_index_search_engine?: boolean;
  is_public_settings?: boolean;
  is_visible_roadmap?: boolean;
  is_visible_upvotes?: boolean;
  is_visible_whats_new?: boolean;
  name: string;
  portal_subdomain: string;
  updated_by?: number;
  updated_at?: Date;
}
