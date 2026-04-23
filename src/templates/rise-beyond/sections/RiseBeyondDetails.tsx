import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import {
  getEventDateFormatted,
  getGoogleCalendarUrl,
} from "../../../utils/event";

type RiseBeyondDetailsProps = {
  content: EventContent;
};

export function RiseBeyondDetails({ content }: RiseBeyondDetailsProps) {
  const calendarUrl = getGoogleCalendarUrl(content);

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
          <h2 className="rise-silver-display font-black text-3xl sm:text-4xl md:text-6xl tracking-tight uppercase -skew-x-[6deg] inline-block">
            {content.detailsTitle}
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-0.5 bg-red-500 -skew-x-[12deg] shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {cards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={false}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="will-change-transform"
            >
              <div className="-skew-x-[8deg] border border-white/10 bg-white/5 backdrop-blur-md p-8 sm:p-10 text-center shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)]">
                <div className="skew-x-[8deg] flex flex-col items-center h-full">
                  <div className="mb-6 inline-flex p-4 border border-red-500/35 bg-red-500/10 text-red-400">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="rise-silver-body-strong font-bold text-lg sm:text-xl mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="rise-silver-muted text-sm leading-relaxed mb-6 grow">
                    {item.subtitle}
                  </p>
                  {"link" in item && item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 border-b border-blue-500/40 hover:border-blue-300 pb-0.5 transition-colors"
                    >
                      {item.linkText}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 md:mt-16 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-blue-600 px-8 py-4 sm:py-5 font-bold uppercase tracking-[0.22em] text-sm sm:text-base text-white shadow-[0_16px_48px_-12px_rgba(59,130,246,0.45)] border border-white/10"
        >
          <Calendar size={22} strokeWidth={2} />
          <span>Add to Google Calendar</span>
          <ExternalLink size={18} className="opacity-80" />
        </motion.a>
      </AnimatedSection>
    </section>
  );
}
