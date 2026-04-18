
-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);

-- Public read access for employees (only public fields will be selected in code)
CREATE POLICY "Allow public read on employees" ON public.employees FOR SELECT TO anon, authenticated USING (true);

-- Public insert for contact messages
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
