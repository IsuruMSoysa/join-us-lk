import { MapPin } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type EvergreenMapProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

/** Approximate dark styling for standard Google embeds; CMS may override with a custom embed URL. */
function withDarkMapParams(src: string): string {
  try {
    const u = new URL(src);
    if (
      u.hostname.includes("google.com") &&
      u.pathname.includes("/maps/embed")
    ) {
      u.searchParams.set("maptype", "roadmap");
    }
    return u.toString();
  } catch {
    return src;
  }
}

export function EvergreenMap({ content, mapEmbedSrc }: EvergreenMapProps) {
  if (!mapEmbedSrc) return null;

  const src = withDarkMapParams(mapEmbedSrc);

  return (
    <section id="map" className="py-20 md:py-28 scroll-mt-8">
      <AnimatedSection>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="eg-serif-display text-3xl sm:text-4xl md:text-6xl font-light tracking-wide">
            {content.mapTitle}
          </h2>
          <div className="mt-5 flex justify-center">
            <span className="h-px w-20 bg-[#7FA88C]/60" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#16452F] bg-[#0B2A1E]/40 p-1.5 sm:p-2 shadow-[0_28px_70px_-34px_rgba(0,0,0,0.9)]">
          <div className="overflow-hidden rounded-xl bg-[#04120C]">
            <iframe
              title="Venue map"
              src={src}
              className="h-[min(70vh,28rem)] w-full border-0"
              style={{
                filter:
                  "invert(90%) hue-rotate(120deg) saturate(0.75) contrast(1.04) brightness(0.95)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-fit max-w-full flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <MapPin
            className="shrink-0 text-[#7FA88C]"
            size={22}
            strokeWidth={1.4}
          />
          <div className="min-w-0 max-w-full sm:max-w-none">
            <p className="text-lg font-light text-white">{content.venueName}</p>
            <p className="eg-muted-text mt-1 text-sm">{content.venueAddress}</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
