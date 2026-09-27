import { useEffect, useState } from "react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { getPublishedFeaturedTemplates } from "../../../lib/firestore/featuredTemplates";
import { type FeaturedTemplateWithId } from "../../../types/featuredTemplate";

// Shows the real, live invite scaled down to fit the preview frame, by
// rendering it oversized in an iframe and scaling it back down with CSS —
// there's no screenshot/thumbnail pipeline, so this is the actual site.
function LivePreview({ href, className }: { href: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[repeating-linear-gradient(135deg,#252D5E_0_12px,#20285A_12px_24px)] ${className ?? ""}`}
    >
      <iframe
        key={href}
        src={href}
        title="Live template preview"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms"
        className="pointer-events-none absolute top-0 left-0 h-[286%] w-[286%] origin-top-left scale-[0.35] border-0"
      />
    </div>
  );
}

export function TemplatesSection() {
  const [templates, setTemplates] = useState<FeaturedTemplateWithId[] | null>(null);
  const [activeTemplate, setActiveTemplate] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getPublishedFeaturedTemplates()
      .then((items) => {
        if (!cancelled) setTemplates(items);
      })
      .catch(() => {
        if (!cancelled) setTemplates([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (templates === null) {
    return (
      <section id="templates" className="scroll-mt-24 px-4 pb-16 md:px-16 md:pb-26">
        <div className="mx-auto max-w-[1152px] h-95 rounded-[22px] bg-white/5 animate-pulse" />
      </section>
    );
  }

  if (templates.length === 0) {
    return null;
  }

  const current = templates[Math.min(activeTemplate, templates.length - 1)];
  const previewHref = `/${current.siteSlug}/${current.sampleInviteeSlug}`;

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
            {templates.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTemplate(i)}
                className={`min-h-11 flex-1 rounded-full font-round text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                  i === activeTemplate
                    ? "bg-primary text-[#0E1330]"
                    : "text-text/75"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-[22px] bg-panel-2 shadow-[0_0_0_1px_rgba(169,184,232,.25),0_0_50px_-12px_rgba(112,131,174,.8)]">
            <a href={previewHref} target="_blank" rel="noreferrer">
              <LivePreview href={previewHref} className="h-95" />
            </a>
            <div className="flex items-center justify-between gap-3 px-5 py-4.5">
              <div>
                <div className="font-display text-lg font-bold">
                  {current.label}
                </div>
                <p className="mt-1 font-round text-[13px] leading-normal font-light text-text/70">
                  {current.blurb}
                </p>
              </div>
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="min-h-11 shrink-0 rounded-full px-4 font-round text-[13px] font-semibold text-primary shadow-[inset_0_0_0_1px_var(--color-primary)] inline-flex items-center"
              >
                Preview
              </a>
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
              {templates.map((t, i) => (
                <button
                  key={t.id}
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
                      {t.label}
                    </span>
                  </div>
                  <p className="mt-1.5 ml-5.5 font-round text-sm leading-normal font-light text-text/70">
                    {t.blurb}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <a
            href={previewHref}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-3xl bg-panel-2 shadow-[0_0_0_1px_rgba(169,184,232,.25),0_0_80px_-16px_rgba(112,131,174,.8)]"
          >
            <div className="flex h-10 items-center gap-1.75 bg-panel px-4.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3.5 font-round text-xs text-text/50">
                joinus.lk{previewHref}
              </span>
            </div>
            <LivePreview href={previewHref} className="h-115" />
          </a>
        </div>
      </div>
    </section>
  );
}
