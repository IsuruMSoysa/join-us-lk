import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { CountdownTimer } from "../shared/CountdownTimer";
import { AnimatedSection } from "../shared/AnimatedSection";
import { type EventContent } from "../../types/template";

type HeroSectionProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
  ringImageUrl: string;
};

export function HeroSection({
  inviteeName,
  personalized,
  validInvite,
  content,
  ringImageUrl,
}: HeroSectionProps) {
  const greeting =
    personalized && validInvite ? `Dear ${inviteeName},` : "Welcome,";

  return (
    <header className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-12">
      <AnimatedSection delay={0.1}>
        <span className="font-handwritten text-3xl md:text-4xl text-maroon mb-6 block">
          {greeting}
        </span>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <img
          src={ringImageUrl}
          alt="Wedding Rings"
          className="w-24 md:w-24 mx-auto"
        />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <h1 className="font-round text-5xl md:text-8xl text-olive font-bold leading-tight mb-4 tracking-tighter">
          {content.names.first} <span className="text-gold">&</span>{" "}
          {content.names.second}
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <div className="max-w-2xl mx-auto mb-12">
          <p className="font-round text-xl md:text-2xl text-coffee/80 leading-relaxed mb-4">
            {content.heroGreeting}
          </p>
          <p className="font-round text-lg text-olive/70 italic">
            {content.heroInvite}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.7}>
        <div className="glass p-8 rounded-3xl border-gold/20 max-w-lg mx-auto relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
          <p className="font-handwritten text-2xl text-maroon mb-2">
            "{content.quoteText}"
          </p>
          <p className="font-round text-xs uppercase tracking-widest text-coffee/50">
            {content.quoteRef}
          </p>
        </div>
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce text-maroon"
      >
        <Heart size={40} fill="currentColor" className="opacity-40" />
      </motion.div>
      <AnimatedSection delay={0.9} isZoomIn>
        <CountdownTimer eventDateTime={content.eventDateTime} />
      </AnimatedSection>
    </header>
  );
}
