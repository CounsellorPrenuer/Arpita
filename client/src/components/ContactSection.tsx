import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram, Send, MapPin } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual form submission to backend
    setTimeout(() => {
      toast({
        title: "Thank you for reaching out!",
        description: "I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@skillzy.in", href: "mailto:info@skillzy.in" },
    { icon: Phone, label: "Phone", value: "+91 63620 74132", href: "tel:+916362074132" },
    { icon: MapPin, label: "Location", value: "India", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-contact-title">
            <span className="bg-gradient-to-r from-primary via-brand-green to-brand-yellow bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to take the next step in your journey? Reach out today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <Card className={`p-8 md:p-10 bg-gradient-to-br from-card to-primary/5 hover:shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} data-testid="card-contact-form">
            <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8 flex items-center gap-3">
              <Send className="h-7 w-7 text-primary" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary"
                  data-testid="input-name"
                />
              </div>
              <div className="group">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary"
                  data-testid="input-email"
                />
              </div>
              <div className="group">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary"
                  data-testid="input-phone"
                />
              </div>
              <div className="group">
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="text-base transition-all duration-300 focus:ring-2 focus:ring-primary resize-none"
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                variant="destructive"
                size="lg"
                className="w-full text-base font-semibold shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 hover:scale-105 transition-all duration-300"
                disabled={isSubmitting}
                data-testid="button-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </Button>
            </form>
          </Card>

          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="p-8 bg-gradient-to-br from-card to-brand-green/5 hover:shadow-2xl transition-all duration-500" data-testid="card-contact-info">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className={`flex items-center gap-4 p-5 rounded-xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                    data-testid={`link-contact-${index}`}
                  >
                    <div className="p-4 rounded-xl bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{info.label}</p>
                      <p className="font-semibold text-foreground text-lg">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-card to-brand-yellow/5 hover:shadow-2xl transition-all duration-500" data-testid="card-social">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                Connect on Social Media
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-5 rounded-xl hover:scale-110 transition-all duration-300 bg-gradient-to-br from-primary/10 to-brand-green/10 hover:from-primary/20 hover:to-brand-green/20 hover:shadow-lg group"
                    aria-label={social.label}
                    data-testid={`link-social-${index}`}
                  >
                    <social.icon className="h-7 w-7 text-primary group-hover:text-brand-green transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary via-brand-green to-brand-yellow text-white hover:shadow-2xl transition-all duration-500 hover:scale-105" data-testid="card-skillzy">
              <h3 className="font-heading font-semibold text-2xl mb-3">
                Visit Skillzy
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Explore our complete range of programs and services
              </p>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="w-full font-semibold hover:scale-105 transition-all duration-300"
                data-testid="button-visit-website"
              >
                <a href="https://skillzy.in" target="_blank" rel="noopener noreferrer">
                  Visit Website →
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
}
