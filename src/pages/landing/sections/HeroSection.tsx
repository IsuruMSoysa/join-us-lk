import { MessageCircle } from "lucide-react";

type HeroSectionProps = {
  whatsappHref: string;
  whatsappDisplayNumber: string;
};

export function HeroSection({
  whatsappHref,
  whatsappDisplayNumber,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-6 pb-16 md:px-16 md:pt-8 md:pb-22">
      <div className="mx-auto grid max-w-[1152px] items-center gap-8 text-center md:grid-cols-[1.15fr_1fr] md:gap-12 md:text-left">
        <div>
          <div className="relative mx-auto flex h-[170px] w-[170px] items-center justify-center md:hidden">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,211,90,.45), rgba(112,131,174,.18) 55%, transparent 72%)",
              }}
              aria-hidden
            />
            <img
              src="/images/joinus-pigeon.png"
              alt=""
              className="relative h-[130px] w-[130px] object-contain"
            />
          </div>

          <p className="mt-2 font-round text-xs font-semibold tracking-[.28em] text-primary uppercase md:mt-0 md:text-[12px] md:tracking-[.3em]">
            Invites that glow
          </p>
          <h1 className="mt-3.5 font-display text-[46px] leading-[1] font-extrabold tracking-[-0.04em] text-balance md:mt-5 md:text-[88px] md:leading-[0.96] md:tracking-[-0.045em]">
            Every guest,{" "}
            <span className="text-secondary">on the list.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] font-round text-base leading-relaxed font-light text-text/78 md:mx-0 md:mt-6 md:text-lg">
            Invitation websites with personal guest links, live RSVPs and a
            host dashboard, for couples, planners and venues across Sri
            Lanka.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 md:mt-9 md:flex-row md:items-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[14px] bg-accent px-7 font-round text-base font-bold text-[#062B14] hover:opacity-95 transition-opacity"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Chat on WhatsApp
            </a>
            <a
              href="#templates"
              className="hidden min-h-14 items-center justify-center rounded-[14px] px-7 font-round text-base font-medium shadow-[inset_0_0_0_1px_rgba(169,184,232,.5)] hover:bg-white/5 transition-colors md:inline-flex"
            >
              See templates
            </a>
          </div>
          <p className="mt-2.5 font-round text-[13px] text-text/55 md:mt-3.5 md:text-left">
            {whatsappDisplayNumber} · replies within the hour
          </p>
        </div>

        <div className="relative hidden h-[460px] items-center justify-center md:flex">
          <div
            className="absolute h-[460px] w-[460px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,211,90,.42), rgba(112,131,174,.2) 52%, transparent 72%)",
            }}
            aria-hidden
          />
          <div
            className="absolute h-[380px] w-[380px] rounded-full shadow-[inset_0_0_0_1px_rgba(169,184,232,.25)]"
            aria-hidden
          />
          <div
            className="absolute h-[300px] w-[300px] rounded-full shadow-[inset_0_0_0_1px_rgba(255,211,90,.2)]"
            aria-hidden
          />
          <img
            src="/images/joinus-pigeon.png"
            alt=""
            className="relative h-[300px] w-[300px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
