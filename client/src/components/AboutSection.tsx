import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Award } from "lucide-react";

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
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-about-title">
            <span className="bg-gradient-to-r from-primary via-brand-green to-primary bg-clip-text text-transparent">
              About Dr. Arpita
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming lives through expert coaching and leadership development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/30 via-brand-green/20 to-brand-yellow/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
                <div className="text-center p-8 relative z-10">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary via-brand-green to-brand-yellow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    <span className="text-7xl font-heading font-bold text-white">DA</span>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 mt-4">
                    <p className="text-sm text-muted-foreground italic">
                      {/* TODO: Replace with actual profile photo */}
                      Professional photo placeholder - Replace with Dr. Arpita's image
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-card to-primary/5 hover:shadow-2xl transition-all duration-500" data-testid="card-certifications">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground">
                  Certifications & Credentials
                </h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                    data-testid={`certification-${index}`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground leading-relaxed mb-6" data-testid="text-bio-1">
                Dr. Arpita is a distinguished Executive Coach and the visionary Founder of{" "}
                <span className="font-semibold text-primary">CHERRYSKILLZ Learning Pvt. Ltd (Skillzy)</span>, 
                bringing over 20 years of rich experience in Human Resources and Learning & Organizational Development.
              </p>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-brand-green/10 border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed" data-testid="text-bio-2">
                  With a proven track record of transforming{" "}
                  <Badge variant="default" className="inline-flex mx-1 text-base">41,100+ lives</Badge>, 
                  Dr. Arpita has established herself as a trusted advisor to C-suite executives, senior leaders, 
                  and professionals across diverse industries.
                </p>
              </Card>

              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-bio-3">
                As an{" "}
                <Badge variant="default" className="inline-flex">ICF Certified Executive Coach</Badge>, 
                Dr. Arpita specializes in leadership development, career transitions, organizational change, 
                and personal growth. Her approach combines evidence-based coaching methodologies with deep 
                cultural insights, creating sustainable transformational outcomes.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-bio-4">
                Dr. Arpita's commitment to excellence has earned her numerous accolades, including the 
                prestigious <span className="font-semibold text-brand-yellow">Mahatma Gandhi Samman</span>, 
                <span className="font-semibold text-primary"> Best Executive Coach Award</span>, and recognition as an 
                <span className="font-semibold text-brand-green"> Iconic Women Leader</span>. Her holistic approach integrates 
                professional development with personal well-being, empowering individuals to achieve their highest potential.
              </p>

              <Card className="p-6 bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 border-brand-green/20">
                <p className="text-foreground leading-relaxed font-medium text-lg" data-testid="text-bio-5">
                  Through Skillzy, Dr. Arpita continues to pioneer innovative coaching and training solutions, 
                  helping organizations build resilient leaders and high-performing cultures. Her mission is to 
                  create a ripple effect of positive change, one individual and one organization at a time.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
