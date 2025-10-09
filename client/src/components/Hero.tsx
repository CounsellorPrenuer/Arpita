import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Users, Briefcase, Trophy, Sparkles, ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Briefcase, label: "Years Experience", value: "20+", gradient: "from-blue-500 to-cyan-400" },
    { icon: Users, label: "Lives Transformed", value: "41K+", gradient: "from-emerald-500 to-teal-400" },
    { icon: Award, label: "ICF Certified", value: "✓", gradient: "from-violet-500 to-purple-400" },
    { icon: Trophy, label: "Awards Won", value: "10+", gradient: "from-orange-500 to-amber-400" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated mesh gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 50%)`
        }}
      />
      
      {/* Animated orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className={`text-center space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
            <span className="text-sm font-bold text-blue-300 tracking-wide">Transforming Leaders Since 2004</span>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none" data-testid="text-hero-title">
              <span className="block text-white mb-4">Empowering Growth.</span>
              <span className="block bg-gradient-to-r from-blue-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Inspiring Achievement.
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <Sparkles className="h-6 w-6 text-blue-400" />
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            </div>
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed" data-testid="text-hero-subtitle">
            Dr. Arpita, Founder of <span className="font-bold text-white">Skillzy</span>, delivers transformative coaching to unlock your limitless potential.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-110 transition-all duration-300 border-0 group"
              data-testid="button-hero-cta"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("about")}
              className="text-lg px-10 py-7 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-bold border-2 border-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300 group"
              data-testid="button-learn-more"
            >
              Learn More
              <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            </Button>
          </div>

          {/* Stats Grid - Bento Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-16 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`p-6 md:p-8 text-center group hover:scale-110 transition-all duration-500 bg-gradient-to-br ${stat.gradient} border-0 shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                data-testid={`card-stat-${index}`}
              >
                <div className="flex justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2 group-hover:scale-125 transition-transform duration-300" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/90 font-semibold" data-testid={`text-stat-label-${index}`}>
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
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
