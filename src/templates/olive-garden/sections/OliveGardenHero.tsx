import { useMemo } from "react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { CountdownTimer } from "../../../components/shared/CountdownTimer";
import { type EventContent } from "../../../types/template";
import { getGoogleCalendarUrl } from "../../../utils/event";

type OliveGardenHeroProps = {
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
};

const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** The 7 calendar days (Mon–Sun) of the event's week. */
function getEventWeek(eventDateTime: string): Date[] {
  const event = new Date(eventDateTime);
  const day = event.getDay(); // 0 = Sun … 6 = Sat
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(event);
  monday.setDate(event.getDate() + mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Countdown/ceremony target: the event's date combined with poruwaTime (HH:mm), when parseable. */
function getCountdownTarget(content: EventContent): string {
  const datePart = content.eventDateTime.slice(0, 10);
  const time = content.poruwaTime ?? "";
  const isHhMm = /^\d{1,2}:\d{2}$/.test(time.trim());
  return isHhMm ? `${datePart}T${time.trim()}:00` : content.eventDateTime;
}

export function OliveGardenHero({
  inviteeName,
  personalized,
  validInvite,
  content,
}: OliveGardenHeroProps) {
  const event = new Date(content.eventDateTime);
  const weekDays = useMemo(() => getEventWeek(content.eventDateTime), [content.eventDateTime]);
  const monthYearLabel = Number.isNaN(event.getTime())
    ? ""
    : event.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
  const showCountdown = content.showCountdown ?? true;
  const countdownTarget = getCountdownTarget(content);

  const timeLine = [content.eventTime, content.poruwaTime ? `Poruwa at ${content.poruwaTime}` : ""]
    .filter(Boolean)
    .join("  ·  ");
  const venueLine = content.venueName
    ? `${content.venueName}${content.venueAddress ? `, ${content.venueAddress}` : ""}`
    : "";

  return (
    <section className="relative pt-8 text-center">
      <div className="pb-[min(9vh,80px)] pt-[min(12vh,110px)]">
        <AnimatedSection delay={0}>
          <div
            className="mx-auto overflow-hidden rounded-full border-4 border-[#c9a24a] shadow-[0_24px_60px_rgba(59,69,25,0.22)]"
            style={{ width: "clamp(96px, 22vw, 168px)", height: "clamp(96px, 22vw, 168px)" }}
          >
            <img
              src="/images/couple.webp"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="og-label mt-6 text-[12px] uppercase tracking-[0.34em] text-[#6b7a3a]">
            {content.heroGreeting}
          </p>
        </AnimatedSection>

        {personalized && validInvite && inviteeName ? (
          <AnimatedSection delay={0.15}>
            <p className="og-serif mt-6 text-2xl font-light italic text-[#85641b] sm:text-3xl">
              {inviteeName}
            </p>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.2}>
          <h1
            className="og-serif og-name mt-6 font-light leading-[0.9] tracking-[-0.01em]"
            style={{ fontSize: "clamp(64px, 12vw, 156px)" }}
          >
            {content.names.first}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="flex items-center justify-center gap-5 py-2">
            <span className="og-wipe h-px w-[min(18vw,140px)] bg-gradient-to-l from-[#556b2f]/60 to-transparent" />
            <span className="og-serif text-[clamp(30px,5vw,60px)] font-light italic text-[#556b2f]">
              &amp;
            </span>
            <span className="og-wipe h-px w-[min(18vw,140px)] bg-gradient-to-r from-[#556b2f]/60 to-transparent" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.45}>
          <h1
            className="og-serif og-name og-name-reverse font-light leading-[0.9] tracking-[-0.01em]"
            style={{ fontSize: "clamp(64px, 12vw, 156px)" }}
          >
            {content.names.second}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.55}>
          <p className="og-ui mx-auto mt-8 max-w-[36ch] text-[clamp(16px,1.5vw,19px)] font-light leading-[1.75] text-[#555a38]">
            {content.tagline}
          </p>
        </AnimatedSection>

        {/* Week-strip date */}
        <AnimatedSection delay={0.65}>
          <div className="mx-auto mt-12 max-w-[480px]">
            <p className="og-label text-[12px] uppercase tracking-[0.34em] text-[#85641b]">
              {monthYearLabel}
            </p>
            {/* No column dividers or fixed-size boxes: those clash on narrow
                screens (a box wider than its column overlaps the divider
                lines). A same-size circle behind just the event day scales
                cleanly at any width instead. */}
            <div className="mt-5 flex items-start justify-between border-y border-[#d9d6bb] py-4">
              {weekDays.map((day, i) => {
                const isEventDay = isSameDay(day, event);
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <span className="og-label text-[9px] text-[#9ea65e] sm:text-[10px]">
                      {WEEKDAY_LABELS[i]}
                    </span>
                    <span
                      className={`og-serif flex h-9 w-9 items-center justify-center rounded-full text-[17px] font-normal leading-none sm:h-10 sm:w-10 sm:text-[19px] ${
                        isEventDay ? "bg-[#4a5a22] text-[#f6f1e4]" : "text-[#a4ad72]"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
            {timeLine || venueLine ? (
              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                {timeLine ? (
                  <p
                    className="og-ui font-semibold text-[#4a5a22]"
                    style={{ fontSize: "clamp(20px, 4.5vw, 30px)" }}
                  >
                    {timeLine}
                  </p>
                ) : null}
                {venueLine ? (
                  <p
                    className="og-serif font-medium text-[#85641b]"
                    style={{ fontSize: "clamp(24px, 5.5vw, 38px)" }}
                  >
                    {venueLine}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.75}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#rsvp"
              className="og-ui rounded-full bg-[#4a5a22] px-[34px] py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#f6f1e4] shadow-[0_12px_30px_rgba(74,90,34,0.25)] transition-all hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(74,90,34,0.35)]"
            >
              RSVP with love →
            </a>
            <a
              href={getGoogleCalendarUrl(content)}
              target="_blank"
              rel="noopener noreferrer"
              className="og-ui rounded-full border border-[#b7bc82] bg-transparent px-[34px] py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#3d4224] transition-all hover:-translate-y-[3px] hover:bg-[#4a5a22]/10"
            >
              Add to calendar
            </a>
          </div>
        </AnimatedSection>
      </div>

      {showCountdown ? (
        <AnimatedSection delay={0.2}>
          <div className="relative overflow-hidden rounded-[26px] bg-[#3b4519] px-[clamp(24px,4vw,52px)] py-[clamp(30px,4vw,52px)] text-left shadow-[0_24px_60px_rgba(59,69,25,0.22)]">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(214,180,104,.25), transparent 70%)" }}
              aria-hidden
            />
            <p className="og-label relative text-[11px] uppercase tracking-[0.34em] text-[#d6b468]">
              Not that we're counting…
            </p>
            <p className="og-serif relative mt-3 max-w-[28ch] text-[clamp(24px,3.2vw,36px)] font-light italic leading-[1.2] text-[#f6f1e4]">
              {content.heroInvite}
            </p>
            <div className="relative mt-8">
              <CountdownTimer eventDateTime={countdownTarget} variant="olive" />
            </div>
          </div>
        </AnimatedSection>
      ) : null}
    </section>
  );
}
