
-- Fix: Make the view use SECURITY INVOKER (safe default)
ALTER VIEW public.employees_public SET (security_invoker = on);
