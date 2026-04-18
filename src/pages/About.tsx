import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import teamImg from "@/assets/about-team.jpg";
import { Shield, Target, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";

const values = [
  { icon: CheckCircle, title: "Quality", desc: "We maintain the highest standards in materials, craftsmanship, and project delivery." },
  { icon: Shield, title: "Safety", desc: "Zero-compromise safety protocols protect our workers, clients, and communities." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace modern construction technologies and methodologies." },
  { icon: Target, title: "Reliability", desc: "We deliver on time, on budget, and beyond expectations — every time." },
];

const About = () => (
  <div>
    <PageHeader title="About Us" subtitle="Building trust through quality, safety, and innovation since day one." />

    <section className="section-padding">
      <div className="container">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm tracking-widest uppercase">Company Overview</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">Who We Are</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                UNIFORCE CONTRACTING L.L.C. is a leading civil engineering and construction company headquartered in Dubai, United Arab Emirates. We specialize in delivering comprehensive construction solutions across residential, commercial, and infrastructure sectors.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our team of experienced engineers, architects, and project managers work together to transform ambitious blueprints into remarkable structures that stand the test of time.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src={teamImg} alt="Uniforce team" className="w-full h-80 object-cover" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding section-bg">
      <div className="container">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-background rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver construction excellence by combining advanced engineering practices with unwavering commitment to quality, safety, and client satisfaction.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted and innovative construction company in the UAE, setting new benchmarks in quality and sustainability for the industry.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium text-sm tracking-widest uppercase">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-foreground">What Drives Us</h2>
          </div>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="text-center p-6 rounded-lg border border-border hover:border-primary/40 transition-colors h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding section-bg">
      <div className="container text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-bold text-foreground">Meet Our Team</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Our experienced professionals are the backbone of every successful project.
          </p>
          <Link to="/team">
            <Button className="mt-6 gap-2">View Team <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default About;
