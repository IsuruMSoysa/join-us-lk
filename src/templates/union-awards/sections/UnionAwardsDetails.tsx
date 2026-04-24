import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import {
  getEventDateFormatted,
  getGoogleCalendarUrl,
} from "../../../utils/event";
import { usePrefersReducedMotion } from "../../../lib/hooks/usePrefersReducedMotion";

type UnionAwardsDetailsProps = {
  content: EventContent;
};

export function UnionAwardsDetails({ content }: UnionAwardsDetailsProps) {
  const calendarUrl = getGoogleCalendarUrl(content);
  const reducedMotion = usePrefersReducedMotion();

  const cards = [
    {
      icon: Calendar,
      title: getEventDateFormatted(content),
      subtitle: content.detailsDateSubtitle,
    },
    {
      icon: MapPin,
      title: content.venueName,
      subtitle: content.venueAddress,
      link: "#map",
      linkText: content.detailsMapLinkText,
    },
    {
      icon: Clock,
      title: content.eventTime,
      subtitle: content.detailsTimeSubtitle,
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <AnimatedSection>
        <div className="text-center mb-14 md:mb-20">
          <h2 className="ua-gold-display ua-shimmer font-black text-3xl sm:text-4xl md:text-6xl tracking-tight uppercase inline-block">
            {content.detailsTitle}
          </h2>
          <div className="mt-5 flex justify-center">
            <div className="h-0.5 w-28 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent shadow-[0_0_20px_rgba(255,215,0,0.45)]" />
          </div>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-1/2 top-8 bottom-8 hidden md:block w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c9a227]/55 to-transparent z-0"
            aria-hidden
          />

          <div className="relative z-[1] grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
            {cards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={false}
                whileHover={
                  reducedMotion ? undefined : { x: 4, scale: 1.01 }
                }
                whileTap={reducedMotion ? undefined : { scale: 0.995 }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className="will-change-transform"
              >
                <div
                  className="h-full border border-[#b8860b]/45 bg-[#0a0a0a]/80 backdrop-blur-md p-8 sm:p-10 text-center shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                  }}
                >
                  <div className="flex flex-col items-center h-full">
                    <div className="mb-6 inline-flex p-4 border border-[#ff8c00]/40 bg-[#ff6600]/[0.08] text-[#ffb347]">
                      <item.icon size={30} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[#f5ebe0] font-bold text-lg sm:text-xl mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[#a89880] text-sm leading-relaxed mb-6 grow">
                      {item.subtitle}
                    </p>
                    {"link" in item && item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#ffd700] hover:text-[#ffb347] border-b border-[#c9a227]/50 hover:border-[#ffb347] pb-0.5 transition-colors"
                      >
                        {item.linkText}
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          className="mt-12 md:mt-16 flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#8b6914] via-[#daa520] to-[#ff8c00] px-8 py-4 sm:py-5 font-bold uppercase tracking-[0.2em] text-sm sm:text-base text-black shadow-[0_16px_48px_-12px_rgba(255,165,0,0.5)] border border-[#ffd700]/40"
        >
          <Calendar size={22} strokeWidth={2} />
          <span>Add to Google Calendar</span>
          <ExternalLink size={18} className="opacity-85" />
        </motion.a>
      </AnimatedSection>
    </section>
  );
}
