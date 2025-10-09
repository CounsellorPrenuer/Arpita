import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/logo_1760012244683.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Coaching", id: "coaching" },
    { name: "Programs", id: "programs" },
    { name: "Awards", id: "awards" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b shadow-lg"
          : "bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="link-logo">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-300" />
              <img src={logoImage} alt="Skillzy Logo" className="h-10 md:h-12 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-heading font-bold text-xl md:text-2xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Skillzy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group"
                data-testid={`link-${link.id}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Button
              variant="destructive"
              onClick={() => scrollToSection("contact")}
              data-testid="button-consultation"
              className="shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 hover:scale-105 transition-all duration-300"
            >
              Book a Consultation
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 font-medium"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button
              variant="destructive"
              className="w-full shadow-lg shadow-destructive/30"
              onClick={() => scrollToSection("contact")}
              data-testid="button-mobile-consultation"
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
