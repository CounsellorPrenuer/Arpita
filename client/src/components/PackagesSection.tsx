import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-packages-title">
            Choose Your Path
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored career guidance packages for every stage of your journey
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                size="lg"
                onClick={() => setActiveTab(tab.key)}
                className="hover-elevate active-elevate-2 font-semibold"
                data-testid={`tab-${tab.key}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {currentPackages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-6 md:p-8 hover-elevate transition-all duration-300 hover:shadow-xl relative ${
                pkg.isPopular ? "border-primary border-2" : ""
              }`}
              data-testid={`card-package-${activeTab}-${index}`}
            >
              {pkg.isPopular && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  data-testid={`badge-popular-${index}`}
                >
                  PREMIUM
                </Badge>
              )}

              <div className="mb-6">
                <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                  {index === 0 ? "Standard" : "Premium"}
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4" data-testid={`text-package-name-${index}`}>
                  {pkg.planName}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-heading font-bold text-foreground" data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3" data-testid={`feature-${index}-${featureIndex}`}>
                    {feature.included ? (
                      <Check className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant="destructive"
                size="lg"
                className="w-full hover-elevate active-elevate-2 font-semibold"
                onClick={() => handleEnrollClick(pkg.planName, pkg.price)}
                data-testid={`button-buy-${index}`}
              >
                BUY NOW
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All prices are in Indian Rupees (INR). Secure payment powered by Razorpay.
        </p>
      </div>
    </section>
  );
}
