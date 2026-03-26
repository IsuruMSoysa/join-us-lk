import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { AnimatedSection } from "../shared/AnimatedSection";
import { type EventContent } from "../../types/template";
import { getEventDateFormatted, getGoogleCalendarUrl } from "../../utils/event";

type DetailsSectionProps = {
  content: EventContent;
};

export function DetailsSection({ content }: DetailsSectionProps) {
  return (
    <section className="py-16">
      <AnimatedSection>
        <h2 className="font-round text-3xl md:text-5xl text-center text-olive font-bold mb-16">
          {content.detailsTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: getEventDateFormatted(content),
              subtitle: content.detailsDateSubtitle,
              link: getGoogleCalendarUrl(content),
              linkText: "Add to Calendar",
            },
            {
              icon: Sparkles,
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
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[3rem] text-center border-gold/10 flex flex-col items-center group"
            >
              <div className="mb-6 p-4 bg-olive/5 rounded-full text-maroon group-hover:bg-maroon group-hover:text-cream transition-colors duration-500">
                <item.icon size={32} />
              </div>
              <h3 className="font-round text-2xl text-coffee font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-coffee/60 mb-6 font-round">{item.subtitle}</p>
              {item.link && (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-olive hover:text-maroon transition-colors uppercase tracking-widest border-b border-olive/20 pb-1"
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
