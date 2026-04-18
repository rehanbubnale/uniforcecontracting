import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Loader2, Wrench, Package } from "lucide-react";
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

const Machinery = () => {
  const { data: machines = [], isLoading } = useQuery({
    queryKey: ["machines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("machines")
        .select("id, name, quantity, image_url, description");
      if (error) throw error;
      return data;
    },
  });

  const { data: equipments = [], isLoading: isLoadingEquipments } = useQuery({
    queryKey: ["equipments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("equipments")
        .select("id, sr_no, description, quantity")
        .order("sr_no", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <PageHeader
        title="Machinery & Equipment"
        subtitle="Our fleet of modern construction equipment powers every project."
      />

      <section className="section-padding">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : machines.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">No Machines Yet</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Machines will appear here once added to the database.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {machines.map((m, i) => (
                <AnimatedSection key={m.id} delay={i * 0.08}>
                  <div className="rounded-lg overflow-hidden border border-border group hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                    {m.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={m.image_url}
                          alt={m.name ?? ""}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
                        {m.quantity != null && (
                          <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                            {m.quantity} Units
                          </span>
                        )}
                      </div>
                      {m.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Equipment Section */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground">Our Equipment</h2>
              <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
                A comprehensive list of equipment available for our projects.
              </p>
            </div>
          </AnimatedSection>

          {isLoadingEquipments ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : equipments.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">No Equipment Available</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Equipment will appear here once added to the database.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="rounded-xl border border-border shadow-md overflow-hidden bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableHead className="font-heading font-semibold text-foreground w-24">Sr. No</TableHead>
                      <TableHead className="font-heading font-semibold text-foreground">Description</TableHead>
                      <TableHead className="font-heading font-semibold text-foreground text-right w-48">No. of Equipments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipments.map((eq, i) => (
                      <TableRow
                        key={eq.id}
                        className={`transition-colors ${i % 2 === 0 ? "bg-background" : "bg-muted/40"} hover:bg-primary/5`}
                      >
                        <TableCell className="font-medium text-foreground">{eq.sr_no}</TableCell>
                        <TableCell className="text-foreground">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-primary shrink-0" />
                            {eq.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">{eq.quantity}</TableCell>
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

export default Machinery;
