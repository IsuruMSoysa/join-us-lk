import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { STEPS } from "../content";

export function JourneySection() {
  return (
    <section id="journey" className="scroll-mt-24 px-4 pb-16 md:px-16 md:pb-26">
      <div className="mx-auto max-w-[1152px]">
        <AnimatedSection>
          <h2 className="mb-5 font-display text-[30px] leading-[1.05] font-extrabold tracking-[-0.03em] md:mb-11 md:text-[52px] md:leading-none md:tracking-[-0.035em]">
            Brief to doors open
          </h2>
        </AnimatedSection>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col gap-5.5 border-l-2 border-secondary/30 pl-5.5 md:hidden">
          {STEPS.map((s) => (
            <div key={s.step} className="relative">
              <span className="absolute top-1 -left-[27px] h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(255,211,90,.6)]" />
              <div className="font-round text-xs font-semibold tracking-[.2em] text-primary">
                {s.step}
              </div>
              <div className="mt-0.5 font-display text-lg font-bold">
                {s.title}
              </div>
              <p className="mt-1 font-round text-sm leading-[1.55] font-light text-text/72">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal line, 3 columns */}
        <div className="relative hidden grid-cols-3 gap-10 md:grid">
          <div className="absolute top-2 right-0 left-2 h-0.5 bg-secondary/30" />
          {STEPS.map((s) => (
            <div key={s.step} className="relative flex flex-col gap-1.5">
              <span className="mb-4.5 h-4 w-4 rounded-full bg-primary shadow-[0_0_14px_3px_rgba(255,211,90,.6)]" />
              <div className="font-round text-xs font-semibold tracking-[.2em] text-primary">
                {s.step}
              </div>
              <div className="font-display text-2xl font-bold">{s.title}</div>
              <p className="max-w-[320px] font-round text-[15px] leading-relaxed font-light text-text/72">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
