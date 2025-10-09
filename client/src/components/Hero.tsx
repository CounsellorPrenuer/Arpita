import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Users, Briefcase, Trophy, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Briefcase, label: "Years HR & L&OD Experience", value: "20+" },
    { icon: Users, label: "Lives Transformed", value: "41,100+" },
    { icon: Award, label: "ICF Certified Executive Coach", value: "Certified" },
    { icon: Trophy, label: "Multi-Award-Winning Leader", value: "Awarded" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-brand-green/5 py-20 md:py-32 lg:py-40">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center space-y-8 md:space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Transforming Leaders Since 2004</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-tight" data-testid="text-hero-title">
            Empowering Growth.
            <br />
            <span className="bg-gradient-to-r from-primary via-brand-green to-primary bg-clip-text text-transparent animate-gradient">
              Inspiring Achievement.
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            Dr. Arpita, Founder of <span className="font-semibold text-foreground">Skillzy</span>, offers world-class coaching and training to unlock your personal and professional potential.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              variant="destructive"
              onClick={() => scrollToSection("contact")}
              className="text-base md:text-lg px-8 md:px-10 py-6 shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 hover:scale-105 transition-all duration-300"
              data-testid="button-hero-cta"
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("about")}
              className="text-base md:text-lg px-8 md:px-10 py-6 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12 md:pt-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`p-6 md:p-8 text-center group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                data-testid={`card-stat-${index}`}
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-brand-green/20 group-hover:from-primary/30 group-hover:to-brand-green/30 transition-all duration-300">
                    <stat.icon className="h-7 w-7 md:h-9 md:w-9 text-primary" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-2" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground leading-snug" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .delay-500 { animation-delay: 500ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
}
