import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";

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
    { key: "8-9" as TabKey, label: "8-9 STUDENTS", gradient: "from-blue-500 to-cyan-500" },
    { key: "10-12" as TabKey, label: "10-12 STUDENTS", gradient: "from-emerald-500 to-teal-500" },
    { key: "college" as TabKey, label: "COLLEGE GRADUATES", gradient: "from-violet-500 to-purple-500" },
    { key: "working" as TabKey, label: "WORKING PROFESSIONALS", gradient: "from-orange-500 to-amber-500" },
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
  const currentGradient = tabs.find(t => t.key === activeTab)?.gradient || "from-blue-500 to-cyan-500";

  const handleEnrollClick = (planName: string, price: string) => {
    console.log(`Enroll in ${planName} (${price}) clicked`);
    alert(`Razorpay integration coming soon! Plan: ${planName}, Price: ${price}`);
  };

  return (
    <section id="packages-section" className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_300px,#3b82f640,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Zap className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">Flexible Pricing Plans</span>
          </div>
          
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white" data-testid="text-packages-title">
            Choose Your <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Path</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Tailored career guidance packages for every stage of your journey
          </p>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab, index) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-bold text-base px-8 py-6 transition-all duration-500 border-0 ${
                  activeTab === tab.key 
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl shadow-blue-500/50 scale-110` 
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:scale-105'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                data-testid={`tab-${tab.key}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {currentPackages.map((pkg, index) => (
            <Card
              key={`${activeTab}-${index}`}
              className={`p-10 group hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden ${
                pkg.isPopular 
                  ? `bg-gradient-to-br ${currentGradient} shadow-2xl shadow-blue-500/50` 
                  : 'bg-slate-800/50 backdrop-blur-xl'
              }`}
              data-testid={`card-package-${activeTab}-${index}`}
            >
              {pkg.isPopular && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full" />
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 border-0 font-black text-sm px-6 py-2 shadow-2xl z-10" data-testid={`badge-popular-${index}`}>
                    <Crown className="h-4 w-4 mr-1 inline" />
                    PREMIUM
                  </Badge>
                </>
              )}

              <div className="mb-8 relative z-10">
                <div className={`text-sm font-bold ${pkg.isPopular ? 'text-white/80' : 'text-blue-400'} mb-3 uppercase tracking-wider flex items-center gap-2`}>
                  <Sparkles className="h-4 w-4" />
                  {index === 0 ? "Standard" : "Premium"}
                </div>
                <h3 className={`font-heading font-black text-4xl ${pkg.isPopular ? 'text-white' : 'text-white'} mb-4`} data-testid={`text-package-name-${index}`}>
                  {pkg.planName}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-6xl font-heading font-black ${pkg.isPopular ? 'text-white' : 'text-white'}`} data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3" data-testid={`feature-${index}-${featureIndex}`}>
                    <div className={`flex-shrink-0 mt-0.5 p-1.5 rounded-full ${feature.included ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
                      {feature.included ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <X className="h-4 w-4 text-slate-500" />
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed font-medium ${feature.included ? (pkg.isPopular ? "text-white" : "text-white") : "text-slate-500"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className={`w-full font-black text-lg py-7 transition-all duration-300 border-0 ${
                  pkg.isPopular 
                    ? 'bg-white text-slate-900 hover:bg-white/90 shadow-2xl hover:shadow-white/50 hover:scale-105' 
                    : `bg-gradient-to-r ${currentGradient} text-white hover:scale-105 shadow-2xl shadow-blue-500/50`
                }`}
                onClick={() => handleEnrollClick(pkg.planName, pkg.price)}
                data-testid={`button-buy-${index}`}
              >
                BUY NOW →
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-12 bg-slate-800/30 backdrop-blur-sm rounded-full px-8 py-4 inline-block mx-auto w-full max-w-2xl border border-slate-700">
          🔒 All prices in INR. Secure payment by Razorpay.
        </p>
      </div>
    </section>
  );
}
