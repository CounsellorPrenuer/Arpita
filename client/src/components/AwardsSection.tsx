import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Medal } from "lucide-react";

export default function AwardsSection() {
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

    const element = document.getElementById("awards");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const awards = [
    {
      icon: Trophy,
      title: "Mahatma Gandhi Samman",
      organization: "National Award",
      year: "2024",
      color: "yellow" as const,
    },
    {
      icon: Award,
      title: "Best Executive Coach Award",
      organization: "International Coaching Federation",
      year: "2023",
      color: "blue" as const,
    },
    {
      icon: Star,
      title: "Iconic Women Leader",
      organization: "Women Leadership Summit",
      year: "2023",
      color: "green" as const,
    },
    {
      icon: Medal,
      title: "Top 10 Women Leaders in Soft Skills",
      organization: "Industry Recognition",
      year: "2022",
      color: "blue" as const,
    },
    {
      icon: Trophy,
      title: "Excellence in L&OD",
      organization: "HR Excellence Awards",
      year: "2022",
      color: "yellow" as const,
    },
    {
      icon: Award,
      title: "Inspiring Coach of the Year",
      organization: "Coaching Excellence Awards",
      year: "2021",
      color: "green" as const,
    },
  ];

  const colorClasses = {
    blue: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary border-primary/30",
    green: "bg-gradient-to-br from-brand-green/20 to-brand-green/5 text-brand-green border-brand-green/30",
    yellow: "bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 text-brand-yellow border-brand-yellow/30",
    red: "bg-gradient-to-br from-destructive/20 to-destructive/5 text-destructive border-destructive/30",
  };

  return (
    <section id="awards" className="py-20 md:py-32 bg-gradient-to-b from-background to-card/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-awards-title">
            <span className="bg-gradient-to-r from-brand-yellow via-primary to-brand-green bg-clip-text text-transparent">
              Recognized for Excellence & Impact
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Honored with prestigious awards for transformative leadership and coaching excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {awards.map((award, index) => (
            <Card
              key={index}
              className={`p-8 group hover:scale-105 transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`card-award-${index}`}
            >
              <div className={`p-5 rounded-2xl ${colorClasses[award.color]} w-fit mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <award.icon className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`text-award-title-${index}`}>
                {award.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`text-award-org-${index}`}>
                {award.organization}
              </p>
              <Badge variant="secondary" className="text-sm font-semibold" data-testid={`badge-award-year-${index}`}>
                {award.year}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
