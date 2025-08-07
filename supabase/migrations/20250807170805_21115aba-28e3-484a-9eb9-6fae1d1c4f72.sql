-- Fix security issue: Add policy for scraping_logs table
CREATE POLICY "Scraping logs are viewable by everyone" 
ON public.scraping_logs 
FOR SELECT 
USING (true);

-- Fix function search path issue by recreating function with correct search path
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