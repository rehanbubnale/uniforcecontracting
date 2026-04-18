ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS planned_img_url_2 text,
ADD COLUMN IF NOT EXISTS planned_img_url_3 text,
ADD COLUMN IF NOT EXISTS planned_img_url_4 text;