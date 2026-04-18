import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const ProjectsList = () => {
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["project_details"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_details")
        .select("*")
        .order("sr_no", { ascending: true });
      if (error) {
        console.error("Error fetching project_details:", error);
        throw error;
      }
      console.log("Fetched project_details:", data);
      return data;
    },
  });

  return (
    <div>
      <PageHeader
        title="All Projects"
        subtitle="Complete list of our construction projects with details."
      />

      <section className="section-padding">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-center text-destructive py-10">
              Failed to load projects. Please try again later.
            </p>
          ) : projects.length === 0 ? (
            <AnimatedSection>
              <p className="text-center text-muted-foreground py-20">
                No project details available yet.
              </p>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableHead className="font-bold text-foreground">Sr. No</TableHead>
                      <TableHead className="font-bold text-foreground">Project Name</TableHead>
                      <TableHead className="font-bold text-foreground">Client Name</TableHead>
                      <TableHead className="font-bold text-foreground">Consultant</TableHead>
                      <TableHead className="font-bold text-foreground text-right">Value (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((p, i) => (
                      <TableRow
                        key={p.id}
                        className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}
                      >
                        <TableCell>{p.sr_no ?? i + 1}</TableCell>
                        <TableCell className="font-medium">{p.project_name ?? "—"}</TableCell>
                        <TableCell>{p.client_name ?? "—"}</TableCell>
                        <TableCell>{p.consultant ?? "—"}</TableCell>
                        <TableCell className="text-right">{p.value_aed ?? "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsList;
