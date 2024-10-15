import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://rbyyoxgpwdinepgzeeei.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieXlveGdwd2RpbmVwZ3plZWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTUxMjUsImV4cCI6MjA0NDU5MTEyNX0.n_hJ8UGfshqOsW2_QFP2ftwDJBkultMvVLUtrcTCOm0"
);

export default supabase;
