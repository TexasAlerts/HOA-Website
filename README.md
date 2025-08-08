# Doug Charles — Windsong Ranch HOA Campaign Site

## Quick Start
1) Unzip. Open in GitHub Desktop → Commit → Publish to GitHub.
2) In Vercel: New Project → Import the repo → Deploy.
3) In Vercel → Project → Settings → Environment Variables, add:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE
   - RESEND_API_KEY
   - EMAIL_TO = dbcharles@me.com
   - EMAIL_FROM = notifications@yourdomain.com
   - ENABLE_MODERATION = true
   - ADMIN_TOKEN = (long random string)

4) Redeploy. Visit `/admin/endorsements?token=YOUR_TOKEN` to approve items.

## Supabase Setup (7 minutes)
- Create project at supabase.com, copy URL + keys (Settings → API).
- SQL Editor → run:

```
create extension if not exists "pgcrypto";
create table if not exists endorsements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  reason text,
  approved boolean not null default false,
  created_at timestamp with time zone default now()
);
create table if not exists interests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  type text not null, -- updates | volunteer | host | meeting
  message text,
  created_at timestamp with time zone default now()
);
alter table endorsements enable row level security;
alter table interests enable row level security;
create policy "public_insert_endorsements" on endorsements for insert to anon with check (true);
create policy "public_select_approved_endorsements" on endorsements for select to anon using (approved = true);
create policy "public_insert_interests" on interests for insert to anon with check (true);
```

## Local Dev
```
npm install
npm run dev
```

## Notes
- Endorsements require moderation by default (ENABLE_MODERATION=true).
- All forms email to EMAIL_TO via Resend and persist to Supabase.
