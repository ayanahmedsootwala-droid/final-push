import { createClient } from "@supabase/supabase-js";

const fallbackSupabaseUrl = "https://wiaqpuaenpvjaqvopknm.supabase.co";
const fallbackSupabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpYXFwdWFlbnB2amFxdm9wa25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTQ4NTksImV4cCI6MjA5NDg5MDg1OX0.7iCrsl4QdO73E-P-ZNtQ3x5WYR1bWQcKd_4QmlSHOmc";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? fallbackSupabaseUrl;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  fallbackSupabaseAnonKey;

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase env vars were missing at build/runtime, so the app is using the embedded public fallback config.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
