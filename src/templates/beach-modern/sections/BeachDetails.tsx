import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { getEventDateFormatted, getGoogleCalendarUrl } from "../../../utils/event";

type DetailsSectionProps = {
  content: EventContent;
};

export function BeachDetails({ content }: DetailsSectionProps) {
  return (
    <section className="py-24">
      <AnimatedSection>
        <div className="text-center mb-20">
          <h2 className="font-sans text-4xl md:text-6xl text-sky-950 font-bold mb-6 tracking-tight">
            {content.detailsTitle}
          </h2>
          <div className="w-20 h-1.5 bg-sky-400/30 mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: Calendar,
              title: getEventDateFormatted(content),
              subtitle: content.detailsDateSubtitle,
              link: getGoogleCalendarUrl(content),
              linkText: "Add to Calendar",
            },
            {
              icon: Clock,
              title: content.eventTime,
              subtitle: content.detailsTimeSubtitle,
              link: null,
            },
            {
              icon: MapPin,
              title: content.venueName,
              subtitle: content.venueAddress,
              link: "#map",
              linkText: content.detailsMapLinkText,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm p-12 rounded-[3.5rem] text-center border border-white/80 flex flex-col items-center group shadow-2xl shadow-sky-900/5 transition-all duration-500"
            >
              <div className="mb-8 p-6 bg-sky-50 rounded-full text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <item.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-sans text-2xl text-sky-950 font-bold mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sky-900/60 mb-8 font-sans leading-relaxed font-light">{item.subtitle}</p>
              {item.link && (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-sky-600 hover:text-sky-400 transition-all uppercase tracking-[0.2em] border-b-2 border-sky-100 hover:border-sky-400 pb-1"
                >
                  {item.linkText}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
