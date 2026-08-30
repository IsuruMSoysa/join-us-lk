import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { CountdownTimer } from "../../../components/shared/CountdownTimer";
import { type EventContent } from "../../../types/template";
import { Tulip } from "../Tulip";

type EmeraldTulipHeroProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
};

/** "21 · 10 · 2026" for the top-left meta stamp. */
function formatMetaDate(eventDateTime: string): string {
  const date = new Date(eventDateTime);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getDate())} · ${pad(date.getMonth() + 1)} · ${date.getFullYear()}`;
}

/** The four hero tulips: height, sway duration and entrance stagger. */
const HERO_TULIPS = [
  { height: 136, swayDuration: 7, swayDelay: 0 },
  { height: 186, swayDuration: 11, swayDelay: 0.6 },
  { height: 112, swayDuration: 8.5, swayDelay: 1.2 },
  { height: 158, swayDuration: 9.5, swayDelay: 0.3 },
];

export function EmeraldTulipHero({
  inviteeName,
  personalized,
  validInvite,
  content,
}: EmeraldTulipHeroProps) {
  const metaDate = formatMetaDate(content.eventDateTime);

  return (
    <section className="relative pt-8">
      {/* 1. Top meta bar */}
      {/* <AnimatedSection delay={0}>
        <div className="et-label flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.3em]">
          <span className="font-medium">{metaDate}</span>
          <span>
            {content.venueName}
            {content.venueAddress ? ` · ${content.venueAddress}` : ""}
          </span>
        </div>
      </AnimatedSection> */}

      {/* 2. Hero */}
      <div className="pt-[min(12vh,110px)] pb-[min(9vh,80px)] text-center">
        <AnimatedSection delay={0.1}>
          <p className="et-label text-[11px] tracking-[0.4em]">
            {content.heroGreeting}
          </p>
        </AnimatedSection>

        {personalized && validInvite && inviteeName ? (
          <AnimatedSection delay={0.15}>
            <p className="et-display mt-6 text-2xl font-light italic text-[#8ff0c0] sm:text-3xl">
              {inviteeName}
            </p>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.18}>
          {/* clamp() plus a per-character ceiling: long names (e.g. "Madhushanka")
              would otherwise blow through the 6vw gutter on a narrow phone. */}
          <h1
            className="et-display et-name mt-8 font-light leading-[0.86] tracking-[-0.02em]"
            style={{
              fontSize: `min(clamp(58px, 12vw, 168px), ${Math.round(
                1800 / Math.max(content.names.first.length, 6),
              )}px, 22vw)`,
            }}
          >
            {content.names.first}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex items-center justify-center gap-5 py-2">
            <span className="et-wipe h-px w-[min(18vw,140px)] bg-gradient-to-l from-[#8ff0c0]/70 to-transparent" />
            <span className="et-display et-and text-[clamp(30px,5vw,60px)] font-light italic text-[#8ff0c0]">
              and
            </span>
            <span className="et-wipe h-px w-[min(18vw,140px)] bg-gradient-to-r from-[#8ff0c0]/70 to-transparent" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.38}>
          <h1
            className="et-display et-name et-name-reverse font-light leading-[0.86] tracking-[-0.02em]"
            style={{
              fontSize: `min(clamp(58px, 12vw, 168px), ${Math.round(
                1800 / Math.max(content.names.second.length, 6),
              )}px, 22vw)`,
            }}
          >
            {content.names.second}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <p className="et-ui mx-auto mt-9 max-w-[40ch] text-[clamp(16px,1.5vw,19px)] font-light leading-[1.75] text-[#a9c9b8]">
            {content.tagline}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#rsvp"
              className="et-ui rounded-full bg-gradient-to-r from-[#1fa971] to-[#5fe3a5] px-[34px] py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#04140d] shadow-[0_12px_40px_rgba(31,169,113,0.4)] transition-all hover:-translate-y-[3px] hover:shadow-[0_18px_54px_rgba(95,227,165,0.55)]"
            >
              {content.rsvpTitle} →
            </a>
            <a
              href="#details"
              className="et-ui rounded-full border border-[#8ff0c0]/35 bg-white/[0.03] px-[34px] py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#dfeee5] transition-all hover:-translate-y-[3px] hover:border-[#8ff0c0] hover:bg-[#8ff0c0]/10"
            >
              {content.detailsTitle}
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
          <div
            className="mt-14 flex items-end justify-center gap-[min(4vw,40px)]"
            style={{ filter: "drop-shadow(0 0 26px rgba(31,169,113,0.45))" }}
          >
            {/* Keyed wrapper: this repo ships no @types/react, so `key` is not
                accepted directly on a plain function component. */}
            {HERO_TULIPS.map((tulip, i) => (
              <span key={i} className="flex items-end">
                <Tulip
                  height={tulip.height}
                  swayDuration={tulip.swayDuration}
                  swayDelay={tulip.swayDelay}
                />
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* 3. Countdown band */}
      <AnimatedSection delay={0.2}>
        <div className="flex flex-wrap items-center justify-between gap-9 rounded-[26px] border border-[#8ff0c0]/[0.16] bg-gradient-to-br from-[#1fa971]/[0.16] to-[#050f0a]/50 px-[clamp(24px,4vw,52px)] py-[clamp(30px,4vw,52px)] backdrop-blur-[10px]">
          <div className="min-w-0">
            {/* Fixed chrome — EventContent has no field for this eyebrow, and
                adding one would mean a schema + admin-form change for every
                template. The line beside it (heroInvite) is editable. */}
            <p className="et-label text-[11px] tracking-[0.34em]">
              Counting down
            </p>
            <p className="et-display mt-3 max-w-[24ch] text-[clamp(26px,3.4vw,42px)] font-light italic leading-[1.15] text-[#eaf7ef]">
              {content.heroInvite}
            </p>
          </div>
          <div className="min-w-0 grow">
            <CountdownTimer
              eventDateTime={content.eventDateTime}
              variant="tulip"
            />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
