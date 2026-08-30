import { type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";
import { brand } from "../../config/brand";

/**
 * Emerald Tulip palette — dark emerald with tulip motifs.
 *   Night    #050F0A  page base
 *   Emerald  #1FA971  primary accent, bloom sides, button gradient start
 *   Spring   #5FE3A5  brighter accent
 *   Mint     #8FF0C0  highlights, hairline source colour
 *   Stem     #16402D / #143526 / #1A4A33  deep greens
 *   Snow     #EAF7EF  headings
 *   Body     #DFEEE5  body text on dark
 *   Muted    #A9C9B8  secondary copy
 *   Label    #7FBFA0  uppercase labels
 *   Fine     #88A897 / #6DA28A  fine print
 */

type EmeraldTulipShellProps = {
  children: ReactNode;
  coupleNames: {
    first: string;
    second: string;
  };
  eventDateTime: string;
};

/** Footer stamp: "21.10.2026". Empty string for an unparseable date. */
function formatStampDate(eventDateTime: string): string {
  const date = new Date(eventDateTime);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

/** Three blurred radial "aurora" circles drifting behind everything. */
function Aurora() {
  const circles = [
    {
      size: "62vw",
      style: { top: "-14vh", left: "-6vw" },
      tint: "rgba(31,169,113,.34)",
      blur: 24,
      duration: "26s",
      direction: "normal" as const,
    },
    {
      size: "70vw",
      style: { bottom: "-24vh", right: "-12vw" },
      tint: "rgba(120,222,178,.22)",
      blur: 30,
      duration: "34s",
      direction: "reverse" as const,
    },
    {
      size: "44vw",
      style: { top: "30vh", left: "38vw" },
      tint: "rgba(214,232,222,.12)",
      blur: 26,
      duration: "44s",
      direction: "normal" as const,
    },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {circles.map((circle, i) => (
        <div
          key={i}
          className="et-aurora absolute rounded-full"
          style={{
            ...circle.style,
            width: circle.size,
            height: circle.size,
            background: `radial-gradient(circle, ${circle.tint} 0%, transparent 68%)`,
            filter: `blur(${circle.blur}px)`,
            animationDuration: circle.duration,
            animationDirection: circle.direction,
          }}
        />
      ))}
    </div>
  );
}

/** Five petals falling on staggered negative delays, so none start mid-air empty. */
function FallingPetals() {
  const petals = [
    { left: "12%", w: 8, h: 12, color: "#8ff0c0", opacity: 0.55, duration: "21s", delay: "-3s" },
    { left: "31%", w: 6, h: 9, color: "#d9f5e7", opacity: 0.45, duration: "27s", delay: "-16s" },
    { left: "54%", w: 10, h: 14, color: "#5fe3a5", opacity: 0.5, duration: "17s", delay: "-9s" },
    { left: "73%", w: 7, h: 11, color: "#b9ead2", opacity: 0.6, duration: "24s", delay: "-6s" },
    { left: "89%", w: 9, h: 13, color: "#8ff0c0", opacity: 0.48, duration: "19s", delay: "-13s" },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {petals.map((petal, i) => (
        <span
          key={i}
          className="et-petal absolute"
          style={{
            left: petal.left,
            width: petal.w,
            height: petal.h,
            background: petal.color,
            opacity: petal.opacity,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        />
      ))}
    </div>
  );
}

function EmeraldTulipFooter({
  coupleNames,
  eventDateTime,
}: {
  coupleNames: { first: string; second: string };
  eventDateTime: string;
}) {
  const stamp = formatStampDate(eventDateTime);

  return (
    <footer className="relative z-10 px-[6vw] pt-16 pb-14 md:pt-[76px] md:pb-16">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4">
        <p className="et-display text-2xl font-light italic text-[#8ff0c0]">
          {coupleNames.first} &amp; {coupleNames.second}
          {stamp ? ` · ${stamp}` : ""}
        </p>
        <p className="et-ui text-[10px] uppercase tracking-[0.28em] text-[#6da28a]">
          Made with tulips ·{" "}
          <a
            href="/"
            className="transition-colors hover:text-[#8ff0c0]"
          >
            {brand.displayName}
          </a>
        </p>
      </div>
    </footer>
  );
}

export function EmeraldTulipShell({
  children,
  coupleNames,
  eventDateTime,
}: EmeraldTulipShellProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050f0a] text-[#dfeee5] font-emerald-tulip selection:bg-[#1fa971]/30 selection:text-[#eaf7ef]">
      <style>{`
        .et-display { font-family: var(--font-emerald-tulip); }
        .et-ui { font-family: var(--font-emerald-tulip-ui); }

        .et-label {
          font-family: var(--font-emerald-tulip-ui);
          color: #7fbfa0;
          text-transform: uppercase;
        }

        /* Two names sharing one shimmering gradient; the second runs it in reverse. */
        .et-name {
          background: linear-gradient(
            100deg,
            #eaf7ef 0%,
            #5fe3a5 26%,
            #eaf7ef 52%,
            #5fe3a5 78%,
            #eaf7ef 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: et-shimmer 9s linear infinite;
        }
        .et-name-reverse { animation-direction: reverse; }
        @keyframes et-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .et-and { animation: et-pulse 5s ease-in-out infinite; }
        @keyframes et-pulse {
          0%, 100% { text-shadow: 0 0 22px rgba(95, 227, 165, 0.25); }
          50%      { text-shadow: 0 0 40px rgba(95, 227, 165, 0.6); }
        }

        .et-glow { animation: et-glow 2s ease-in-out infinite; }
        @keyframes et-glow {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.9; }
        }

        .et-tulip {
          transform-origin: 50% 100%;
          animation-name: et-sway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes et-sway {
          0%, 100% { transform: rotate(-2deg); }
          50%      { transform: rotate(2deg); }
        }

        .et-aurora {
          animation-name: et-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes et-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(4vw, 5vh, 0) scale(1.08); }
        }

        .et-petal {
          top: -6%;
          border-radius: 60% 40% 55% 45% / 70% 70% 30% 30%;
          animation-name: et-petal-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes et-petal-fall {
          0%   { transform: translate3d(0, -10vh, 0) rotate(0deg); }
          50%  { transform: translate3d(-26px, 52vh, 0) rotate(180deg); }
          100% { transform: translate3d(18px, 112vh, 0) rotate(360deg); }
        }

        .et-rise { animation: et-rise 0.7s ease-out both; }
        @keyframes et-rise {
          from { opacity: 0; transform: translateY(34px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .et-wipe { animation: et-wipe 1.3s ease-out both; transform-origin: center; }
        @keyframes et-wipe {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .et-input::placeholder { color: #4f7a68; }

        @media (prefers-reduced-motion: reduce) {
          .et-name,
          .et-and,
          .et-glow,
          .et-tulip,
          .et-aurora,
          .et-petal,
          .et-rise,
          .et-wipe {
            animation: none !important;
          }
          .et-petal { display: none; }
          .et-rise, .et-wipe { opacity: 1; transform: none; }
        }
      `}</style>

      {/* Ambient layers are skipped entirely — not just paused — when motion is reduced. */}
      {reducedMotion ? null : (
        <>
          <Aurora />
          <FallingPetals />
        </>
      )}

      {/* Gutter on the outside, cap on the inside — so the 1240px content width
          survives on wide screens instead of being eaten by the 6vw padding. */}
      <main className="relative z-10 px-[6vw]">
        <div className="mx-auto max-w-[1240px]">{children}</div>
      </main>

      <EmeraldTulipFooter
        coupleNames={coupleNames}
        eventDateTime={eventDateTime}
      />
    </div>
  );
}
