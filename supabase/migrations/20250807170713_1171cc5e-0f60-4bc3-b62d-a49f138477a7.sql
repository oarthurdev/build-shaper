-- Create builds table for storing scraped and user builds
CREATE TABLE public.builds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  playstyle TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  difficulty TEXT,
  author TEXT,
  source_url TEXT,
  source_site TEXT,
  tags TEXT[],
  skills JSONB NOT NULL DEFAULT '{}',
  gear JSONB NOT NULL DEFAULT '{}',
  stats JSONB NOT NULL DEFAULT '{}',
  season TEXT,
  patch_version TEXT,
  is_meta BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_builds table for user-saved builds
CREATE TABLE public.user_builds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  build_id UUID NOT NULL REFERENCES public.builds(id) ON DELETE CASCADE,
  custom_name TEXT,
  notes TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scraping_logs table to track scraping activity
CREATE TABLE public.scraping_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site TEXT NOT NULL,
  url TEXT NOT NULL,
  status TEXT NOT NULL,
  builds_found INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_logs ENABLE ROW LEVEL SECURITY;

-- Builds are public (anyone can read)
CREATE POLICY "Builds are viewable by everyone" 
ON public.builds 
FOR SELECT 
USING (true);

-- Only authenticated users can view user_builds that belong to them
CREATE POLICY "Users can view their own saved builds" 
ON public.user_builds 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved builds" 
ON public.user_builds 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved builds" 
ON public.user_builds 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved builds" 
ON public.user_builds 
FOR DELETE 
USING (auth.uid() = user_id);

-- Scraping logs are admin only (no policies for public access)

-- Create indexes for better performance
CREATE INDEX idx_builds_class ON public.builds(class);
CREATE INDEX idx_builds_playstyle ON public.builds(playstyle);
CREATE INDEX idx_builds_rating ON public.builds(rating DESC);
CREATE INDEX idx_builds_source_site ON public.builds(source_site);
CREATE INDEX idx_builds_is_meta ON public.builds(is_meta);
CREATE INDEX idx_user_builds_user_id ON public.user_builds(user_id);
CREATE INDEX idx_user_builds_build_id ON public.user_builds(build_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_builds_updated_at
BEFORE UPDATE ON public.builds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_builds_updated_at
BEFORE UPDATE ON public.user_builds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();