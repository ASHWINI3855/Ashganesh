-- Ensure the table exists with correct columns
create table if not exists public.contact_submissions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    phone text not null,
    subject text,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_submissions enable row level security;

-- Drop existing policy if it exists to avoid conflicts
drop policy if exists "Allow public insert on contact_submissions" on public.contact_submissions;

-- Create a fresh, highly permissive policy for public inserts
create policy "Allow public insert on contact_submissions" 
on public.contact_submissions 
for insert 
to public
with check (true);

-- Also allow public to read their own submissions (optional but helps some clients)
-- create policy "Allow public select" on public.contact_submissions for select using (true);
