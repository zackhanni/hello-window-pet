import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on your current schema
export interface DatabaseUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  city?: string;
  created_at?: string;
}

export interface DatabasePet {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  species?: string;
  age?: number;
  image_url?: string;
  created_at: string;
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: unknown) {
  console.error("Supabase error:", error);
  return {
    error: error instanceof Error ? error.message : "Database operation failed",
    details: process.env.NODE_ENV === "development" ? error : undefined,
  };
}
