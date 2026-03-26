import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { type EventContent } from "../../types/template";

type GallerySectionProps = {
  content: EventContent;
  images: string[];
};

export function GallerySection({ content, images }: GallerySectionProps) {
  return (
    <section className="py-16">
      <AnimatedSection>
        <div className="text-center mb-16">
          <h2 className="font-round text-3xl md:text-5xl text-olive font-bold mb-4">
            {content.galleryTitle}
          </h2>
          <div className="w-24 h-1 bg-gold/30 mx-auto rounded-full" />
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-[2rem] shadow-2xl border-4 border-cream group"
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
