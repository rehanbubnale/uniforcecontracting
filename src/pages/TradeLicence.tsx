import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { X, ZoomIn } from "lucide-react";

const TradeLicence = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchLicence = async () => {
      const { data } = await supabase
        .from("trade_licence")
        .select("image_url")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (data?.image_url) setImageUrl(data.image_url);
      setLoading(false);
    };
    fetchLicence();
  }, []);

  return (
    <div>
      <PageHeader title="Trade Licence" subtitle="Our official company trade licence issued by the UAE authorities." />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8">
              Company Trade Licence
            </h2>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : imageUrl ? (
              <div
                className="relative group cursor-pointer rounded-xl overflow-hidden border border-border shadow-lg mx-auto max-w-2xl"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={imageUrl}
                  alt="Uniforce Contracting Trade Licence"
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">No trade licence image available.</p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && imageUrl && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <img
            src={imageUrl}
            alt="Uniforce Contracting Trade Licence"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default TradeLicence;
