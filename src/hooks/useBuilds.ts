import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BuildData } from '@/types/build';
import { useToast } from '@/hooks/use-toast';

export const useBuilds = () => {
  const [builds, setBuilds] = useState<BuildData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBuilds = async (className?: string, playstyle?: string) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('builds')
        .select('*')
        .order('rating', { ascending: false })
        .order('created_at', { ascending: false });

      if (className) {
        query = query.eq('class', className);
      }

      if (playstyle) {
        query = query.eq('playstyle', playstyle);
      }

      const { data, error: fetchError } = await query.limit(20);

      if (fetchError) {
        throw fetchError;
      }

      setBuilds((data || []) as BuildData[]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch builds';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const scrapeBuilds = async (
    site: 'maxroll' | 'd4builds',
    className?: string,
    playstyle?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: scrapeError } = await supabase.functions.invoke('scrape-builds', {
        body: {
          site,
          class: className,
          playstyle,
          limit: 10,
        },
      });

      if (scrapeError) {
        throw scrapeError;
      }

      if (!data.success) {
        throw new Error(data.error || 'Scraping failed');
      }

      toast({
        title: 'Success',
        description: `Found ${data.builds_found} builds from ${site}`,
      });

      // Refresh builds list
      await fetchBuilds(className, playstyle);

      return data.builds;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to scrape builds';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    builds,
    loading,
    error,
    fetchBuilds,
    scrapeBuilds,
  };
};