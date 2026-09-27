import { useEffect, useState } from "react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { usePrefersReducedMotion } from "../../../lib/hooks/usePrefersReducedMotion";
import { QUOTES } from "../content";

export function TestimonialsSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setActiveQuote((i) => (i + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion]);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 px-4 pb-16 md:px-16 md:pb-26"
    >
      <div className="mx-auto max-w-[1152px]">
        <AnimatedSection>
          <h2 className="mb-5 font-display text-[30px] leading-[1.05] font-extrabold tracking-[-0.03em] md:mb-9 md:text-[52px] md:leading-none md:tracking-[-0.035em]">
            Kind words
          </h2>
        </AnimatedSection>

        {/* Mobile: single card + dot switcher */}
        <div
          className="rounded-[22px] bg-white/5 p-6.5 shadow-[inset_0_0_0_1px_rgba(243,241,255,.1)] md:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="font-display text-[54px] leading-[0.6] font-extrabold text-primary">
            &ldquo;
          </div>
          <p className="mt-2.5 font-round text-[17px] leading-[1.55] text-text text-pretty">
            {QUOTES[activeQuote].quote}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-round text-[13px] font-medium text-text/60">
              {QUOTES[activeQuote].who}
            </span>
            <span className="flex gap-1.5">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setActiveQuote(i)}
                  className={`h-2 rounded-full transition-[width] duration-250 ${
                    i === activeQuote ? "w-5.5 bg-primary" : "w-2 bg-white/25"
                  }`}
                />
              ))}
            </span>
          </div>
        </div>

        {/* Desktop: all 3 side by side */}
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-3.5 rounded-[20px] bg-white/5 p-7 shadow-[inset_0_0_0_1px_rgba(243,241,255,.1)]"
            >
              <div className="font-display text-[54px] leading-[0.6] font-extrabold text-primary">
                &ldquo;
              </div>
              <p className="font-round text-[17px] leading-[1.55] text-text text-pretty">
                {q.quote}
              </p>
              <div className="mt-auto font-round text-[13px] font-medium text-text/60">
                {q.who}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
