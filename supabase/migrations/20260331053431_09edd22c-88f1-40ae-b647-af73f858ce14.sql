
-- Create a secure view exposing only public-safe employee columns
CREATE VIEW public.employees_public AS
SELECT employee_code, name, role, photo_url, is_director
FROM public.employees;

-- Grant anon and authenticated access to the view
GRANT SELECT ON public.employees_public TO anon, authenticated;

-- Drop the overly permissive RLS policy on the base table
DROP POLICY "Allow public read on employees" ON public.employees;

-- Add a restrictive policy: no public SELECT on the base table
-- (authenticated users who need sensitive data would need a role-based policy added later)
