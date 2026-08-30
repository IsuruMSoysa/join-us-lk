import { CalendarDays, Clock, MapPin, CalendarPlus } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { getEventDateFormatted, getGoogleCalendarUrl } from "../../../utils/event";

type EvergreenDetailsProps = {
  content: EventContent;
};

export function EvergreenDetails({ content }: EvergreenDetailsProps) {
  const cards = [
    {
      Icon: CalendarDays,
      label: content.detailsDateSubtitle,
      title: getEventDateFormatted(content),
      body: null as string | null,
    },
    {
      Icon: Clock,
      label: content.detailsTimeSubtitle,
      title: content.eventTime,
      body: null as string | null,
    },
    {
      Icon: MapPin,
      label: content.detailsMapLinkText,
      title: content.venueName,
      body: content.venueAddress,
    },
  ];

  return (
    <section id="details" className="py-20 md:py-28 scroll-mt-8">
      <AnimatedSection>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="eg-serif-display text-3xl sm:text-4xl md:text-6xl font-light tracking-wide">
            {content.detailsTitle}
          </h2>
          <div className="mt-5 flex justify-center">
            <span className="h-px w-20 bg-[#7FA88C]/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map(({ Icon, label, title, body }, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#16452F] bg-[#0B2A1E]/45 backdrop-blur-sm px-6 py-9 text-center shadow-[inset_0_1px_0_rgba(220,232,224,0.06),0_24px_60px_-32px_rgba(0,0,0,0.9)] transition-colors hover:border-[#7FA88C]/45"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#7FA88C]/35 bg-[#04120C]/60 text-[#7FA88C]">
                <Icon size={20} strokeWidth={1.4} />
              </div>
              <p className="eg-label text-[10px] font-medium">{label}</p>
              <p className="mt-3 text-xl sm:text-2xl font-light text-white leading-snug">
                {title}
              </p>
              {body ? (
                <p className="eg-muted-text mt-2 text-sm leading-relaxed">
                  {body}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={getGoogleCalendarUrl(content)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#7FA88C]/45 bg-[#0B2A1E]/60 px-7 py-3.5 text-sm tracking-[0.16em] uppercase text-[#DCE8E0] backdrop-blur-sm transition-all hover:border-white/60 hover:bg-[#16452F]/70 hover:text-white"
          >
            <CalendarPlus size={17} strokeWidth={1.5} />
            <span>Add to Google Calendar</span>
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
