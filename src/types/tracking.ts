export interface CodeSnippet {
  id: number;
  customer_id: number;
  snippet: string;
  created_at: string;
  updated_at: string;
  websites: Website[];
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
