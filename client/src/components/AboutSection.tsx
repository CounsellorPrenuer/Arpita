import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const certifications = [
    "ICF & IAPCCT Executive Coach",
    "Certified Psychometric Assessor",
    "Certified Dale Carnegie Trainer",
    "MEPSC Certified Trainer",
    "NLP Coach",
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-about-title">
            About Dr. Arpita
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming lives through expert coaching and leadership development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="space-y-6">
            <Card className="overflow-hidden hover-elevate transition-all duration-300">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-brand-green/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary to-brand-green flex items-center justify-center mb-4">
                    <span className="text-6xl font-heading font-bold text-white">DA</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    {/* TODO: Replace with actual profile photo */}
                    Professional photo placeholder - Replace with Dr. Arpita's image
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8" data-testid="card-certifications">
              <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-4">
                Certifications & Credentials
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`certification-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed mb-4" data-testid="text-bio-1">
                Dr. Arpita is a distinguished Executive Coach and the visionary Founder of{" "}
                <span className="font-semibold text-primary">CHERRYSKILLZ Learning Pvt. Ltd (Skillzy)</span>, 
                bringing over 20 years of rich experience in Human Resources and Learning & Organizational Development.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-bio-2">
                With a proven track record of transforming{" "}
                <span className="font-semibold text-foreground">over 41,100 lives</span>, 
                Dr. Arpita has established herself as a trusted advisor to C-suite executives, senior leaders, 
                and professionals across diverse industries. Her approach combines evidence-based coaching 
                methodologies with deep cultural insights, creating sustainable transformational outcomes.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-bio-3">
                As an{" "}
                <Badge variant="default" className="inline-flex">ICF Certified Executive Coach</Badge>, 
                Dr. Arpita specializes in leadership development, career transitions, organizational change, 
                and personal growth. Her expertise spans executive coaching, psychometric assessments, 
                and designing high-impact learning interventions that drive measurable business results.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-bio-4">
                Dr. Arpita's commitment to excellence has earned her numerous accolades, including the 
                prestigious Mahatma Gandhi Samman, Best Executive Coach Award, and recognition as an 
                Iconic Women Leader. Her holistic approach integrates professional development with 
                personal well-being, empowering individuals to achieve their highest potential.
              </p>

              <p className="text-foreground leading-relaxed font-medium" data-testid="text-bio-5">
                Through Skillzy, Dr. Arpita continues to pioneer innovative coaching and training solutions, 
                helping organizations build resilient leaders and high-performing cultures. Her mission is to 
                create a ripple effect of positive change, one individual and one organization at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
