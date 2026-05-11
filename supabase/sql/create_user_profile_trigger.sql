-- Creates a public.users profile automatically whenever a Supabase Auth user is created.
-- Run this once in Supabase Dashboard > SQL Editor.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, username, email, authenticated_role)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'username', ''),
      split_part(new.email, '@', 1)
    ),
    new.email,
    'authenticated'
  )
  on conflict (id) do update
  set
    username = coalesce(public.users.username, excluded.username),
    email = excluded.email,
    authenticated_role = coalesce(public.users.authenticated_role, excluded.authenticated_role);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

-- Backfill Auth users that already exist but do not have a matching public.users row yet.
insert into public.users (id, username, email, authenticated_role)
select
  auth_users.id,
  coalesce(
    nullif(auth_users.raw_user_meta_data ->> 'username', ''),
    split_part(auth_users.email, '@', 1)
  ) as username,
  auth_users.email,
  'authenticated' as authenticated_role
from auth.users as auth_users
where not exists (
  select 1
  from public.users as app_users
  where app_users.id = auth_users.id
);
