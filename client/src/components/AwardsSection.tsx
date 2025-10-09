import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Medal } from "lucide-react";

export default function AwardsSection() {
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
    blue: "bg-primary/10 text-primary border-primary/20",
    green: "bg-brand-green/10 text-brand-green border-brand-green/20",
    yellow: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
    red: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <section id="awards" className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-awards-title">
            Recognized for Excellence & Impact
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Honored with prestigious awards for transformative leadership and coaching excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="p-6 md:p-8 hover-elevate transition-all duration-300 hover:shadow-xl"
              data-testid={`card-award-${index}`}
            >
              <div className={`p-4 rounded-lg ${colorClasses[award.color]} w-fit mb-4`}>
                <award.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-2" data-testid={`text-award-title-${index}`}>
                {award.title}
              </h3>
              <p className="text-muted-foreground mb-3" data-testid={`text-award-org-${index}`}>
                {award.organization}
              </p>
              <Badge variant="secondary" className="text-sm" data-testid={`badge-award-year-${index}`}>
                {award.year}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
