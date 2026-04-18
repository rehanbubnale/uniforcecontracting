import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (form.name.trim().length > 100) {
      toast({ title: "Name must be 100 characters or less.", variant: "destructive" });
      return;
    }
    if (form.message.trim().length > 2000) {
      toast({ title: "Message must be 2000 characters or less.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      // Send email via EmailJS
      await emailjs.send(
        "service_8u00gpt",
        "template_tlovfyv",
        {
          name: form.name.trim(),
          reply_to: form.email.trim(),
          message: form.message.trim(),
          time: new Date().toLocaleString(),
        },
        "ys_DITHK9bkcK9HEX"
      );

      // Save to database via edge function with server-side validation
      const { data: fnData, error: fnError } = await supabase.functions.invoke("submit-contact", {
        body: { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), message: form.message.trim() },
      });

      if (fnError) throw fnError;
      if (fnData?.error) throw new Error(fnData.error);

      toast({ title: "Your message has been sent successfully" });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Contact Us" subtitle="Get in touch with our team for a free consultation." />

      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Your Name *" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <Input type="email" placeholder="Email Address *" maxLength={254} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input type="tel" placeholder="Phone Number" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <Textarea placeholder="Your Message *" maxLength={2000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <a href="mailto:uniforcecontracting@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">uniforcecontracting@gmail.com<br />info@uniforcedxb.com</p>
                    </div>
                  </a>
                  <a href="tel:+97143706944" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+971 4 3706944</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Printer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fax</p>
                      <p className="font-medium text-foreground">+971 4 3706955</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/KL6fXf48rXwUZCKv7?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">Uniforce Contracting LLC<br />Zabeel House-1, Mezzanine Floor, Office No.05<br />Opposite to Woodland Restaurant, Karama</p>
                      <p className="text-xs text-primary mt-1 group-hover:underline">View Location on Google Maps →</p>
                    </div>
                  </a>
                </div>

                <div className="mt-8 rounded-lg overflow-hidden border border-border">
                  <iframe
                    title="Uniforce Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.375236000003!2d55.30256937516499!3d25.23885437768422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d0f17ec63f%3A0xad7dc6fb709fa63a!2sUniforce%20Contracting%20LLC!5e1!3m2!1sen!2sin!4v1775708545372!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
