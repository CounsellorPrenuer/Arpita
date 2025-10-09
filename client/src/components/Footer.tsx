import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram, Heart } from "lucide-react";
import logoImage from "@assets/logo_1760012244683.png";

export default function Footer() {
  const quickLinks = [
    { name: "About", id: "about" },
    { name: "Coaching Services", id: "coaching" },
    { name: "Programs", id: "programs" },
    { name: "Awards", id: "awards" },
    { name: "Contact", id: "contact" },
  ];

  const skillzyLinks = [
    { name: "Skillzy Home", href: "https://skillzy.in" },
    { name: "Career Guidance", href: "https://skillzy.in/career" },
    { name: "Admission Guidance", href: "https://skillzy.in/admission" },
    { name: "Corporate Training", href: "https://skillzy.in/corporate" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-card to-card/80 border-t relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-300" />
                <img src={logoImage} alt="Skillzy Logo" className="h-12 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Skillzy</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering growth and inspiring achievement through world-class coaching and training.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@skillzy.in"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                info@skillzy.in
              </a>
              <a
                href="tel:+916362074132"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                +91 63620 74132
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    data-testid={`link-footer-${link.id}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Skillzy Resources</h3>
            <ul className="space-y-3">
              {skillzyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    data-testid={`link-skillzy-${index}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Connect With Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 rounded-xl hover:scale-110 transition-all duration-300 bg-primary/5 hover:bg-primary/10 border border-transparent hover:border-primary/20 group"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${index}`}
                >
                  <social.icon className="h-5 w-5 text-primary group-hover:text-brand-green transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p className="flex items-center gap-2" data-testid="text-copyright">
            © {new Date().getFullYear()} CHERRYSKILLZ Learning Pvt. Ltd. 
            <span className="hidden sm:inline">Made with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
            <span className="hidden sm:inline">in India</span>
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-all duration-300 hover:translate-y-[-2px]" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-all duration-300 hover:translate-y-[-2px]" data-testid="link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
