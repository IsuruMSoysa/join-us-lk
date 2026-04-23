import { motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type RiseBeyondGalleryProps = {
  content: EventContent;
  images: string[];
};

export function RiseBeyondGallery({
  content,
  images,
}: RiseBeyondGalleryProps) {
  if (!images.length) return null;

  return (
    <section className="py-20 md:py-28">
      <AnimatedSection>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="rise-silver-display font-black text-3xl sm:text-4xl md:text-6xl tracking-tight -skew-x-[6deg] inline-block uppercase">
            {content.galleryTitle}
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-0.5 bg-blue-500 -skew-x-[12deg] shadow-[0_0_18px_rgba(59,130,246,0.45)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-0 sm:px-2">
          {images.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.08 }}
              whileHover={{ y: -8, zIndex: 10 }}
              className={`
                group relative overflow-hidden border border-white/10 bg-black/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]
                ${i % 2 === 1 ? "sm:-mt-6 md:-mt-8" : "sm:mt-4 md:mt-6"}
                ${i % 3 === 1 ? "md:-translate-y-3" : ""}
              `}
            >
              <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-blue-400 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
