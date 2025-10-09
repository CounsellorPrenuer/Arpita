import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles } from "lucide-react";

type TabKey = "8-9" | "10-12" | "college" | "working";

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planName: string;
  price: string;
  features: Feature[];
  isPopular?: boolean;
}

export default function PackagesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("8-9");
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

    const element = document.querySelector('#packages-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const tabs = [
    { key: "8-9" as TabKey, label: "8-9 STUDENTS" },
    { key: "10-12" as TabKey, label: "10-12 STUDENTS" },
    { key: "college" as TabKey, label: "COLLEGE GRADUATES" },
    { key: "working" as TabKey, label: "WORKING PROFESSIONALS" },
  ];

  const packagesData: Record<TabKey, Package[]> = {
    "8-9": [
      {
        planName: "Discover",
        price: "₹ 5,500",
        features: [
          { text: "Psychometric assessment to measure your interests", included: true },
          { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV building during internship/graduation", included: false },
        ],
      },
      {
        planName: "Discover plus+",
        price: "₹ 15,000",
        features: [
          { text: "Psychometric assessments to measure your interests, personality and abilities", included: true },
          { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Invites to live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV building during internship/graduation", included: true },
        ],
        isPopular: true,
      },
    ],
    "10-12": [
      {
        planName: "Achieve Online",
        price: "₹ 5,999",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews during internship/graduation", included: false },
        ],
      },
      {
        planName: "Achieve Plus+",
        price: "₹ 10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "4 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with education pathways", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews during internship/graduation", included: true },
        ],
        isPopular: true,
      },
    ],
    "college": [
      {
        planName: "Ascend Online",
        price: "₹ 6,499",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
      },
      {
        planName: "Ascend Plus+",
        price: "₹ 10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "3 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
        isPopular: true,
      },
    ],
    "working": [
      {
        planName: "Ascend Online",
        price: "₹ 6,499",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "1 career counselling session", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Pre-recorded webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: false },
          { text: "Guidance on studying abroad", included: false },
          { text: "CV reviews for job application", included: false },
        ],
      },
      {
        planName: "Ascend Plus+",
        price: "₹ 10,599",
        features: [
          { text: "Psychometric assessment to measure your interests, personality and abilities", included: true },
          { text: "2 career counselling sessions", included: true },
          { text: "Lifetime access to Knowledge Gateway", included: true },
          { text: "Attend live webinars by industry experts", included: true },
          { text: "Customized reports after each session with information on certificate/online courses", included: true },
          { text: "Guidance on studying abroad", included: true },
          { text: "CV reviews for job application", included: true },
        ],
        isPopular: true,
      },
    ],
  };

  const currentPackages = packagesData[activeTab];

  const handleEnrollClick = (planName: string, price: string) => {
    console.log(`Enroll in ${planName} (${price}) clicked`);
    // TODO: Integrate Razorpay payment gateway
    alert(`Razorpay integration coming soon! Plan: ${planName}, Price: ${price}`);
  };

  return (
    <section id="packages-section" className="py-20 md:py-32 bg-gradient-to-b from-card/50 via-background to-card/30 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Flexible Pricing Plans</span>
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-packages-title">
            <span className="bg-gradient-to-r from-primary via-brand-green to-brand-yellow bg-clip-text text-transparent">
              Choose Your Path
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored career guidance packages for every stage of your journey
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {tabs.map((tab, index) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                size="lg"
                onClick={() => setActiveTab(tab.key)}
                className={`font-semibold transition-all duration-300 ${
                  activeTab === tab.key 
                    ? 'shadow-lg shadow-primary/30 scale-105' 
                    : 'hover:scale-105'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                data-testid={`tab-${tab.key}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {currentPackages.map((pkg, index) => (
            <Card
              key={`${activeTab}-${index}`}
              className={`p-8 md:p-10 group hover:scale-105 transition-all duration-500 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 ${
                pkg.isPopular ? "border-primary border-2 shadow-lg shadow-primary/20" : ""
              }`}
              data-testid={`card-package-${activeTab}-${index}`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              )}
              
              {pkg.isPopular && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-lg z-10"
                  data-testid={`badge-popular-${index}`}
                >
                  ⭐ PREMIUM
                </Badge>
              )}

              <div className="mb-8 relative z-10">
                <div className="text-sm font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-brand-green' : 'bg-primary'}`} />
                  {index === 0 ? "Standard" : "Premium"}
                </div>
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300" data-testid={`text-package-name-${index}`}>
                  {pkg.planName}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent" data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 group/item" data-testid={`feature-${index}-${featureIndex}`}>
                    <div className={`flex-shrink-0 mt-0.5 p-1 rounded-full ${feature.included ? 'bg-brand-green/10' : 'bg-muted'}`}>
                      {feature.included ? (
                        <Check className="h-4 w-4 text-brand-green" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed ${feature.included ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant="destructive"
                size="lg"
                className="w-full font-bold text-base shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 hover:scale-105 transition-all duration-300"
                onClick={() => handleEnrollClick(pkg.planName, pkg.price)}
                data-testid={`button-buy-${index}`}
              >
                BUY NOW →
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 inline-block mx-auto w-full max-w-lg">
          🔒 All prices are in Indian Rupees (INR). Secure payment powered by Razorpay.
        </p>
      </div>

      <style>{`
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
}
