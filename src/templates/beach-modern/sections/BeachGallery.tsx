import { motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type GallerySectionProps = {
  content: EventContent;
  images: string[];
};

export function BeachGallery({ content, images }: GallerySectionProps) {
  return (
    <section className="py-24">
      <AnimatedSection>
        <div className="text-center mb-20">
          <h2 className="font-sans text-4xl md:text-6xl text-sky-950 font-bold mb-6 tracking-tight">
            {content.galleryTitle}
          </h2>
          <div className="w-20 h-1.5 bg-sky-400/30 mx-auto rounded-full" />
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
              className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-sky-900/10 border-8 border-white group transition-all duration-500"
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-sky-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
