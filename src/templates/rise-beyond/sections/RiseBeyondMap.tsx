import { MapPin } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type RiseBeyondMapProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

/** Approximate dark styling for standard Google embeds; CMS may override with a custom embed URL. */
function withDarkMapParams(src: string): string {
  try {
    const u = new URL(src);
    if (u.hostname.includes("google.com") && u.pathname.includes("/maps/embed")) {
      u.searchParams.set("maptype", "roadmap");
    }
    return u.toString();
  } catch {
    return src;
  }
}

export function RiseBeyondMap({ content, mapEmbedSrc }: RiseBeyondMapProps) {
  if (!mapEmbedSrc) return null;

  const src = withDarkMapParams(mapEmbedSrc);

  return (
    <section id="map" className="py-20 md:py-28 scroll-mt-8">
      <AnimatedSection>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="rise-silver-display font-black text-3xl sm:text-4xl md:text-6xl tracking-tight -skew-x-[6deg] inline-block uppercase">
            {content.mapTitle}
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-0.5 bg-blue-500 -skew-x-[12deg]" />
          </div>
        </div>

        <div
          className="relative border border-blue-500/30 bg-blue-950/20 p-1 sm:p-2 shadow-[0_24px_60px_-24px_rgba(37,99,235,0.35)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 92%, 96% 100%, 0 100%)",
          }}
        >
          <div className="overflow-hidden rounded-sm bg-[#0a1628]">
            <iframe
              title="Venue map"
              src={src}
              className="h-[min(70vh,28rem)] w-full border-0"
              style={{
                filter:
                  "invert(92%) hue-rotate(180deg) saturate(1.12) contrast(1.06) brightness(0.78)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="rise-silver-muted mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 text-sm sm:text-base">
          <MapPin className="shrink-0 text-red-400/90" size={22} strokeWidth={1.5} />
          <div className="text-center sm:text-left">
            <p className="rise-silver-body-strong font-bold tracking-tight">
              {content.venueName}
            </p>
            <p className="rise-silver-subtle mt-1">{content.venueAddress}</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
