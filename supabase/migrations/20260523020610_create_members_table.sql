create table public.members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null unique,
  linkedin text,
  lives_in_austin boolean not null default false,
  interests text[] not null default '{}',
  ai_experience text not null,
  weekly_time text not null,
  current_project text
);

alter table public.members
  add constraint members_ai_experience_check
  check (ai_experience in ('ships-regularly', 'prototypes', 'learning', 'new'));

alter table public.members
  add constraint members_weekly_time_check
  check (weekly_time in ('15-plus', '5-15', '1-5', 'under-1'));

alter table public.members enable row level security;

create policy "Allow anonymous inserts" on public.members
  for insert with check (true);
