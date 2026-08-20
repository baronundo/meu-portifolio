

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  sobrenome text,
  telefone text,
  email text,
  created_at timestamp with time zone default now()
);

alter table public.profiles add column if not exists nome text;
alter table public.profiles add column if not exists sobrenome text;
alter table public.profiles add column if not exists telefone text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists created_at timestamp with time zone default now();
