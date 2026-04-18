import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteLogo } from "@/hooks/use-site-logo";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Team", path: "/team" },
  { label: "Projects", path: "/projects" },
  { label: "Trade Licence", path: "/trade-licence" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data: logoUrl } = useSiteLogo();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Uniforce Contracting"
              className="h-10 md:h-14 w-auto object-contain"
            />
          ) : null}
          <div className="leading-tight">
            <span className="font-heading font-bold text-foreground text-sm md:text-base tracking-tight">UNIFORCE</span>
            <span className="hidden md:block text-[10px] text-muted-foreground tracking-widest uppercase">Contracting L.L.C.</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button size="sm" className="ml-2">Get a Quote</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-border/50 ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)}>
            <Button className="w-full mt-3" size="sm">Get a Quote</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
