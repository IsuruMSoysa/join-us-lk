import { EVENT_WORDS } from "../content";

function MarqueeRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-6 pr-6 md:gap-9 md:pr-9"
      aria-hidden={ariaHidden}
    >
      {EVENT_WORDS.map((word, i) => (
        <span key={i} className="flex items-center gap-6 md:gap-9">
          <span className="whitespace-nowrap">{word}</span>
          <span
            className={`h-2 w-2 shrink-0 rotate-45 md:h-3 md:w-3 ${
              i % 2
                ? "bg-secondary shadow-[0_0_12px_rgba(169,184,232,.8)]"
                : "bg-primary shadow-[0_0_12px_rgba(255,211,90,.8)]"
            }`}
          />
        </span>
      ))}
    </div>
  );
}

export function EventMarquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-primary/35 py-4 md:py-[26px]"
      style={{
        background: "linear-gradient(90deg,#161C48,#1E2660 50%,#161C48)",
      }}
    >
      <div
        className="animate-marquee flex w-max font-display text-2xl font-extrabold tracking-[-0.01em] md:text-[40px]"
        style={{ textShadow: "0 0 18px rgba(169,184,232,.55)" }}
      >
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}
