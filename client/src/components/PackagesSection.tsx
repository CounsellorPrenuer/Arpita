import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PackagesSection() {
  const packages = [
    {
      name: "Executive Coaching Package",
      description: "Comprehensive coaching program for senior leaders and C-suite executives",
      price: "₹50,000",
      duration: "3 months",
      features: [
        "8 one-on-one coaching sessions",
        "Psychometric assessment & analysis",
        "Personalized development plan",
        "Leadership 360-degree feedback",
        "Email support between sessions",
        "Progress tracking & reports",
      ],
      color: "blue" as const,
      popular: true,
    },
    {
      name: "Career Development Session",
      description: "Focused coaching for professionals seeking career growth and transitions",
      price: "₹15,000",
      duration: "Single session",
      features: [
        "2-hour intensive session",
        "Career assessment",
        "Goal-setting framework",
        "Action plan creation",
        "Resource recommendations",
        "Follow-up email summary",
      ],
      color: "green" as const,
      popular: false,
    },
    {
      name: "Leadership Workshop",
      description: "Interactive group training for teams and organizations",
      price: "Custom",
      duration: "Flexible",
      features: [
        "Customized content for your team",
        "Interactive exercises & activities",
        "Skill-building modules",
        "Team assessment tools",
        "Post-workshop resources",
        "Implementation support",
      ],
      color: "yellow" as const,
      popular: false,
    },
  ];

  const handleEnrollClick = (packageName: string) => {
    console.log(`Enroll in ${packageName} clicked`);
    // TODO: Integrate Razorpay payment gateway
    alert(`Razorpay integration coming soon! Package: ${packageName}`);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-packages-title">
            Engage My Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the coaching package that aligns with your growth journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-6 md:p-8 hover-elevate transition-all duration-300 hover:shadow-xl relative ${
                pkg.popular ? "border-primary border-2" : ""
              }`}
              data-testid={`card-package-${index}`}
            >
              {pkg.popular && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  data-testid="badge-popular"
                >
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-2" data-testid={`text-package-name-${index}`}>
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`text-package-description-${index}`}>
                  {pkg.description}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-heading font-bold text-foreground" data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`text-package-duration-${index}`}>
                  {pkg.duration}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3" data-testid={`feature-${index}-${featureIndex}`}>
                    <Check className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="destructive"
                size="lg"
                className="w-full hover-elevate active-elevate-2"
                onClick={() => handleEnrollClick(pkg.name)}
                data-testid={`button-enroll-${index}`}
              >
                Enroll Now
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All prices are in Indian Rupees (INR). Custom packages available for organizations.
        </p>
      </div>
    </section>
  );
}
