import { motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type EmeraldTulipGalleryProps = {
  content: EventContent;
  images: string[];
};

/** Aspect ratios cycle through the design's three tile shapes. */
const ASPECTS = ["3 / 4", "3 / 4.6", "1 / 1"];

export function EmeraldTulipGallery({
  content,
  images,
}: EmeraldTulipGalleryProps) {
  if (!images.length) return null;

  // The design signs the quote with initials; quoteRef lets the couple override it.
  const attribution =
    content.quoteRef?.trim() ||
    `${content.names.first.charAt(0)} & ${content.names.second.charAt(0)}`;

  return (
    <section className="pt-[min(13vh,120px)]">
      <AnimatedSection>
        <div className="flex flex-wrap items-end gap-6">
          <h2 className="et-display shrink-0 text-[clamp(30px,4.4vw,54px)] font-light text-[#eaf7ef]">
            {content.galleryTitle}
          </h2>
          <span className="h-px grow bg-gradient-to-r from-[#8ff0c0]/50 to-transparent" />
        </div>

        <div className="mt-9 grid items-end gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(168px,1fr))]">
          {images.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.08 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? 1.2 : -1.2 }}
              className="overflow-hidden rounded-[18px] border border-[#8ff0c0]/[0.16] bg-[#050f0a] transition-colors hover:border-[#8ff0c0]/45"
              style={{ aspectRatio: ASPECTS[i % ASPECTS.length] }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}

          {/* Closing quote card, sized to match the tiles it sits beside. */}
          <div
            className="flex flex-col justify-end rounded-[18px] border border-[#8ff0c0]/40 bg-gradient-to-br from-[#1fa971]/30 to-[#050f0a]/60 p-7 shadow-[0_18px_60px_rgba(31,169,113,0.2)]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <p className="et-display text-[27px] font-light italic leading-[1.22] text-[#f2fbf6]">
              {content.quoteText}
            </p>
            <p className="et-ui mt-4 text-[10px] uppercase tracking-[0.28em] text-[#8ff0c0]">
              {attribution}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
