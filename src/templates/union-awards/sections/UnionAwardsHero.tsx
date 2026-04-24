import { motion } from "framer-motion";
import { CountdownTimer } from "../../../components/shared/CountdownTimer";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { usePrefersReducedMotion } from "../../../lib/hooks/usePrefersReducedMotion";

type UnionAwardsHeroProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
  eventLogoUrl?: string;
};

const chronoTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function UnionAwardsHero({
  inviteeName,
  personalized,
  validInvite,
  content,
  eventLogoUrl,
}: UnionAwardsHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const greeting =
    personalized && validInvite ? `Dear ${inviteeName},` : "Welcome,";

  const chronoInitial = reducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 56, filter: "blur(14px)" };
  const chronoAnimate = reducedMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: [56, -5, 3, 0],
        filter: ["blur(14px)", "blur(5px)", "blur(0px)"],
      };

  return (
    <header className="relative min-h-[85vh] flex flex-col items-center justify-center text-center py-14 md:py-20">
      <motion.div
        className="w-full max-w-6xl"
        initial={chronoInitial}
        animate={chronoAnimate}
        transition={chronoTransition}
      >
        <span className="font-mono text-[30px] sm:text-sm text-[#ff8c00] font-bold tracking-[0.38em] uppercase mb-8 block">
          {greeting}
        </span>

        {eventLogoUrl ? (
          <div className="relative z-10 flex flex-col items-center w-full">
            <motion.img
              src={eventLogoUrl}
              alt=""
              className="w-[min(96vw,44rem)] max-h-[min(68vh,44rem)] object-contain drop-shadow-[0_0_48px_rgba(255,180,60,0.3)] origin-center will-change-transform"
              animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.05, 1] }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        ) : null}

        <p className="mt-6 font-black tracking-[0.08em] text-[10px] sm:text-xs uppercase text-[#ffb347]/90">
          {content.names.first}
          <span className="text-[#6b5b45]/80 mx-2">·</span>
          {content.names.second}
        </p>

        <h1 className="ua-gold-display ua-shimmer font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase mt-5 max-w-3xl mx-auto leading-tight">
          {content.tagline}
        </h1>
      </motion.div>

      <AnimatedSection delay={0.15}>
        <motion.div
          initial={
            reducedMotion ? false : { opacity: 0, x: -40, filter: "blur(8px)" }
          }
          whileInView={
            reducedMotion
              ? undefined
              : { opacity: 1, x: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-xl mx-auto w-full"
        >
          <div className="border border-[#c9a227]/35 bg-[#0c0c0c]/75 backdrop-blur-xl px-6 py-8 sm:px-10 sm:py-10 shadow-[0_24px_80px_-32px_rgba(212,175,55,0.35)]">
            <p className="text-[#e8dcc8] text-base sm:text-lg leading-relaxed font-semibold tracking-tight">
              {content.heroGreeting}
            </p>
            <p className="mt-4 text-[#ff8c00] text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
              {content.heroInvite}
            </p>
          </div>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection delay={0.25}>
        <div className="mt-10 max-w-lg mx-auto w-full border border-[#b8860b]/25 bg-black/40 backdrop-blur-lg px-5 py-6 sm:px-8 sm:py-8">
          <p className="text-[#d4c4a8] text-sm sm:text-base italic leading-relaxed">
            &ldquo;{content.quoteText}&rdquo;
          </p>
          <p className="mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#daa520]/90 font-bold">
            {content.quoteRef}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.35}>
        <div className="mt-14 w-full max-w-2xl mx-auto border border-[#8b6914]/40 bg-gradient-to-b from-[#141008]/90 to-black/80 backdrop-blur-md px-4 py-8 sm:px-8 sm:py-10">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.42em] text-[#ffb347] mb-6 font-bold">
            Chrono countdown
          </p>
          <CountdownTimer
            eventDateTime={content.eventDateTime}
            variant="awards"
          />
        </div>
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#c9a227]/50"
        aria-hidden
      >
        <span className="w-px h-10 bg-gradient-to-b from-transparent via-[#ffd700]/50 to-transparent" />
        <span className="text-[10px] font-mono uppercase tracking-[0.28em]">
          Forward
        </span>
      </motion.div>
    </header>
  );
}
