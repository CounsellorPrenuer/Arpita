import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram, Heart, Sparkles } from "lucide-react";
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
    <footer className="bg-slate-950 border-t border-blue-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-200px,#3b82f630,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full group-hover:bg-blue-500/50 transition-all duration-300" />
                <img src={logoImage} alt="Skillzy Logo" className="h-14 relative z-10 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500" />
              </div>
              <span className="font-heading font-black text-3xl bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent">Skillzy</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium text-lg">
              Empowering growth and inspiring achievement through world-class coaching and training.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:info@skillzy.in"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group"
                data-testid="link-footer-email"
              >
                <Mail className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-semibold">info@skillzy.in</span>
              </a>
              <a
                href="tel:+916362074132"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group"
                data-testid="link-footer-phone"
              >
                <Phone className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-semibold">+91 63620 74132</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-semibold"
                    data-testid={`link-footer-${link.id}`}
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-6">Skillzy Resources</h3>
            <ul className="space-y-3">
              {skillzyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-semibold"
                    data-testid={`link-skillzy-${index}`}
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-6">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-4 rounded-2xl hover:scale-125 transition-all duration-300 bg-gradient-to-br from-blue-500/20 to-violet-500/20 hover:from-blue-500/30 hover:to-violet-500/30 border border-blue-500/20 hover:border-blue-500/50"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${index}`}
                >
                  <social.icon className="h-6 w-6 text-blue-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-slate-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400">
          <p className="flex items-center gap-3 font-semibold text-lg" data-testid="text-copyright">
            © {new Date().getFullYear()} CHERRYSKILLZ Learning Pvt. Ltd. 
            <span className="hidden sm:flex items-center gap-2">
              Made with <Heart className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" /> in India
            </span>
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-all duration-300 font-semibold hover:scale-110" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-all duration-300 font-semibold hover:scale-110" data-testid="link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
