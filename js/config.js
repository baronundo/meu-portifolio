
const SUPABASE_URL = ' https://soaboeikrzhjbztuwhog.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvYWJvZWlrcnpoamJ6dHV3aG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMzQ4MjIsImV4cCI6MjEwMTcxMDgyMn0.VfACZiNVVR8Plw1HhyXDEk6EBvRtIDqZkPgJD5iKGtg';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,   
    autoRefreshToken: true,  
    detectSessionInUrl: true 
  }
});
