-- ============================================================================
-- 02_profiles_trigger.sql
-- Cria/atualiza a função e o trigger que preenchem profiles automaticamente
-- a cada novo cadastro no Supabase Auth.
-- Seguro para rodar mais de uma vez (idempotente): usa CREATE OR REPLACE
-- para a função e DROP TRIGGER IF EXISTS antes de recriar o trigger.
-- Rode depois do 01_schema.sql.
-- ============================================================================

-- "set search_path = public" evita o alerta de segurança do Supabase Linter
-- para funções SECURITY DEFINER com search_path mutável.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, sobrenome, telefone, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'nome',
    new.raw_user_meta_data ->> 'sobrenome',
    new.raw_user_meta_data ->> 'telefone',
    new.email
  )
  on conflict (id) do nothing; -- evita erro se o profile já existir por algum motivo
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
