import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Medal, Crown, Gem } from "lucide-react";

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
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
    },
    {
      icon: Crown,
      title: "Best Executive Coach Award",
      organization: "International Coaching Federation",
      year: "2023",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
    },
    {
      icon: Star,
      title: "Iconic Women Leader",
      organization: "Women Leadership Summit",
      year: "2023",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
    },
    {
      icon: Medal,
      title: "Top 10 Women Leaders in Soft Skills",
      organization: "Industry Recognition",
      year: "2022",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    },
    {
      icon: Gem,
      title: "Excellence in L&OD",
      organization: "HR Excellence Awards",
      year: "2022",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    },
    {
      icon: Award,
      title: "Inspiring Coach of the Year",
      organization: "Coaching Excellence Awards",
      year: "2021",
      gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    },
  ];

  return (
    <section id="awards" className="py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f680,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 backdrop-blur-xl mb-8">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-300">Award-Winning Excellence</span>
          </div>
          
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white" data-testid="text-awards-title">
            Recognized for <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">Excellence & Impact</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Honored with prestigious awards for transformative leadership and coaching excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <Card
              key={index}
              className={`p-8 group hover:scale-110 transition-all duration-500 bg-gradient-to-br ${award.gradient} border-0 shadow-2xl hover:shadow-[0_0_100px_rgba(251,191,36,0.8)] relative overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`card-award-${index}`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm w-fit mb-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <award.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3 group-hover:scale-105 transition-transform duration-300" data-testid={`text-award-title-${index}`}>
                  {award.title}
                </h3>
                <p className="text-white/90 mb-4 leading-relaxed font-medium" data-testid={`text-award-org-${index}`}>
                  {award.organization}
                </p>
                <Badge className="bg-white/20 text-white border-0 font-bold text-sm hover:bg-white/30" data-testid={`badge-award-year-${index}`}>
                  🏆 {award.year}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
