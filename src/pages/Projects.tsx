import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Building2, Loader2, ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useRef } from "react";

// --- Types ---
type Project = {
  id: number;
  title: string | null;
  goal_image_url: string | null;
  planned_img_url_2: string | null;
  planned_img_url_3: string | null;
  planned_img_url_4: string | null;
  actual_image_url: string | null;
  actual_img_url_2: string | null;
  actual_img_url_3: string | null;
  actual_img_url_4: string | null;
  actual_img_url_5: string | null;
  category: string | null;
  status: string | null;
  sr_no: number;
};

// --- Constants ---
const CATEGORY_ORDER = ["building", "villa", "factory"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  building: "Residential Buildings",
  villa: "Residential Villas",
  factory: "Factories & Warehouses",
};

// --- Helpers ---
function isValidUrl(url: string | null | undefined): url is string {
  if (!url || !url.trim()) return false;
  try {
    new URL(url.trim());
    return true;
  } catch {
    return false;
  }
}

function collectUrls(fields: (string | null | undefined)[]): string[] {
  const urls: string[] = [];
  fields.forEach((field) => {
    if (!field) return;
    field.split(",").forEach((u) => {
      const trimmed = u.trim();
      if (isValidUrl(trimmed)) urls.push(trimmed);
    });
  });
  return urls;
}

// --- Components ---
const FallbackImage = () => (
  <div className="w-full h-full flex items-center justify-center bg-muted">
    <ImageOff className="w-10 h-10 text-muted-foreground" />
  </div>
);

const SafeImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  if (error) return <FallbackImage />;
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} loading="lazy" />;
};

// --- Fullscreen Lightbox ---
const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
    <button className="absolute top-4 right-4 text-white text-3xl font-bold z-50" onClick={onClose}>&times;</button>
    <img src={src} alt={alt} className="max-w-full max-h-full object-contain rounded-lg" />
  </div>
);

// --- Image Slider with auto-play, dots, and fullscreen ---
const ImageSlider = ({ images, label, projectTitle }: { images: string[]; label: string; projectTitle: string }) => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const dragRef = useRef<{ startX: number; isDragging: boolean }>({ startX: 0, isDragging: false });

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  const handleDragStart = (clientX: number) => {
    dragRef.current = { startX: clientX, isDragging: false };
  };
  const handleDragEnd = (clientX: number) => {
    const diff = dragRef.current.startX - clientX;
    if (Math.abs(diff) > 40) {
      dragRef.current.isDragging = true;
      if (diff > 0) next(); else prev();
    }
  };
  const handleClick = () => {
    if (!dragRef.current.isDragging) setLightbox(true);
    dragRef.current.isDragging = false;
  };

  if (images.length === 0) return <FallbackImage />;

  return (
    <>
      {lightbox && <Lightbox src={images[current]} alt={`${projectTitle} - ${label}`} onClose={() => setLightbox(false)} />}
      <div
        className="relative aspect-[16/10] overflow-hidden group cursor-grab active:cursor-grabbing"
        onClick={handleClick}
        onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <SafeImage
          src={images[current]}
          alt={`${projectTitle} - ${label} ${current + 1}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1.5 rounded-md bg-background/80 text-foreground backdrop-blur-sm">
          {label} {images.length > 1 ? `${current + 1}/${images.length}` : ""}
        </span>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-5 bg-primary" : "w-2 bg-foreground/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const plannedImages = collectUrls([
    project.goal_image_url,
    project.planned_img_url_2,
    project.planned_img_url_3,
    project.planned_img_url_4,
  ]);

  const actualImages = collectUrls([
    project.actual_image_url,
    project.actual_img_url_2,
    project.actual_img_url_3,
    project.actual_img_url_4,
    project.actual_img_url_5,
  ]);

  return (
    <div className="rounded-xl overflow-hidden border border-border hover:shadow-2xl hover:border-primary/40 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {plannedImages.length > 0 && (
          <ImageSlider images={plannedImages} label="Planned" projectTitle={project.title ?? ""} />
        )}
        {actualImages.length > 0 && (
          <ImageSlider images={actualImages} label="Actual" projectTitle={project.title ?? ""} />
        )}
        {plannedImages.length === 0 && actualImages.length === 0 && (
          <div className="aspect-[16/10] col-span-full"><FallbackImage /></div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">{project.title}</h3>
        {project.status && (
          <span
            className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${
              project.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {project.status === "completed" ? "Completed" : "Under Construction"}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Main Page ---
const Projects = () => {
  const navigate = useNavigate();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, goal_image_url, planned_img_url_2, planned_img_url_3, planned_img_url_4, actual_image_url, actual_img_url_2, actual_img_url_3, actual_img_url_4, actual_img_url_5, category, status, sr_no")
        .order("sr_no", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] || cat,
    items: projects.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <PageHeader
        title="Our Projects"
        subtitle="Explore our portfolio of construction projects across Dubai and the UAE."
        action={
          <Button
            size="lg"
            className="px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("/projects-list")}
          >
            View All Projects
          </Button>
        }
      />
      <section className="section-padding">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">No Projects Yet</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">Projects will appear here once added.</p>
              </div>
            </AnimatedSection>
          ) : (
            <>
              {grouped.map((group) => (
                <div key={group.category} className="mb-16">
                  <AnimatedSection>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary rounded-full" />
                      {group.label}
                    </h2>
                  </AnimatedSection>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {group.items.map((p, i) => (
                      <AnimatedSection key={p.id} delay={i * 0.1}>
                        <ProjectCard project={p} />
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
