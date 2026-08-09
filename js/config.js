/* ==========================================================================
   CONFIG.JS
   Credenciais PÚBLICAS do Supabase (URL + anon key).
   Estas duas são seguras para ficar no front-end e no GitHub — o acesso
   real aos dados é controlado pelas políticas de RLS configuradas no banco.
   NUNCA coloque aqui a service_role key nem chaves de APIs de IA.
   ========================================================================== */

// Copie estes dois valores em Project Settings > API no seu projeto Supabase.
const SUPABASE_URL = ' https://soaboeikrzhjbztuwhog.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvYWJvZWlrcnpoamJ6dHV3aG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMzQ4MjIsImV4cCI6MjEwMTcxMDgyMn0.VfACZiNVVR8Plw1HhyXDEk6EBvRtIDqZkPgJD5iKGtg';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,    // mantém a sessão salva no navegador entre recarregamentos
    autoRefreshToken: true,  // renova o token automaticamente antes de expirar
    detectSessionInUrl: true // necessário para os links de confirmação de email e recuperação de senha
  }
});
