import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-contact-title">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to take the next step in your journey? Reach out today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <Card className="p-6 md:p-8" data-testid="card-contact-form">
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                variant="destructive"
                size="lg"
                className="w-full hover-elevate active-elevate-2"
                disabled={isSubmitting}
                data-testid="button-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 md:p-8" data-testid="card-contact-info">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-all"
                    data-testid={`link-contact-${index}`}
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8" data-testid="card-social">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                Connect on Social Media
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-4 rounded-lg hover-elevate active-elevate-2 transition-all bg-card border"
                    aria-label={social.label}
                    data-testid={`link-social-${index}`}
                  >
                    <social.icon className="h-6 w-6 text-primary" />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 to-brand-green/10" data-testid="card-skillzy">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                Visit Skillzy
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore our complete range of programs and services
              </p>
              <Button
                variant="outline"
                asChild
                className="hover-elevate active-elevate-2"
                data-testid="button-visit-website"
              >
                <a href="https://skillzy.in" target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
