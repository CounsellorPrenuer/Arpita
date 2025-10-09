import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Users, Briefcase, Trophy } from "lucide-react";

export default function Hero() {
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
    <section className="relative bg-gradient-to-br from-primary/10 via-brand-green/5 to-background py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 md:space-y-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground" data-testid="text-hero-title">
            Empowering Growth.
            <br />
            <span className="text-primary">Inspiring Achievement.</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Dr. Arpita, Founder of Skillzy, offers world-class coaching and training to unlock your personal and professional potential.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={() => scrollToSection("contact")}
              className="text-base md:text-lg px-6 md:px-8 hover-elevate active-elevate-2"
              data-testid="button-hero-cta"
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("about")}
              className="text-base md:text-lg px-6 md:px-8 hover-elevate active-elevate-2"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12 md:pt-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 text-center hover-elevate transition-all duration-300 hover:shadow-xl"
                data-testid={`card-stat-${index}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
