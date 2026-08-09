-- ============================================================================
-- 03_rls_policies.sql
-- Ativa Row Level Security e cria as policies de isolamento por usuário.
-- Seguro para rodar mais de uma vez (idempotente): usa DROP POLICY IF EXISTS
-- antes de recriar cada policy, evitando erro de "policy already exists".
-- Rode depois do 02_profiles_trigger.sql.
-- ============================================================================

alter table public.profiles enable row level security;

drop policy if exists "Usuários podem ver o próprio perfil" on public.profiles;
create policy "Usuários podem ver o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Usuários podem atualizar o próprio perfil" on public.profiles;
create policy "Usuários podem atualizar o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Não há policy de INSERT: o único caminho de inserção é o trigger
-- (02_profiles_trigger.sql), que roda como SECURITY DEFINER e por isso
-- não precisa de policy própria. Isso impede que o front-end insira
-- linhas arbitrárias na tabela.
--
-- Não há policy de DELETE: não há necessidade funcional no momento.
-- Se precisar futuramente, adicione aqui seguindo o mesmo padrão
-- (drop policy if exists ... ; create policy ...).
