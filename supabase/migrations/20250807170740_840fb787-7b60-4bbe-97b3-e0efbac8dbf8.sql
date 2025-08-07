-- Fix security issue: Add policy for scraping_logs table (only for public read access)
-- Since scraping is done by the system, we'll allow public read access for transparency
CREATE POLICY "Scraping logs are viewable by everyone" 
ON public.scraping_logs 
FOR SELECT 
USING (true);

-- Fix function search path issue
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;