import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Building, Landmark, ClipboardList, Wrench, PaintBucket, ArrowRight } from "lucide-react";

import imgResidential from "@/assets/service-residential.jpg";
import imgCommercial from "@/assets/service-commercial.jpg";
import imgMgmt from "@/assets/service-management.jpg";
import imgStructural from "@/assets/service-structural.jpg";
import imgReno from "@/assets/service-renovation.jpg";

const services = [
  { icon: Building2, title: "Residential Building Construction", img: imgResidential, desc: "We build office , retail centers, and commercial facilities that meet the highest standards of quality and functionality." },
  { icon: Building, title: "Residential Villa Construction", img: imgCommercial, desc: "Luxury villas, we create living spaces that combine comfort, aesthetics, and structural integrity." },
  { icon: ClipboardList, title: "Project Management", img: imgMgmt, desc: "Expert project management services ensuring on-time, on-budget delivery with transparent communication." },
  { icon: Wrench, title: "Structural Engineering", img: imgStructural, desc: "Advanced structural analysis and engineering solutions for complex construction challenges." },
  { icon: PaintBucket, title: "Renovation & Remodeling", img: imgReno, desc: "Transforming existing spaces with modern designs, upgraded systems, and premium finishes." },
];

const Services = () => (
  <div>
    <PageHeader title="Our Services" subtitle="Comprehensive construction solutions for every project scale." />

    <section className="section-padding">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.08}>
              <div className="group rounded-lg overflow-hidden border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-bg">
      <div className="container text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-bold text-foreground">Have a Project in Mind?</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Let's discuss how we can bring your vision to life with our expertise.
          </p>
          <Link to="/contact">
            <Button size="lg" className="mt-6 gap-2">Get a Quote <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Services;
