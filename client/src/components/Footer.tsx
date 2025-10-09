import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
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
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="Skillzy Logo" className="h-10" />
              <span className="font-heading font-bold text-xl">Skillzy</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering growth and inspiring achievement through world-class coaching and training.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:info@skillzy.in"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                info@skillzy.in
              </a>
              <a
                href="tel:+916362074132"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                +91 63620 74132
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-${link.id}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Skillzy Resources</h3>
            <ul className="space-y-2">
              {skillzyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-skillzy-${index}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg hover-elevate active-elevate-2 transition-all bg-background border"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${index}`}
                >
                  <social.icon className="h-5 w-5 text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © {new Date().getFullYear()} CHERRYSKILLZ Learning Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
