import { useState } from "react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { templateRegistry } from "../../../templates/registry";
import {
  LANDING_TEMPLATE_SLUGS,
  TEMPLATE_BLURBS,
  TEMPLATE_SHORT_LABELS,
} from "../content";

const TEMPLATES = LANDING_TEMPLATE_SLUGS.map((slug) => ({
  slug,
  name: templateRegistry[slug].name,
  short: TEMPLATE_SHORT_LABELS[slug],
  blurb: TEMPLATE_BLURBS[slug],
}));

function PreviewPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[repeating-linear-gradient(135deg,#252D5E_0_12px,#20285A_12px_24px)] font-mono text-[11px] text-text/50 ${className ?? ""}`}
    >
      template preview
    </div>
  );
}

export function TemplatesSection() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const current = TEMPLATES[activeTemplate];

  return (
    <section id="templates" className="scroll-mt-24 px-4 pb-16 md:px-16 md:pb-26">
      <div className="mx-auto max-w-[1152px]">
        {/* Mobile */}
        <div className="md:hidden">
          <AnimatedSection>
            <h2 className="mb-4 font-display text-[30px] leading-[1.05] font-extrabold tracking-[-0.03em]">
              Templates
            </h2>
          </AnimatedSection>
          <div className="mb-3.5 flex gap-1.5 rounded-full bg-white/6 p-1.5">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => setActiveTemplate(i)}
                className={`min-h-11 flex-1 rounded-full font-round text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                  i === activeTemplate
                    ? "bg-primary text-[#0E1330]"
                    : "text-text/75"
                }`}
              >
                {t.short}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-[22px] bg-panel-2 shadow-[0_0_0_1px_rgba(169,184,232,.25),0_0_50px_-12px_rgba(112,131,174,.8)]">
            <PreviewPlaceholder className="h-95" />
            <div className="flex items-center justify-between gap-3 px-5 py-4.5">
              <div>
                <div className="font-display text-lg font-bold">
                  {current.name}
                </div>
                <p className="mt-1 font-round text-[13px] leading-normal font-light text-text/70">
                  {current.blurb}
                </p>
              </div>
              <span className="min-h-11 shrink-0 rounded-full px-4 font-round text-[13px] font-semibold text-primary shadow-[inset_0_0_0_1px_var(--color-primary)] inline-flex items-center">
                Preview
              </span>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-[320px_1fr] md:items-center md:gap-12">
          <div>
            <AnimatedSection>
              <h2 className="mb-3 font-display text-[52px] leading-none font-extrabold tracking-[-0.035em]">
                Templates
              </h2>
            </AnimatedSection>
            <p className="mb-7 font-round text-base leading-relaxed font-light text-text/70">
              Pick a look. We tailor it to your event.
            </p>
            <div className="flex flex-col gap-2">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setActiveTemplate(i)}
                  className={`rounded-2xl px-5 py-4.5 text-left transition-colors duration-200 ${
                    i === activeTemplate
                      ? "bg-primary/8 shadow-[inset_0_0_0_1px_rgba(255,211,90,.55)]"
                      : "shadow-[inset_0_0_0_1px_rgba(243,241,255,.08)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === activeTemplate
                          ? "bg-primary shadow-[0_0_12px_2px_rgba(255,211,90,.6)]"
                          : "bg-text/30"
                      }`}
                    />
                    <span className="font-display text-lg font-bold">
                      {t.name}
                    </span>
                  </div>
                  <p className="mt-1.5 ml-5.5 font-round text-sm leading-normal font-light text-text/70">
                    {t.blurb}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-panel-2 shadow-[0_0_0_1px_rgba(169,184,232,.25),0_0_80px_-16px_rgba(112,131,174,.8)]">
            <div className="flex h-10 items-center gap-1.75 bg-panel px-4.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3.5 font-round text-xs text-text/50">
                joinus.lk/{current.slug}
              </span>
            </div>
            <PreviewPlaceholder className="h-115 text-xs" />
          </div>
        </div>
      </div>
    </section>
  );
}
