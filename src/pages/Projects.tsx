import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import { Building2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Projects",
  building: "Residential Buildings",
  villa: "Residential Villas",
  factory: "Factories & Warehouses",
};

const CATEGORY_ORDER = ["all", "building", "villa", "factory"] as const;

const Projects = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "id, title, goal_image_url, planned_img_url_2, planned_img_url_3, planned_img_url_4, actual_image_url, actual_img_url_2, actual_img_url_3, actual_img_url_4, actual_img_url_5, category, status, sr_no"
        )
        .order("sr_no", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const availableCategories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean) as string[]);
    return CATEGORY_ORDER.filter((c) => c === "all" || set.has(c));
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

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

      <section className="section-padding bg-secondary/30">
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
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Projects will appear here once added.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <>
              {/* Category filter */}
              {availableCategories.length > 1 && (
                <AnimatedSection>
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-10 justify-center md:justify-start">
                    {availableCategories.map((cat) => {
                      const isActive = activeCategory === cat;
                      const count =
                        cat === "all"
                          ? projects.length
                          : projects.filter((p) => p.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                            isActive
                              ? "bg-primary text-primary-foreground border-primary shadow-md"
                              : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
                          }`}
                        >
                          {CATEGORY_LABELS[cat] || cat}
                          <span className={`ml-2 text-xs ${isActive ? "opacity-90" : "opacity-60"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </AnimatedSection>
              )}

              {/* Section heading */}
              <AnimatedSection>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                      <span className="w-1.5 h-8 bg-primary rounded-full" />
                      {CATEGORY_LABELS[activeCategory] || "Projects"}
                    </h2>
                    <p className="mt-2 text-muted-foreground text-sm md:text-base">
                      {filtered.length} {filtered.length === 1 ? "project" : "projects"} showcased
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  No projects in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {filtered.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
