import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type UnionAwardsMapProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

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

export function UnionAwardsMap({ content, mapEmbedSrc }: UnionAwardsMapProps) {
  if (!mapEmbedSrc) return null;

  const src = withDarkMapParams(mapEmbedSrc);

  return (
    <section id="map" className="py-20 md:py-28 scroll-mt-8">
      <AnimatedSection>
        <div className="text-center mb-10 md:mb-14">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#ff8c00]/85 mb-3">
            The destination in time
          </p>
          <h2 className="ua-gold-display ua-shimmer font-black text-3xl sm:text-4xl md:text-6xl tracking-tight uppercase inline-block">
            {content.mapTitle}
          </h2>
          <div className="mt-5 flex justify-center">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#daa520] to-transparent" />
          </div>
        </div>

        <div
          className="relative border border-[#c9a227]/45 bg-[#0a0a0a]/90 p-1 sm:p-2 shadow-[0_28px_70px_-28px_rgba(212,175,55,0.35)]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 94%, 96% 100%, 0 100%)",
          }}
        >
          <div className="overflow-hidden rounded-sm bg-[#050508] relative">
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
            <motion.div
              className="pointer-events-none absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
              aria-hidden
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-14 h-14 rounded-full bg-[#ffd700]/25 blur-md" />
                <MapPin
                  className="relative text-[#ffb347] drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]"
                  size={40}
                  strokeWidth={1.75}
                  fill="rgba(10,8,4,0.5)"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-fit max-w-full flex-col sm:flex-row items-center justify-center gap-3 text-center text-sm sm:text-base sm:text-left text-[#c4b49a]">
          <MapPin
            className="shrink-0 text-[#ffd700]"
            size={22}
            strokeWidth={1.5}
          />
          <div className="min-w-0 max-w-full sm:max-w-none">
            <p className="text-[#f0e6d8] font-bold tracking-tight">
              {content.venueName}
            </p>
            <p className="text-[#8b7355] mt-1">{content.venueAddress}</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
