import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { FEATURES } from "../content";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 px-4 pb-16 md:px-16 md:pb-26">
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-5 flex flex-col items-end justify-between gap-4 md:flex-row md:gap-10">
          <AnimatedSection>
            <h2 className="font-display text-[30px] leading-[1.05] font-extrabold tracking-[-0.03em] md:text-[52px] md:leading-none md:tracking-[-0.035em]">
              What lights up
            </h2>
          </AnimatedSection>
          <p className="hidden max-w-[380px] text-right font-round text-base leading-relaxed font-light text-text/65 md:block">
            Everything your guests need, without the spreadsheet chaos.
          </p>
        </div>

        {/* Mobile: list */}
        <div className="md:hidden">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 border-t border-white/10 py-[18px] first:border-t-0"
            >
              <span
                className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${f.dotClassName}`}
              />
              <div>
                <div className="font-display text-lg font-bold">{f.title}</div>
                <p className="mt-1 font-round text-sm leading-[1.55] font-light text-text/72">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: card grid */}
        <div className="hidden gap-5 md:grid md:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex min-h-[240px] flex-col gap-3.5 rounded-[20px] bg-white/4 p-7 shadow-[inset_0_0_0_1px_rgba(243,241,255,.08)]"
            >
              <span className={`h-3.5 w-3.5 rounded-full ${f.dotClassName}`} />
              <div className="mt-auto font-display text-xl leading-[1.15] font-bold">
                {f.title}
              </div>
              <p className="font-round text-[15px] leading-relaxed font-light text-text/72">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
