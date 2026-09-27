import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type OliveGardenMapProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

/** Google Maps search URL built from venue name + address (no separate mapQuery field needed). */
function getDirectionsUrl(content: EventContent): string {
  const query = [content.venueName, content.venueAddress].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function OliveGardenMap({ content, mapEmbedSrc }: OliveGardenMapProps) {
  if (!mapEmbedSrc) return null;

  return (
    <section id="map" className="scroll-mt-6 pt-[min(13vh,120px)]">
      <AnimatedSection>
        <div className="grid items-center gap-9" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div>
            <h2 className="og-serif text-[clamp(30px,4.4vw,48px)] font-light leading-[1.1] text-[#3d4224]">
              {content.mapTitle}
            </h2>
            <p className="og-label mt-6 text-[13px] uppercase tracking-[0.2em] text-[#85641b]">
              {content.venueName}
            </p>
            <p className="og-ui mt-1.5 text-[14px] font-light text-[#555a38]">
              {content.venueAddress}
            </p>
            <a
              href={getDirectionsUrl(content)}
              target="_blank"
              rel="noopener noreferrer"
              className="og-ui mt-5 inline-block text-[13px] font-medium uppercase tracking-[0.15em] text-[#4a5a22] underline decoration-[#b7bc82] underline-offset-4 hover:text-[#3b4519]"
            >
              Get directions ↗
            </a>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-[#e3ddc7] bg-[#fbf8ee] p-1.5">
            <div className="overflow-hidden rounded-[18px]" style={{ aspectRatio: "4 / 3" }}>
              <iframe
                title={`Map to ${content.venueName}`}
                src={mapEmbedSrc}
                className="h-full w-full border-0"
                style={{ filter: "sepia(.25) saturate(.85)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
