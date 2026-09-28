import { type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";
import { JoinUsBadge } from "../../components/shared/JoinUsBadge";
import { Garlands } from "./Garlands";
// import { FallingLeaves } from "./FallingLeaves"; // swapped for flying butterflies; kept for easy revert
import { FlyingButterfly } from "../../components/decor/FlyingButterfly";

/**
 * Olive Garden palette — cream and gold, olive-leaf motifs.
 *   Cream    #F4EBDF  page background
 *   Card     #fbf8ee  card surfaces
 *   Tile     #efe9d7  tile surfaces
 *   Border   #e3ddc7  hairline borders
 *   Rule     #d9d6bb  divider lines
 *   Olive    #2f3517 / #3b4519 / #4a5a22 / #556b2f / #6b7a3a — dark to mid
 *   Olive    #869347 / #9ea65e / #b7bc82 / #c8cc9c — light
 *   Text     #3d4224  headings; #555a38 / #5d6240  body
 *   Gold     #85641b (text) · #c9a24a #d6b468 #e2c47e (light)
 *   Heart    #a0443a
 */

type OliveGardenShellProps = {
  children: ReactNode;
  coupleNames: { first: string; second: string };
  eventDateTime: string;
  fallingLeaves: boolean;
};

/** Footer stamp: "20 · 11 · 2026". Empty string for an unparseable date. */
function formatStampDate(eventDateTime: string): string {
  const date = new Date(eventDateTime);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getDate())} · ${pad(date.getMonth() + 1)} · ${date.getFullYear()}`;
}

function OliveGardenFooter({
  coupleNames,
  eventDateTime,
}: {
  coupleNames: { first: string; second: string };
  eventDateTime: string;
}) {
  const stamp = formatStampDate(eventDateTime);

  return (
    <footer className="relative z-10 px-[6vw] pb-14 pt-16 md:pb-16 md:pt-[76px]">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-4 text-center">
        <p className="og-serif text-2xl font-light italic text-[#85641b]">
          {coupleNames.first} <span className="text-[#556b2f]">&</span> {coupleNames.second}
        </p>
        <p className="og-ui text-[11px] uppercase tracking-[0.28em] text-[#5d6240]">
          {stamp}
        </p>
        <JoinUsBadge className="mt-2" />
      </div>
    </footer>
  );
}

export function OliveGardenShell({
  children,
  coupleNames,
  eventDateTime,
  fallingLeaves,
}: OliveGardenShellProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4EBDF] font-olive-garden-ui text-[#555a38] selection:bg-[#4a5a22]/20 selection:text-[#3d4224]">
      <style>{`
        .og-serif { font-family: var(--font-olive-garden); }
        .og-ui { font-family: var(--font-olive-garden-ui); }
        .og-label { font-family: var(--font-olive-garden-label); }

        .og-page-glow {
          background: radial-gradient(ellipse 60% 40% at 50% 0%, #fbf8ee 0%, transparent 70%);
        }

        .og-name {
          background: linear-gradient(
            100deg,
            #85641b 0%,
            #c9a24a 25%,
            #9a7424 50%,
            #d6b468 75%,
            #85641b 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: og-shimmer 12s linear infinite;
        }
        .og-name-reverse { animation-direction: reverse; }
        @keyframes og-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .og-rise { animation: og-rise 0.8s ease-out both; }
        @keyframes og-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .og-wipe { animation: og-wipe 1s ease-out both; transform-origin: center; }
        @keyframes og-wipe {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .og-vine, .og-corner-cluster {
          animation-name: og-sway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        /* Vines sway from their top attachment point (they're 1px wide, so
           center vs. left edge makes no visible difference). */
        .og-vine { transform-origin: 50% 0%; }
        /* The corner cluster's leaves each fan out from the literal corner
           (top-left) of their own box, so the cluster must swing from that
           same point — center-top would swing it around the wrong pivot and
           look like a jump/snap instead of a gentle sway. */
        .og-corner-cluster { transform-origin: 0% 0%; }
        @keyframes og-sway {
          0%, 100% { transform: rotate(-1.4deg); }
          50%      { transform: rotate(1.4deg); }
        }

        .og-falling-leaf {
          animation-name: og-leaf-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes og-leaf-fall {
          0%   { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate3d(24px, 118vh, 0) rotate(300deg); opacity: 0; }
        }

        .og-shimmer-pill {
          background: linear-gradient(100deg, #a07c28, #e2c47e 35%, #b08a2e 65%, #f0d894);
          background-size: 200% auto;
          animation: og-pill-shimmer 6s linear infinite;
        }
        @keyframes og-pill-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .og-breathe { animation: og-breathe 2s ease-in-out infinite; }
        @keyframes og-breathe {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .og-name,
          .og-vine,
          .og-corner-cluster,
          .og-falling-leaf,
          .og-shimmer-pill,
          .og-breathe,
          .og-rise,
          .og-wipe {
            animation: none !important;
          }
          .og-rise, .og-wipe { opacity: 1; transform: none; }
        }
      `}</style>

      <div className="og-page-glow fixed inset-0 z-0 pointer-events-none" aria-hidden />

      {/* Structural garlands stay even under reduced motion (just static);
          the optional falling-leaves layer is skipped outright. */}
      <Garlands />
      {/* Falling leaves — swapped for flying butterflies below; kept for easy revert.
      {!reducedMotion && fallingLeaves ? <FallingLeaves /> : null} */}
      {!reducedMotion && fallingLeaves ? (
        <>
          <FlyingButterfly index={0} size={14} color="#556b2f" />
          <FlyingButterfly index={1} size={10} color="#85641b" delay={0.5} />
          <FlyingButterfly index={2} size={16} color="#c9a24a" delay={1} isForeground />
          <FlyingButterfly index={3} size={11} color="#6b7a3a" delay={1.5} isForeground />
        </>
      ) : null}

      {/* Gutter clears the side garlands; cap keeps the 1080px column centred. */}
      <main
        className="relative z-10"
        style={{ paddingLeft: "calc(min(12vw,130px) + 18px)", paddingRight: "calc(min(12vw,130px) + 18px)" }}
      >
        <div className="mx-auto max-w-[1080px]">{children}</div>
      </main>

      <OliveGardenFooter coupleNames={coupleNames} eventDateTime={eventDateTime} />
    </div>
  );
}
