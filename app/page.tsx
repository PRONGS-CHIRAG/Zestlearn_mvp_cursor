import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import TargetAudience from "@/components/landing/TargetAudience";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <TargetAudience />
      <CTASection />
    </main>
  );
}
