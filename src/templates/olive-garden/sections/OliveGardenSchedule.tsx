import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { getGoogleCalendarUrl } from "../../../utils/event";

type OliveGardenScheduleProps = {
  content: EventContent;
};

/**
 * "How the day unfolds" — reuses the shared `orderOfDayTitle`/`orderOfDayItems`
 * fields (see EmeraldTulipOrderOfDay for the same optional-field precedent),
 * with `item.highlight` picking out the solid/gold middle card.
 */
export function OliveGardenSchedule({ content }: OliveGardenScheduleProps) {
  const items = content.orderOfDayItems ?? [];
  if (!items.length) return null;

  const title = content.orderOfDayTitle?.trim() || "How the day unfolds";

  return (
    <section id="schedule" className="scroll-mt-6 pt-[min(13vh,120px)]">
      <AnimatedSection>
        <h2 className="og-serif text-center text-[clamp(30px,4.4vw,48px)] font-light text-[#3d4224]">
          {title}
        </h2>

        <div className="mt-9 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,180px), 1fr))" }}>
          {items.map((item, i) => (
            <div
              key={`${item.time}-${item.title}-${i}`}
              className={`rounded-[22px] border px-7 py-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                item.highlight
                  ? "border-[#4a5a22] bg-[#4a5a22] text-[#f6f1e4]"
                  : "border-[#e3ddc7] bg-[#fbf8ee] text-[#3d4224]"
              }`}
            >
              {item.time ? (
                <p
                  className={`og-label text-[11px] uppercase tracking-[0.3em] ${
                    item.highlight ? "text-[#d6b468]" : "text-[#85641b]"
                  }`}
                >
                  {item.time}
                </p>
              ) : null}
              <p className="og-serif mt-3 text-[24px] font-normal leading-[1.15]">
                {item.title}
              </p>
              {item.description ? (
                <p
                  className={`og-ui mt-2.5 text-[13px] font-light leading-[1.6] ${
                    item.highlight ? "text-[#e3ddc7]" : "text-[#555a38]"
                  }`}
                >
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 text-center">
          <a
            href={getGoogleCalendarUrl(content)}
            target="_blank"
            rel="noopener noreferrer"
            className="og-shimmer-pill og-ui rounded-full px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#2f3517] shadow-[0_16px_38px_rgba(160,124,40,0.38)] transition-transform hover:-translate-y-[2px]"
          >
            ✦ Save the date to your calendar
          </a>
          <p className="og-ui text-[13px] font-light text-[#6b7a3a]">
            One tap — future you will thank you.
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
}
