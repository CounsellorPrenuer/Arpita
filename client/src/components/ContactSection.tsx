import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram, Send, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

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

    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Thank you for reaching out!",
        description: "I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@skillzy.in", href: "mailto:info@skillzy.in", gradient: "from-blue-500 to-cyan-500" },
    { icon: Phone, label: "Phone", value: "+91 63620 74132", href: "tel:+916362074132", gradient: "from-emerald-500 to-teal-500" },
    { icon: MapPin, label: "Location", value: "India", href: "#", gradient: "from-violet-500 to-purple-500" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100px,#3b82f640,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Send className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">Get In Touch</span>
          </div>
          
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white" data-testid="text-contact-title">
            Let's <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Ready to take the next step in your journey? Reach out today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className={`p-10 bg-gradient-to-br from-blue-600 to-violet-600 border-0 shadow-2xl hover:shadow-blue-500/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} data-testid="card-contact-form">
            <h3 className="font-heading font-black text-3xl text-white mb-8 flex items-center gap-3">
              <Send className="h-8 w-8" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                data-testid="input-name"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                data-testid="input-email"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                data-testid="input-phone"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300 resize-none"
                data-testid="input-message"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg font-black py-7 bg-white text-blue-600 hover:bg-white/90 border-0 shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
                disabled={isSubmitting}
                data-testid="button-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>

          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className={`flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r ${info.gradient} border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                data-testid={`link-contact-${index}`}
              >
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <info.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/80 font-bold uppercase tracking-wide">{info.label}</p>
                  <p className="font-black text-white text-xl">{info.value}</p>
                </div>
              </a>
            ))}

            <Card className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-500" data-testid="card-social">
              <h3 className="font-heading font-bold text-2xl text-white mb-6">
                Connect on Social Media
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-5 rounded-2xl hover:scale-125 transition-all duration-300 bg-gradient-to-br from-blue-500/20 to-violet-500/20 hover:from-blue-500/30 hover:to-violet-500/30 border border-blue-500/20 hover:border-blue-500/50"
                    aria-label={social.label}
                    data-testid={`link-social-${index}`}
                  >
                    <social.icon className="h-7 w-7 text-blue-400" />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emerald-600 to-teal-600 border-0 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-500" data-testid="card-skillzy">
              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-black text-2xl text-white mb-3">
                    Visit Skillzy
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed font-medium text-lg">
                    Explore our complete range of programs and services
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="w-full font-black bg-white text-emerald-600 hover:bg-white/90 border-0 shadow-2xl hover:shadow-white/50"
                    data-testid="button-visit-website"
                  >
                    <a href="https://skillzy.in" target="_blank" rel="noopener noreferrer">
                      Visit Website →
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
