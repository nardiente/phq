export interface CodeSnippet {
  id: number;
  customer_id: number;
  snippet: string;
  created_at: string;
  updated_at: string;
  websites: Website[];
}

export interface Tracking {
  id: number;
  customer_id: number;
  email_address: string;
  firstname: string;
  host: string;
  job_title: string;
  is_active: boolean;
  lastname: string;
  location: string;
  phone_number: string;
  role: string;
  signup_date: Date;
  website: string;
  created_at: Date;
  updated_at: Date;
}

export interface Website {
  id: number;
  code_snippet_id: number;
  created_by: number;
  updated_url: string;
  url: string;
  include_all_pages?: boolean;
  pages?: string[];
  updated_by?: number;
}
