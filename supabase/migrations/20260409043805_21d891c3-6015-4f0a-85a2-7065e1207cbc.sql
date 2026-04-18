CREATE POLICY "Allow public read on equipments"
ON public.equipments
FOR SELECT
TO anon, authenticated
USING (true);