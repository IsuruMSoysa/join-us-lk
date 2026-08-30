import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type EmeraldTulipMapProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

/** Approximate dark styling for standard Google embeds; the CMS may supply its own embed URL. */
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

export function EmeraldTulipMap({ content, mapEmbedSrc }: EmeraldTulipMapProps) {
  if (!mapEmbedSrc) return null;

  const src = withDarkMapParams(mapEmbedSrc);

  return (
    <section id="map" className="scroll-mt-6 pt-[min(13vh,120px)]">
      <AnimatedSection>
        <div className="grid items-center gap-9 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          <div>
            <h2 className="et-display text-[clamp(34px,5vw,60px)] font-light leading-[1.04] text-[#eaf7ef]">
              {content.mapTitle}
            </h2>
            {/* No travel-prose field exists on EventContent, so the venue name
                and address carry this column on their own. */}
            <p className="et-ui mt-7 text-[13px] font-medium text-[#8ff0c0]">
              {content.venueName}
            </p>
            <p className="et-ui mt-1.5 text-[13px] font-light text-[#88a897]">
              {content.venueAddress}
            </p>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-[#8ff0c0]/[0.16] bg-[#050f0a] p-1.5">
            <div
              className="overflow-hidden rounded-[18px] bg-[#050f0a]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <iframe
                title="Venue map"
                src={src}
                className="h-full w-full border-0"
                style={{
                  filter:
                    "invert(90%) hue-rotate(120deg) saturate(0.8) contrast(1.04) brightness(0.95)",
                }}
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
