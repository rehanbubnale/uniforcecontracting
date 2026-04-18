CREATE OR REPLACE VIEW public.employees_detail AS
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
    sort_order,
    projects
  FROM public.employees;