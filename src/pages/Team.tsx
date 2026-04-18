import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Users, Crown, Loader2, Briefcase, Award, BookOpen, ChevronDown, ImageOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface EmpListItem {
  id: number;
  name: string | null;
  designation: string | null;
}

interface EmployeePublic {
  employee_code: string;
  name: string | null;
  role: string | null;
  photo_url: string | null;
  is_director: boolean | null;
}

interface EmployeeFull {
  employee_code: string;
  name: string | null;
  role: string | null;
  photo_url: string | null;
  is_director: boolean | null;
  experience: number | null;
  specialization: string | null;
  full_bio: string | null;
  job_title: string | null;
  projects: string | null;
}

const Team = () => {
  const [selectedDirectorCode, setSelectedDirectorCode] = useState<string | null>(null);
  const [showFullTeam, setShowFullTeam] = useState(false);

  const { data: employees = [], isLoading } = useQuery<EmployeePublic[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees_public" as any)
        .select("employee_code, name, role, photo_url, is_director, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as unknown as EmployeePublic[];
    },
  });

  const { data: directorDetail, isLoading: isDetailLoading, error: detailError } = useQuery<EmployeeFull | null>({
    queryKey: ["director-detail", selectedDirectorCode],
    enabled: !!selectedDirectorCode,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees_detail" as any)
        .select("employee_code, name, role, photo_url, is_director, experience, specialization, full_bio, job_title, projects")
        .eq("employee_code", selectedDirectorCode!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as EmployeeFull | null;
    },
  });

  const { data: empList = [], isLoading: isEmpListLoading } = useQuery<EmpListItem[]>({
    queryKey: ["emp-list"],
    enabled: showFullTeam,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emp_list" as any)
        .select("id, name, designation")
        .order("id", { ascending: true });
      if (error) throw error;
      return data as unknown as EmpListItem[];
    },
  });

  const directors = employees.filter((e) => e.role === "Director");
  const team = employees.filter((e) => e.role !== "Director");
  const hasData = employees.length > 0;

  return (
    <div>
      <PageHeader title="Our Team" subtitle="Meet the skilled professionals behind our success." />

      {/* Leadership Team Section */}
      <section className="section-padding bg-section-bg">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary uppercase tracking-widest mb-3">
                <Crown className="w-4 h-4" />
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Leadership Team</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Visionary leaders driving excellence in every project we undertake.
              </p>
            </div>
          </AnimatedSection>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !hasData || directors.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">Leadership Coming Soon</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Leadership team will appear here once added to the database.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {directors.map((d, i) => (
                <AnimatedSection key={d.employee_code} delay={i * 0.1}>
                  <div className="group rounded-2xl overflow-hidden border border-primary/20 bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    {d.photo_url && (
                      <div className="aspect-[3/4] overflow-hidden">
                        <img src={d.photo_url} alt={d.name ?? ""} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                    <div className="p-6 text-center border-t-2 border-primary/30">
                      <h3 className="text-xl font-heading font-bold text-foreground">{d.name}</h3>
                      <p className="text-primary font-medium text-sm mt-1">{d.role}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setSelectedDirectorCode(d.employee_code)}
                      >
                        Click here for more info
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Director Detail Modal */}
      <Dialog open={!!selectedDirectorCode} onOpenChange={(open) => { if (!open) setSelectedDirectorCode(null); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-in fade-in-0 zoom-in-95 duration-300">
          {isDetailLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : detailError || !directorDetail ? (
            <div className="text-center py-12">
              <DialogHeader>
                <DialogTitle className="text-destructive">Director Not Found</DialogTitle>
                <DialogDescription>
                  Could not load director details. Please try again later.
                </DialogDescription>
              </DialogHeader>
            </div>
          ) : (() => {
            const specializations = directorDetail.specialization
              ? directorDetail.specialization.split(",").map((s) => s.trim()).filter(Boolean)
              : [];
            const projectsList = directorDetail.projects
              ? directorDetail.projects.split(",").map((s) => s.trim()).filter(Boolean)
              : [];

            return (
              <div className="space-y-6">
                {/* Header: Image + Info side by side */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {directorDetail.photo_url && (
                    <img
                      src={directorDetail.photo_url}
                      alt={directorDetail.name ?? ""}
                      className="w-full sm:w-[200px] h-[250px] sm:h-[200px] rounded-xl object-cover object-top shrink-0"
                    />
                  )}
                  <div className="flex flex-col justify-center">
                    <DialogHeader className="text-left">
                      <DialogTitle className="text-2xl md:text-[28px] font-heading font-bold text-foreground leading-tight">
                        {directorDetail.name}
                      </DialogTitle>
                      <DialogDescription className="text-primary font-semibold text-base mt-1">
                        {directorDetail.job_title || directorDetail.role}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-3">
                      {directorDetail.experience != null && (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Briefcase className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Experience</p>
                            <p className="font-semibold text-foreground">{directorDetail.experience}+ Years Experience</p>
                          </div>
                        </div>
                      )}
                      {specializations.length > 0 && (
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Award className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Specialization</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {specializations.map((s, i) => (
                                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* About Section */}
                {directorDetail.full_bio && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <h4 className="font-heading font-semibold text-foreground">About</h4>
                      </div>
                      <p className="text-muted-foreground whitespace-pre-line" style={{ lineHeight: 1.7 }}>
                        {directorDetail.full_bio}
                      </p>
                    </div>
                  </>
                )}

                {/* Projects Section */}
                {projectsList.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <h4 className="font-heading font-semibold text-foreground">Projects</h4>
                      </div>
                      <ul className="space-y-2 ml-1">
                        {projectsList.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Our Team Section */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary uppercase tracking-widest mb-3">
                <Users className="w-4 h-4" />
                The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Our Team</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Dedicated professionals committed to delivering quality on every project.
              </p>
            </div>
          </AnimatedSection>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : team.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">Team Members Coming Soon</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Team members will appear here once added to the database.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((e, i) => (
                <AnimatedSection key={e.employee_code} delay={i * 0.06}>
                  <div className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
                    {e.photo_url && (
                      <div className="aspect-[3/4] overflow-hidden">
                        <img src={e.photo_url} alt={e.name ?? ""} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-4 text-center">
                      <h3 className="font-heading font-semibold text-foreground">{e.name}</h3>
                      <p className="text-muted-foreground text-sm mt-0.5">{e.role}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* View Full Team Section */}
      <section className="section-padding bg-section-bg">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-8">
              <Button
                size="lg"
                className="px-10 text-base gap-2"
                onClick={() => setShowFullTeam(!showFullTeam)}
              >
                <Users className="w-5 h-5" />
                {showFullTeam ? "Hide Full Team" : "View Full Team"}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFullTeam ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </AnimatedSection>

          {showFullTeam && (
            <div className="animate-in slide-in-from-top-4 fade-in-0 duration-500">
              {isEmpListLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : empList.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No employees found.</p>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/10">
                        <TableHead className="w-20 text-center font-heading font-semibold text-foreground">Sr. No</TableHead>
                        <TableHead className="font-heading font-semibold text-foreground">Name</TableHead>
                        <TableHead className="font-heading font-semibold text-foreground">Job</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {empList.map((emp, i) => (
                        <TableRow key={emp.id}>
                          <TableCell className="text-center font-medium text-muted-foreground">{i + 1}</TableCell>
                          <TableCell className="font-medium text-foreground">{emp.name ?? "—"}</TableCell>
                          <TableCell className="text-muted-foreground">{emp.designation ?? "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;
