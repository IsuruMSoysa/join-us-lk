import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import {
  getEventDateFormatted,
  getGoogleCalendarUrl,
} from "../../../utils/event";

type EmeraldTulipDetailsProps = {
  content: EventContent;
};

export function EmeraldTulipDetails({ content }: EmeraldTulipDetailsProps) {
  // Cards 1 and 2 carry no note: EventContent has no per-card copy field, and
  // quoteText/quoteRef belong to the gallery's quotation, not here.
  const cards = [
    {
      label: content.detailsDateSubtitle,
      title: getEventDateFormatted(content),
      note: "",
      accent: false,
    },
    {
      label: content.detailsTimeSubtitle,
      title: content.eventTime,
      note: "",
      accent: false,
    },
    {
      label: content.detailsMapLinkText,
      title: content.venueName,
      note: content.venueAddress,
      accent: true,
    },
  ];

  return (
    <section id="details" className="scroll-mt-6 pt-[min(13vh,120px)]">
      <AnimatedSection>
        <div className="flex items-center gap-6">
          <h2 className="et-display shrink-0 text-[clamp(34px,5.2vw,66px)] font-light text-[#eaf7ef]">
            {content.detailsTitle}
          </h2>
          <span className="h-px grow bg-gradient-to-r from-[#8ff0c0]/50 to-transparent" />
        </div>

        <div className="mt-10 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {cards.map((card, i) => (
            <div
              key={i}
              className={
                card.accent
                  ? "rounded-[22px] border border-[#8ff0c0]/40 bg-gradient-to-br from-[#1fa971]/[0.34] to-[#1fa971]/[0.08] px-[30px] pb-9 pt-[34px] shadow-[0_18px_60px_rgba(31,169,113,0.24)] backdrop-blur-[8px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(31,169,113,0.32)]"
                  : "rounded-[22px] border border-[#8ff0c0]/[0.14] bg-gradient-to-br from-white/[0.055] to-white/[0.015] px-[30px] pb-9 pt-[34px] backdrop-blur-[8px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8ff0c0]/45 hover:shadow-[0_22px_60px_rgba(31,169,113,0.22)]"
              }
            >
              <p
                className={`et-ui text-[10px] uppercase tracking-[0.3em] ${
                  card.accent ? "text-[#c8fbe1]" : "text-[#7fbfa0]"
                }`}
              >
                {card.label}
              </p>
              <p
                className={`et-display mt-4 text-[34px] font-normal leading-[1.12] ${
                  card.accent ? "text-white" : "text-[#eaf7ef]"
                }`}
              >
                {card.title}
              </p>
              {card.note ? (
                <p
                  className={`et-ui mt-3 text-sm font-light leading-[1.65] ${
                    card.accent ? "text-[#d3f2e2]" : "text-[#a9c9b8]"
                  }`}
                >
                  {card.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap gap-3.5">
          <a
            href={getGoogleCalendarUrl(content)}
            target="_blank"
            rel="noopener noreferrer"
            className="et-ui rounded-full border border-[#8ff0c0]/30 bg-white/[0.03] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#dfeee5] transition-colors hover:border-[#8ff0c0] hover:bg-[#8ff0c0]/10"
          >
            Add to calendar
          </a>
          <a
            href="#map"
            className="et-ui rounded-full border border-[#8ff0c0]/30 bg-white/[0.03] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#dfeee5] transition-colors hover:border-[#8ff0c0] hover:bg-[#8ff0c0]/10"
          >
            Directions
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
