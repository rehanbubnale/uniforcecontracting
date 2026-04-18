
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on machines" ON public.machines FOR SELECT TO anon, authenticated USING (true);
