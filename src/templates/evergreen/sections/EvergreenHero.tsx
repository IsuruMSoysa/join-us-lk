import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { CountdownTimer } from "../../../components/shared/CountdownTimer";
import { type EventContent } from "../../../types/template";
import { getEventDateFormatted } from "../../../utils/event";

type EvergreenHeroProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
  heroRingImageUrl?: string;
};

/** Small conifer glyph used as the divider centrepiece. */
function PineGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Three symmetric tiers, drawn down the left side and back up the right. */}
      <path d="M12 2 L7 11 L9.5 11 L5 19 L8 19 L2.5 27 L21.5 27 L16 19 L19 19 L14.5 11 L17 11 Z" />
      <path d="M12 27 v4" />
    </svg>
  );
}

export function EvergreenHero({
  inviteeName,
  personalized,
  validInvite,
  content,
  heroRingImageUrl,
}: EvergreenHeroProps) {
  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center py-16 md:py-24">
      <AnimatedSection delay={0.1}>
        <p className="eg-label text-[10px] sm:text-xs font-medium">
          {content.heroGreeting}
        </p>
      </AnimatedSection>

      {personalized && validInvite && inviteeName ? (
        <AnimatedSection delay={0.25}>
          <p className="mt-6 font-handwritten text-2xl sm:text-3xl md:text-4xl text-[#DCE8E0]">
            {inviteeName}
          </p>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.4}>
        <h1 className="mt-6 md:mt-8 leading-[1.05]">
          <span className="eg-serif-display block text-5xl sm:text-6xl md:text-8xl font-light tracking-wide">
            {content.names.first}
          </span>
          <span className="my-2 block font-handwritten text-3xl sm:text-4xl md:text-5xl text-[#7FA88C]">
            &amp;
          </span>
          <span className="eg-serif-display block text-5xl sm:text-6xl md:text-8xl font-light tracking-wide">
            {content.names.second}
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.55}>
        <div className="mt-8 flex items-center justify-center gap-4 text-[#7FA88C]">
          <span className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#7FA88C]/60" />
          <PineGlyph className="h-6 w-5 shrink-0 text-[#7FA88C]" />
          <span className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#7FA88C]/60" />
        </div>
      </AnimatedSection>

      {heroRingImageUrl ? (
        <AnimatedSection delay={0.6} isZoomIn>
          <img
            src={heroRingImageUrl}
            alt=""
            className="mx-auto mt-8 h-20 w-auto opacity-80 md:h-24"
            loading="lazy"
          />
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.7}>
        <p className="eg-mist-text mx-auto mt-8 max-w-xl text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
          {content.tagline}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.8}>
        <p className="eg-label mt-8 text-xs sm:text-sm font-medium">
          {getEventDateFormatted(content)}
        </p>
        <p className="eg-muted-text mt-2 text-sm sm:text-base">
          {content.eventTime}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.95}>
        <div className="mt-12 md:mt-16">
          <CountdownTimer
            eventDateTime={content.eventDateTime}
            variant="forest"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={1.1}>
        <p className="eg-muted-text mx-auto mt-12 max-w-lg text-sm sm:text-base leading-relaxed">
          {content.heroInvite}
        </p>
      </AnimatedSection>

      <motion.div
        aria-hidden
        animate={{ y: [0, 9, 0], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="mt-14 text-[#7FA88C]"
      >
        <ChevronDown size={26} strokeWidth={1.25} />
      </motion.div>
    </section>
  );
}
