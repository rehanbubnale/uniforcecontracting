
-- Add sort_order column to employees
ALTER TABLE public.employees ADD COLUMN sort_order integer DEFAULT 0;

-- Recreate the employees_public view to include sort_order for ordering
-- but we won't expose sort_order to the frontend, we just need it for ORDER BY
-- The view already exists, so we drop and recreate
DROP VIEW IF EXISTS public.employees_public;

CREATE VIEW public.employees_public
WITH (security_invoker = off)
AS
SELECT
  employee_code,
  name,
  role,
  photo_url,
  is_director,
  sort_order
FROM public.employees;

-- Grant select on the view to anon and authenticated
GRANT SELECT ON public.employees_public TO anon, authenticated;
