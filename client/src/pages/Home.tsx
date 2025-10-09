import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import AwardsSection from "@/components/AwardsSection";
import AboutSection from "@/components/AboutSection";
import PackagesSection from "@/components/PackagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ExpertiseSection />
        <AwardsSection />
        <AboutSection />
        <PackagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
