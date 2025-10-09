import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
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
          ? "bg-slate-950/90 backdrop-blur-2xl border-b border-blue-500/20 shadow-2xl shadow-blue-500/10"
          : "bg-slate-950/70 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="link-logo">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full group-hover:bg-blue-500/50 transition-all duration-300" />
              <img src={logoImage} alt="Skillzy Logo" className="h-12 relative z-10 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500" />
            </div>
            <span className="font-heading font-black text-2xl bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent">
              Skillzy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-300 hover:text-white transition-all duration-300 font-bold relative group text-base"
                data-testid={`link-${link.id}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              data-testid="button-consultation"
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold border-0 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-110 transition-all duration-300"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </div>

          <button
            className="md:hidden p-3 hover:bg-blue-500/10 rounded-xl transition-all duration-300 border border-blue-500/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-blue-500/20 bg-slate-950/95 backdrop-blur-2xl">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-4 px-6 text-slate-300 hover:text-white hover:bg-blue-500/10 rounded-xl transition-all duration-300 font-bold border border-transparent hover:border-blue-500/20"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold border-0 shadow-2xl shadow-blue-500/50 py-6"
              onClick={() => scrollToSection("contact")}
              data-testid="button-mobile-consultation"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
