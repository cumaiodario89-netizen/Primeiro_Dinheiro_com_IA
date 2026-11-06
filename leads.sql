-- Cole no Supabase: SQL Editor > New query > Run
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 7 and 30),
  origem text,
  consentimento boolean not null default false check (consentimento = true)
);
alter table public.leads enable row level security;
drop policy if exists "site pode inserir leads" on public.leads;
create policy "site pode inserir leads" on public.leads for insert to anon with check (true);
