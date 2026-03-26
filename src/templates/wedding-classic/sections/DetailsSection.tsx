import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { getEventDateFormatted, getGoogleCalendarUrl } from "../../../utils/event";

type DetailsSectionProps = {
  content: EventContent;
};

export function DetailsSection({ content }: DetailsSectionProps) {
  return (
    <section className="py-16">
      <AnimatedSection>
        <h2 className="font-round text-3xl md:text-5xl text-center text-secondary font-bold mb-16">
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
              className="glass p-10 rounded-[3rem] text-center border-primary/10 flex flex-col items-center group"
            >
              <div className="mb-6 p-4 bg-secondary/10 rounded-full text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                <item.icon size={32} />
              </div>
              <h3 className="font-round text-2xl text-text font-bold mb-2">{item.title}</h3>
              <p className="text-text/70 mb-6 font-round">{item.subtitle}</p>
              {item.link && (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-secondary hover:text-accent transition-colors uppercase tracking-widest border-b border-secondary/20 pb-1"
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
