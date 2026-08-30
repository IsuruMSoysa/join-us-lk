import { motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type EvergreenGalleryProps = {
  content: EventContent;
  images: string[];
};

export function EvergreenGallery({ content, images }: EvergreenGalleryProps) {
  if (!images.length) return null;

  return (
    <section className="py-20 md:py-28">
      <AnimatedSection>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="eg-serif-display text-3xl sm:text-4xl md:text-6xl font-light tracking-wide">
            {content.galleryTitle}
          </h2>
          <div className="mt-5 flex justify-center">
            <span className="h-px w-20 bg-[#7FA88C]/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {images.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.09 }}
              className="group relative overflow-hidden rounded-2xl border border-[#16452F] bg-[#0B2A1E]/40 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)] transition-colors hover:border-[#7FA88C]/45"
            >
              <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Canopy vignette so photos sit inside the forest palette. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04120C]/80 via-[#04120C]/15 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(4,18,12,0.55)]" />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
