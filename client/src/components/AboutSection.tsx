import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Award, Sparkles, Star } from "lucide-react";
import profileImagePath from "@assets/Gemini_Generated_Image_q8buhoq8buhoq8bu_1763741188935.png";

export default function AboutSection() {
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

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const certifications = [
    "ICF & IAPCCT Executive Coach",
    "Certified Psychometric Assessor",
    "Certified Dale Carnegie Trainer",
    "MEPSC Certified Trainer",
    "NLP Coach",
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#3b82f640,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_100%,#10b98140,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Star className="h-5 w-5 text-blue-400 fill-blue-400" />
            <span className="text-sm font-bold text-blue-300">Meet Your Coach</span>
          </div>
          
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white" data-testid="text-about-title">
            About <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Dr. Arpita</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Transforming lives through expert coaching and leadership development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 border-0 bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-600 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={profileImagePath} 
                  alt="Dr. Arpita" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-600 to-emerald-600 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 border-0" data-testid="card-certifications">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white">
                  Certifications & Credentials
                </h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                    data-testid={`certification-${index}`}
                  >
                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white font-bold">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-500">
              <p className="text-xl text-white leading-relaxed mb-6 font-medium" data-testid="text-bio-1">
                Dr. Arpita is a distinguished Executive Coach and the visionary Founder of{" "}
                <span className="font-black text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">CHERRYSKILLZ Learning Pvt. Ltd (Skillzy)</span>, 
                bringing over 20 years of rich experience in Human Resources and Learning & Organizational Development.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emerald-600 to-teal-600 border-0 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500">
              <div className="text-xl text-white leading-relaxed font-medium" data-testid="text-bio-2">
                With a proven track record of transforming{" "}
                <Badge className="inline-flex mx-1 text-lg bg-white text-emerald-600 border-0 font-black px-4 py-1">41,100+ lives</Badge>, 
                Dr. Arpita has established herself as a trusted advisor to C-suite executives, senior leaders, 
                and professionals across diverse industries.
              </div>
            </Card>

            <Card className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 hover:border-violet-500/50 transition-all duration-500">
              <div className="text-lg text-slate-300 leading-relaxed mb-6" data-testid="text-bio-3">
                As an{" "}
                <Badge className="inline-flex bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 font-bold">ICF Certified Executive Coach</Badge>, 
                Dr. Arpita specializes in leadership development, career transitions, organizational change, 
                and personal growth. Her approach combines evidence-based coaching methodologies with deep 
                cultural insights, creating sustainable transformational outcomes.
              </div>

              <p className="text-lg text-slate-300 leading-relaxed" data-testid="text-bio-4">
                Dr. Arpita's commitment to excellence has earned her numerous accolades, including the 
                prestigious <span className="font-black text-yellow-400">Mahatma Gandhi Samman</span>, 
                <span className="font-black text-blue-400"> Best Executive Coach Award</span>, and recognition as an 
                <span className="font-black text-emerald-400"> Iconic Women Leader</span>.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 border-0 shadow-2xl hover:shadow-violet-500/50 transition-all duration-500">
              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-white flex-shrink-0 mt-1" />
                <p className="text-xl text-white leading-relaxed font-bold" data-testid="text-bio-5">
                  Through Skillzy, Dr. Arpita continues to pioneer innovative coaching and training solutions, 
                  helping organizations build resilient leaders and high-performing cultures. Her mission is to 
                  create a ripple effect of positive change, one individual and one organization at a time.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
