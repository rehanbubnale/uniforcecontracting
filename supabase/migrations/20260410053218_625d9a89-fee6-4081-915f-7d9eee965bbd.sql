
CREATE VIEW public.employees_detail
WITH (security_invoker=off) AS
  SELECT
    employee_code,
    name,
    role,
    photo_url,
    is_director,
    experience,
    specialization,
    full_bio,
    job_title,
    sort_order
  FROM public.employees;
