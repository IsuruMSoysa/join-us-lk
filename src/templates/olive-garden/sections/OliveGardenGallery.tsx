import { motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type OliveGardenGalleryProps = {
  content: EventContent;
  images: string[];
};

/** Aspect ratios cycle through the design's three tile shapes. */
const ASPECTS = ["3 / 4", "3 / 4.5", "1 / 1"];

/**
 * Optional section: hidden whenever there are no photos, regardless of the
 * `gallery` section toggle in config.sections (same two-gate pattern
 * EmeraldTulipOrderOfDay uses). Handles 1–3 photos gracefully — the quote
 * tile always closes the grid.
 */
export function OliveGardenGallery({ content, images }: OliveGardenGalleryProps) {
  if (!images.length) return null;

  const attribution =
    content.quoteRef?.trim() || `${content.names.first.charAt(0)} & ${content.names.second.charAt(0)}`;

  return (
    <section className="pt-[min(13vh,120px)]">
      <AnimatedSection>
        <h2 className="og-serif text-center text-[clamp(30px,4.4vw,48px)] font-light text-[#3d4224]">
          {content.galleryTitle}
        </h2>
        <p className="og-ui mx-auto mt-3 max-w-[46ch] text-center text-[14px] font-light text-[#555a38]">
          A few favourite frames from the road that led us to the Poruwa.
        </p>

        <div
          className="mt-9 grid items-end gap-[18px]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,190px), 1fr))" }}
        >
          {images.slice(0, 3).map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.08 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
              className="overflow-hidden rounded-[18px] border border-[#e3ddc7] bg-[#efe9d7]"
              style={{ aspectRatio: ASPECTS[i % ASPECTS.length] }}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          ))}

          <div
            className="flex flex-col justify-end rounded-[18px] bg-[#3b4519] p-7"
            style={{ aspectRatio: "3 / 4" }}
          >
            <p className="og-serif text-[24px] font-light italic leading-[1.25] text-[#f6f1e4]">
              {content.quoteText}
            </p>
            <p className="og-ui mt-4 text-[10px] uppercase tracking-[0.28em] text-[#d6b468]">
              {attribution}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
