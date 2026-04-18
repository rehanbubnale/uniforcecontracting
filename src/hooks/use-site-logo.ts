import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSiteLogo() {
  return useQuery({
    queryKey: ["site-logo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("logo_url")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      const raw = data?.logo_url ?? null;
      // Clean any leading semicolons or whitespace from the URL
      return raw ? raw.replace(/^[;\s]+/, '') : null;
    },
    staleTime: 1000 * 60 * 30, // cache 30 min
  });
}
