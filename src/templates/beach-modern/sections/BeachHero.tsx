import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { CountdownTimer } from "../../../components/shared/CountdownTimer";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type HeroSectionProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
  ringImageUrl: string;
};

export function BeachHero({
  inviteeName,
  personalized,
  validInvite,
  content,
}: HeroSectionProps) {
  const greeting =
    personalized && validInvite ? `Dear ${inviteeName},` : "Welcome,";

  return (
    <header className="relative min-h-[85vh] flex flex-col items-center justify-center text-center py-16">
      <AnimatedSection delay={0.1}>
        <span className="font-sans text-lg md:text-xl text-sky-600 font-medium tracking-[0.2em] uppercase mb-8 block">
          {greeting}
        </span>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="mb-10 text-sky-400/40">
          <Heart size={48} fill="currentColor" className="opacity-40" />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl text-sky-950 font-bold leading-tight mb-8 tracking-tight">
          {content.names.first} <span className="text-sky-400">&</span>{" "}
          {content.names.second}
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <div className="max-w-2xl mx-auto mb-16">
          <p className="font-sans text-xl md:text-2xl text-sky-900/70 leading-relaxed mb-6 font-light">
            {content.heroGreeting}
          </p>
          <p className="font-sans text-lg text-sky-600/80 font-medium tracking-wide uppercase">
            {content.heroInvite}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.7}>
        <div className="bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/50 max-w-xl mx-auto shadow-xl shadow-sky-900/5">
          <p className="font-sans text-2xl text-sky-950/80 mb-4 italic font-light leading-relaxed">
            "{content.quoteText}"
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-sky-400 font-bold">
            {content.quoteRef}
          </p>
        </div>
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-sky-300"
      >
        <Heart size={32} />
      </motion.div>

      <div className="mt-16">
        <AnimatedSection delay={0.9} isZoomIn>
          <CountdownTimer eventDateTime={content.eventDateTime} />
        </AnimatedSection>
      </div>
    </header>
  );
}
