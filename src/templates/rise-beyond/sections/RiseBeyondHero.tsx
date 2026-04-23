import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import { CountdownTimer } from "../../../components/shared/CountdownTimer";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type RiseBeyondHeroProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
  ringImageUrl: string;
};

const reflectionMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent 72%)",
  maskImage:
    "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent 72%)",
};

export function RiseBeyondHero({
  inviteeName,
  personalized,
  validInvite,
  content,
  ringImageUrl,
}: RiseBeyondHeroProps) {
  const greeting =
    personalized && validInvite ? `Dear ${inviteeName},` : "Welcome,";

  return (
    <header className="relative min-h-[82vh] flex flex-col items-center justify-center text-center py-14 md:py-20">
      {ringImageUrl ? (
        <AnimatedSection delay={0.05}>
          <img
            src={ringImageUrl}
            alt=""
            className="h-12 sm:h-14 w-auto object-contain mb-8 opacity-90"
          />
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.1}>
        <span className="font-mono text-xs sm:text-sm text-red-400 font-semibold tracking-[0.35em] uppercase mb-6 block">
          {greeting}
        </span>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-black tracking-tighter leading-[0.92]">
            <span className="rise-silver-display block text-5xl sm:text-6xl md:text-8xl lg:text-9xl -skew-x-[8deg]">
              RISE
            </span>
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-blue-400 -skew-x-[8deg] mt-1 drop-shadow-[0_0_48px_rgba(59,130,246,0.35)]">
              BEYOND
            </span>
          </h1>

          <div
            className="hidden sm:block pointer-events-none select-none mt-2 sm:mt-3"
            aria-hidden
            style={reflectionMask}
          >
            <div className="scale-y-[-1] opacity-40">
              <h1 className="font-black tracking-tighter leading-[0.92] blur-[0.5px]">
                <span className="rise-silver-display block text-5xl sm:text-6xl md:text-8xl lg:text-9xl -skew-x-[8deg]">
                  RISE
                </span>
                <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-blue-300/70 -skew-x-[8deg] mt-1">
                  BEYOND
                </span>
              </h1>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.35}>
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-blue-300/80 mb-3">
          {content.names.first}
          <span className="rise-silver-subtle mx-2">·</span>
          {content.names.second}
        </p>
        <p className="rise-silver-muted font-sans text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mt-2 mb-10 font-medium tracking-wide">
          {content.tagline}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.45}>
        <div className="max-w-xl mx-auto mb-12">
          <div className="-skew-x-[8deg] border border-white/15 bg-white/[0.06] backdrop-blur-md px-6 py-8 sm:px-10 sm:py-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="skew-x-[8deg] space-y-4 text-left sm:text-center">
              <p className="rise-silver-body-strong text-base sm:text-lg leading-relaxed font-medium">
                {content.heroGreeting}
              </p>
              <p className="text-red-400/95 text-xs sm:text-sm font-bold uppercase tracking-[0.28em]">
                {content.heroInvite}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.55}>
        <div className="max-w-lg mx-auto px-2">
          <div className="-skew-x-[6deg] rounded-lg border border-blue-500/25 bg-black/30 backdrop-blur-lg px-4 py-6 sm:px-8 sm:py-8 shadow-inner shadow-blue-900/20">
            <div className="skew-x-[6deg]">
              <p className="rise-silver-body font-sans text-sm sm:text-base italic mb-1 leading-relaxed">
                &ldquo;{content.quoteText}&rdquo;
              </p>
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-blue-400/90 font-bold">
                {content.quoteRef}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.65}>
        <div className="mt-14 w-full max-w-2xl mx-auto -skew-x-[4deg] rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-8 sm:px-8 sm:py-10">
          <div className="skew-x-[4deg]">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-red-400/90 mb-6 font-bold">
              Launch sequence
            </p>
            <CountdownTimer
              eventDateTime={content.eventDateTime}
              variant="corporate"
            />
          </div>
        </div>
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-blue-400/50"
        aria-hidden
      >
        <span className="w-px h-10 bg-gradient-to-b from-transparent via-blue-400/60 to-transparent" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
          Ascend
        </span>
      </motion.div>
    </header>
  );
}
