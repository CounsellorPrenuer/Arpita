import ServiceCard from '../ServiceCard'
import { Briefcase } from 'lucide-react'

export default function ServiceCardExample() {
  return (
    <div className="grid gap-6">
      <ServiceCard
        icon={Briefcase}
        title="Executive Coaching"
        description="Transform your leadership capabilities with personalized coaching designed for C-suite executives and senior leaders."
        color="blue"
      />
      <ServiceCard
        icon={Briefcase}
        title="Leadership Development"
        description="Build the skills and mindset needed to lead teams effectively and drive organizational success."
        color="green"
      />
    </div>
  )
}
