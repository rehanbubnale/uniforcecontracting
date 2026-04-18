
-- The view needs to run as the owner (security definer) to bypass
-- the base table's RLS. This is safe because the view only exposes
-- non-sensitive columns (employee_code, name, role, photo_url, is_director).
-- Direct queries to the base 'employees' table remain blocked (no SELECT policy).
ALTER VIEW public.employees_public SET (security_invoker = off);
