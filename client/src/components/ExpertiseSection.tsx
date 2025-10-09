import ServiceCard from "./ServiceCard";
import { Briefcase, Users, TrendingUp, Heart, Compass, Sparkles, GraduationCap, Presentation, School, Building2 } from "lucide-react";

export default function ExpertiseSection() {
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
    <section id="coaching" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-expertise-title">
            My Areas of Expertise
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive coaching and training solutions tailored to your growth journey
          </p>
        </div>

        <div className="mb-16">
          <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8 text-center md:text-left" data-testid="text-coaching-services">
            Coaching Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coachingServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        <div id="programs">
          <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8 text-center md:text-left" data-testid="text-corporate-programs">
            Corporate & Academic Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {corporatePrograms.map((program, index) => (
              <ServiceCard key={index} {...program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
