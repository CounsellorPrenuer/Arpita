import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Heart, Compass, Sparkles, GraduationCap, Presentation, School, Building2, Zap } from "lucide-react";

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
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Leadership Coaching",
      description: "Build the skills and mindset needed to lead teams effectively and drive organizational success.",
      gradient: "from-emerald-600 via-emerald-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      title: "Organizational Development",
      description: "Enhance your organization's effectiveness through strategic L&OD initiatives and cultural transformation.",
      gradient: "from-violet-600 via-violet-500 to-purple-500",
    },
    {
      icon: Heart,
      title: "Life Coaching",
      description: "Achieve work-life balance and personal fulfillment with holistic life coaching tailored to your goals.",
      gradient: "from-rose-600 via-rose-500 to-pink-500",
    },
    {
      icon: Compass,
      title: "Career Coaching",
      description: "Navigate your career path with confidence through strategic guidance and professional development.",
      gradient: "from-orange-600 via-orange-500 to-amber-500",
    },
    {
      icon: Sparkles,
      title: "Wellness Coaching",
      description: "Cultivate mental, emotional, and physical well-being for sustainable high performance.",
      gradient: "from-indigo-600 via-indigo-500 to-blue-500",
    },
  ];

  const corporatePrograms = [
    {
      icon: GraduationCap,
      title: "Career Guidance",
      description: "Comprehensive career counseling for students and professionals seeking their next breakthrough.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Presentation,
      title: "Workshops & Seminars",
      description: "Engaging workshops on leadership, soft skills, and professional excellence for teams and organizations.",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: School,
      title: "Admission Guidance",
      description: "Expert guidance for students navigating college admissions and educational pathways.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Building2,
      title: "Custom Programs",
      description: "Tailored training and development programs designed to meet your organization's unique needs.",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section id="coaching" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Zap className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">World-Class Expertise</span>
          </div>
          
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white" data-testid="text-expertise-title">
            My Areas of <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Comprehensive coaching and training solutions tailored to your growth journey
          </p>
        </div>

        <div className="mb-24">
          <h3 className={`font-heading font-bold text-3xl md:text-4xl text-white mb-12 text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} data-testid="text-coaching-services">
            Coaching Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachingServices.map((service, index) => (
              <Card
                key={index}
                className={`p-8 group hover:scale-105 transition-all duration-500 bg-gradient-to-br ${service.gradient} border-0 shadow-2xl hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] relative overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                data-testid="card-service"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm w-fit mb-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-4 group-hover:scale-105 transition-transform duration-300" data-testid="text-service-title">
                    {service.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed" data-testid="text-service-description">
                    {service.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div id="programs">
          <h3 className={`font-heading font-bold text-3xl md:text-4xl text-white mb-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} data-testid="text-corporate-programs">
            Corporate & Academic Programs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporatePrograms.map((program, index) => (
              <Card
                key={index}
                className={`p-8 group hover:scale-110 transition-all duration-500 bg-gradient-to-br ${program.gradient} border-0 shadow-2xl hover:shadow-[0_0_80px_rgba(251,191,36,0.6)] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${900 + index * 100}ms` }}
                data-testid="card-service"
              >
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm w-fit mb-5 group-hover:scale-125 transition-all duration-500">
                  <program.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-4" data-testid="text-service-title">
                  {program.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm" data-testid="text-service-description">
                  {program.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
