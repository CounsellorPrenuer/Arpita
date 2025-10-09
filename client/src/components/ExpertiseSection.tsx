import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Briefcase, Users, TrendingUp, Heart, Compass, Sparkles, GraduationCap, Presentation, School, Building2 } from "lucide-react";

export default function ExpertiseSection() {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById("coaching");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const coachingServices = [
    {
      icon: Briefcase,
      title: "Executive Coaching",
      description: "Transform your leadership capabilities with personalized coaching designed for C-suite executives and senior leaders.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Leadership Coaching",
      description: "Build the skills and mindset needed to lead teams effectively and drive organizational success.",
      color: "green" as const,
    },
    {
      icon: TrendingUp,
      title: "Organizational Development",
      description: "Enhance your organization's effectiveness through strategic L&OD initiatives and cultural transformation.",
      color: "blue" as const,
    },
    {
      icon: Heart,
      title: "Life Coaching",
      description: "Achieve work-life balance and personal fulfillment with holistic life coaching tailored to your goals.",
      color: "green" as const,
    },
    {
      icon: Compass,
      title: "Career Coaching",
      description: "Navigate your career path with confidence through strategic guidance and professional development.",
      color: "blue" as const,
    },
    {
      icon: Sparkles,
      title: "Wellness Coaching",
      description: "Cultivate mental, emotional, and physical well-being for sustainable high performance.",
      color: "green" as const,
    },
  ];

  const corporatePrograms = [
    {
      icon: GraduationCap,
      title: "Career Guidance",
      description: "Comprehensive career counseling for students and professionals seeking their next breakthrough.",
      color: "yellow" as const,
    },
    {
      icon: Presentation,
      title: "Workshops & Seminars",
      description: "Engaging workshops on leadership, soft skills, and professional excellence for teams and organizations.",
      color: "yellow" as const,
    },
    {
      icon: School,
      title: "Admission Guidance",
      description: "Expert guidance for students navigating college admissions and educational pathways.",
      color: "yellow" as const,
    },
    {
      icon: Building2,
      title: "Custom Programs for Organisations",
      description: "Tailored training and development programs designed to meet your organization's unique needs.",
      color: "yellow" as const,
    },
  ];

  return (
    <section id="coaching" className="py-20 md:py-32 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-expertise-title">
            <span className="bg-gradient-to-r from-primary via-brand-green to-primary bg-clip-text text-transparent">
              My Areas of Expertise
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive coaching and training solutions tailored to your growth journey
          </p>
        </div>

        <div className="mb-20">
          <h3 className={`font-heading font-semibold text-2xl md:text-3xl text-foreground mb-10 text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} data-testid="text-coaching-services">
            Coaching Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coachingServices.map((service, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>

        <div id="programs">
          <h3 className={`font-heading font-semibold text-2xl md:text-3xl text-foreground mb-10 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} data-testid="text-corporate-programs">
            Corporate & Academic Programs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {corporatePrograms.map((program, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${900 + index * 100}ms` }}
              >
                <ServiceCard {...program} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
