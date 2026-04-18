import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSiteLogo } from "@/hooks/use-site-logo";

const Footer = () => {
  const { data: logoUrl } = useSiteLogo();

  return (
    <footer className="bg-foreground text-background">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Uniforce Contracting"
                  className="h-12 w-auto object-contain"
                />
              ) : null}
              <span className="font-heading font-bold text-lg">UNIFORCE CONTRACTING L.L.C.</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Trusted civil engineering and construction solutions delivering excellence across the UAE since inception.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              {["About", "Team", "Projects", "Trade Licence", "Services", "Contact"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:opacity-100 transition-opacity">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>Residential Construction</span>
              <span>Commercial Construction</span>
              <span>Structural Engineering</span>
              <span>Project Management</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <a href="mailto:uniforcecontracting@gmail.com" className="flex items-center gap-2 hover:opacity-100">
                <Mail className="w-4 h-4 text-primary" /> uniforcecontracting@gmail.com
              </a>
              <a href="tel:+97143706944" className="flex items-center gap-2 hover:opacity-100">
                <Phone className="w-4 h-4 text-primary" /> +971 4 3706944
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Zabeel House-1, Mezzanine Floor,<br />Office No.05, Karama, Dubai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 text-center text-sm opacity-50">
          © 2026 UNIFORCE CONTRACTING L.L.C. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
