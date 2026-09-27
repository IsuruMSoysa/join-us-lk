import { useEffect } from "react";
import { getDefaultDocumentTitle } from "../../config/brand";
import { GlowOrbs } from "./sections/GlowOrbs";
import { LandingNav } from "./sections/LandingNav";
import { HeroSection } from "./sections/HeroSection";
import { EventMarquee } from "./sections/EventMarquee";
import { FeaturesSection } from "./sections/FeaturesSection";
import { JourneySection } from "./sections/JourneySection";
import { TemplatesSection } from "./sections/TemplatesSection";
// import { TestimonialsSection } from "./sections/TestimonialsSection";
import { CtaSection } from "./sections/CtaSection";
import { LandingFooter } from "./sections/LandingFooter";

const WHATSAPP_NUMBER_DIGITS_ONLY = "94789436808";
const WHATSAPP_DISPLAY_NUMBER = "+94 78 943 6808";
const WHATSAPP_TEXT = "Hi! I'd like a quote for an invitation website.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER_DIGITS_ONLY}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export function LandingPage() {
  useEffect(() => {
    document.title = getDefaultDocumentTitle();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-round text-text">
      <GlowOrbs />
      <div className="relative">
        <LandingNav whatsappHref={WHATSAPP_HREF} />
        <main>
          <HeroSection
            whatsappHref={WHATSAPP_HREF}
            whatsappDisplayNumber={WHATSAPP_DISPLAY_NUMBER}
          />
          <EventMarquee />
          <FeaturesSection />
          <JourneySection />
          <TemplatesSection />
          {/* <TestimonialsSection /> */}
          <CtaSection
            whatsappHref={WHATSAPP_HREF}
            whatsappDisplayNumber={WHATSAPP_DISPLAY_NUMBER}
          />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
