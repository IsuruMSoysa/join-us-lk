import { motion } from "framer-motion";
import { type EventContent } from "../../../types/template";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { usePrefersReducedMotion } from "../../../lib/hooks/usePrefersReducedMotion";

type UnionAwardsGalleryProps = {
  content: EventContent;
  images: string[];
};

const ERA_LABELS = ["Past", "Present", "Future"] as const;

export function UnionAwardsGallery({
  content,
  images,
}: UnionAwardsGalleryProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (images.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <AnimatedSection>
        <div className="text-center mb-14 md:mb-20">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#ff8c00]/90 mb-3">
            The timeline
          </p>
          <h2 className="ua-gold-display ua-shimmer font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase inline-block">
            {content.galleryTitle}
          </h2>
          <div className="mt-5 flex justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#daa520] to-transparent" />
          </div>
        </div>
      </AnimatedSection>

      <div className="relative max-w-4xl mx-auto">
        <div
          className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden md:block w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#ffd700]/20 via-[#c9a227]/50 to-[#ff6600]/20 z-0"
          aria-hidden
        />

        <ul className="relative z-[1] space-y-14 md:space-y-20">
          {images.map((src, i) => {
            const era = ERA_LABELS[i % ERA_LABELS.length];
            const isLeft = i % 2 === 0;

            return (
              <li key={`${src}-${i}`} className="relative">
                <motion.div
                  className={`relative flex flex-col md:flex-row md:items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          x: isLeft ? -48 : 48,
                          filter: "blur(10px)",
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : { opacity: 1, x: 0, filter: "blur(0px)" }
                  }
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    }`}
                  >
                    {/* <span className="inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-[#ff8c00] mb-2">
                      {era}
                    </span> */}
                    <div
                      className="relative overflow-hidden border border-[#c9a227]/50 bg-black/50 shadow-[0_20px_50px_-24px_rgba(212,175,55,0.35)]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-auto max-h-[min(52vh,22rem)] object-cover object-center"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#ffd700] bg-[#0a0a0a] shadow-[0_0_20px_rgba(255,215,0,0.55)] z-[2] items-center justify-center"
                    aria-hidden
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb347]" />
                  </div>

                  {/* <div className="md:w-[calc(50%-2rem)] md:flex md:items-center">
                    <p
                      className={`text-sm text-[#a89880] leading-relaxed ${
                        isLeft ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      A moment along the arc of legacy — image {i + 1} of{" "}
                      {images.length}.
                    </p>
                  </div> */}
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
