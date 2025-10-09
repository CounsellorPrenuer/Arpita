import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function ServiceCard({ icon: Icon, title, description, color = "blue" }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: {
      bg: "from-primary/10 to-primary/5",
      icon: "text-primary",
      glow: "group-hover:shadow-primary/20"
    },
    green: {
      bg: "from-brand-green/10 to-brand-green/5",
      icon: "text-brand-green",
      glow: "group-hover:shadow-brand-green/20"
    },
    yellow: {
      bg: "from-brand-yellow/10 to-brand-yellow/5",
      icon: "text-brand-yellow",
      glow: "group-hover:shadow-brand-yellow/20"
    },
    red: {
      bg: "from-destructive/10 to-destructive/5",
      icon: "text-destructive",
      glow: "group-hover:shadow-destructive/20"
    },
  };

  return (
    <Card 
      className={`p-6 md:p-8 group transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colorClasses[color].glow} h-full relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="card-service"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorClasses[color].bg} w-fit mb-5 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className={`h-7 w-7 md:h-9 md:w-9 ${colorClasses[color].icon} transition-transform duration-500 ${isHovered ? 'rotate-12' : ''}`} />
        </div>
        <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300" data-testid="text-service-title">
          {title}
        </h3>
        <p className="text-muted-foreground flex-1 leading-relaxed" data-testid="text-service-description">
          {description}
        </p>
      </div>
    </Card>
  );
}
