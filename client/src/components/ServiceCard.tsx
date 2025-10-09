import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function ServiceCard({ icon: Icon, title, description, color = "blue" }: ServiceCardProps) {
  const colorClasses = {
    blue: "bg-primary/10 text-primary",
    green: "bg-brand-green/10 text-brand-green",
    yellow: "bg-brand-yellow/10 text-brand-yellow",
    red: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="p-6 md:p-8 hover-elevate transition-all duration-300 hover:shadow-xl h-full" data-testid="card-service">
      <div className="flex flex-col h-full">
        <div className={`p-4 rounded-lg ${colorClasses[color]} w-fit mb-4`}>
          <Icon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-3" data-testid="text-service-title">
          {title}
        </h3>
        <p className="text-muted-foreground flex-1" data-testid="text-service-description">
          {description}
        </p>
      </div>
    </Card>
  );
}
