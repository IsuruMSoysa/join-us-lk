import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { brand } from "../../../config/brand";

type CtaSectionProps = {
  whatsappHref: string;
  whatsappDisplayNumber: string;
};

export function CtaSection({
  whatsappHref,
  whatsappDisplayNumber,
}: CtaSectionProps) {
  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-16 md:px-16 md:pb-16">
      <AnimatedSection>
        <div
          className="mx-auto max-w-[1152px] rounded-3xl p-8 text-center md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-16 md:text-left"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(255,211,90,.35), rgba(255,211,90,0) 70%), #161C48",
          }}
        >
          <div>
            <div className="font-display text-[30px] leading-[1.05] font-extrabold tracking-[-0.03em] md:text-[56px] md:leading-none">
              Send the pigeon.
            </div>
            <p className="mx-auto mt-2.5 max-w-[520px] font-round text-sm leading-relaxed font-light text-text/78 md:mx-0 md:mt-3.5 md:text-lg">
              Tell us the date, venue and guest count. We&apos;ll take it from
              there, for weddings, galas or anything worth celebrating.
            </p>
          </div>
          <div className="mt-5 flex flex-col items-stretch gap-2.5 md:mt-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center whitespace-nowrap rounded-[14px] bg-accent px-7 font-round text-base font-bold text-[#062B14] hover:opacity-95 transition-opacity"
            >
              WhatsApp {whatsappDisplayNumber}
            </a>
            <span className="hidden text-center font-round text-sm text-text/60 md:block">
              or {brand.supportEmail}
            </span>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
