/**
 * Represents a prompt template stored in Supabase.
 */
export interface Template {
  id: string;
  name: string;
  description: string | null;
  structure: string;
  category: string;
  is_default: boolean;
  placeholders: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

/**
 * Represents a global prompt entry in Supabase.
 */
export interface GlobalPrompt {
  id: string;
  title: string | null;
  raw_input: string;
  refined_prompt: string;
  category: string;
  target_model: string;
  settings: Record<string, any> | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}