-- ============================================================================
-- 01_schema.sql
-- Cria a tabela profiles (dados complementares do usuário autenticado).
-- Seguro para rodar mais de uma vez (idempotente).
-- Rode este script PRIMEIRO, uma única vez por projeto Supabase.
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  sobrenome text,
  telefone text,
  email text,
  created_at timestamp with time zone default now()
);

-- Garante que colunas existam mesmo se a tabela já tiver sido criada
-- numa versão anterior com estrutura diferente.
alter table public.profiles add column if not exists nome text;
alter table public.profiles add column if not exists sobrenome text;
alter table public.profiles add column if not exists telefone text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists created_at timestamp with time zone default now();
