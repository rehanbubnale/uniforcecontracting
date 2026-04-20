import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImg from "@/assets/hero-construction.jpg";
import { Building2, HardHat, TrendingUp, Shield, Star, ArrowRight } from "lucide-react";

const stats = [
  { end: 14, suffix: "+", label: "Years of Experience" },
  { end: 50, suffix: "+", label: "Projects Completed" },
  { end: 165, suffix: "+", label: "Skilled Workers" },
  { end: 15, suffix: "+", label: "Machines" },
];

const services = [
  { icon: Building2, title: "Residential Construction", desc: "Premium residential buildings designed for modern living." },
  { icon: HardHat, title: "Commercial Construction", desc: "State-of-the-art commercial spaces that drive business growth." },
  { icon: Shield, title: "Project Management", desc: "Expert oversight from planning to completion." },
];

const testimonials = [
  { name: "Ahmed Al Maktoum", role: "Property Developer", text: "Uniforce delivered our luxury villa project on time and beyond expectations. Their attention to detail is remarkable." },
  { name: "Sarah Johnson", role: "Commercial Client", text: "Professional, reliable, and highly skilled. Our office complex was completed with outstanding quality." },
 
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Construction site in Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-primary text-sm font-medium">UNIFORCE CONTRACTING L.L.C.</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-background leading-tight">
                Building the Future with Strength and Precision
              </h1>
              <p className="mt-6 text-lg md:text-xl text-background/70 max-w-xl">
                Trusted Civil Engineering and Construction Solutions in Dubai
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/projects">
                  <Button size="lg" className="gap-2">View Projects <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="ghost" className="text-background hover:bg-background/10 border-none">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium text-sm tracking-widest uppercase">Who We Are</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">
                  A Legacy of Excellence in Construction
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  UNIFORCE CONTRACTING L.L.C. is a premier civil engineering and construction company based in Dubai, UAE. With over 14 years of experience, we deliver world-class construction solutions across residential, and commercial sectors.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our commitment to quality, safety, and innovation has made us a trusted partner for some of the most prestigious projects in the region.
                </p>
                <Link to="/about">
                  <Button variant="outline" className="mt-6 gap-2">Learn More <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-section-bg rounded-lg p-6 text-center">
                    <AnimatedCounter {...s} />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding section-bg">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium text-sm tracking-widest uppercase">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">What We Do Best</h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="bg-background rounded-lg p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 group h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services"><Button variant="outline" className="gap-2">All Services <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding section-bg">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium text-sm tracking-widest uppercase">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">What Our Clients Say</h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="bg-background rounded-lg p-6 border border-border h-full">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-background">Ready to Start Your Project?</h2>
            <p className="mt-4 text-background/60 max-w-xl mx-auto">
              Get in touch with our team for a free consultation and quote on your next construction project.
            </p>
            <Link to="/contact">
              <Button size="lg" className="mt-8 gap-2">Get a Quote <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
