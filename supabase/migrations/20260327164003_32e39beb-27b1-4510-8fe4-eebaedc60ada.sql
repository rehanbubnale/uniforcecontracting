CREATE POLICY "Allow public read on trade_licence"
ON public.trade_licence
FOR SELECT
TO anon, authenticated
USING (true);