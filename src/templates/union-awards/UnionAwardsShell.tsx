import { type ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

type UnionAwardsShellProps = {
  children: ReactNode;
  coupleNames: {
    first: string;
    second: string;
  };
};

/** Deterministic PRNG for stable SSR/client star positions (full-screen scatter). */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function GoldParticles() {
  const particles = useMemo(() => {
    const rnd = mulberry32(0x55_41_57_44);
    return Array.from({ length: 58 }, () => ({
      left: 2 + rnd() * 96,
      top: 2 + rnd() * 96,
      driftDelay: (rnd() * 5).toFixed(2),
      driftDuration: (38 + rnd() * 28).toFixed(0),
      twinkleDelay: (rnd() * 5.5).toFixed(2),
      twinkleDuration: (4.8 + rnd() * 4).toFixed(2),
      size: (rnd() > 0.82 ? 2.1 : rnd() > 0.55 ? 1.45 : 1) as number,
      opacity: 0.26 + rnd() * 0.22,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full ua-particle-dot"
          style={{
            left: `${p.left.toFixed(2)}%`,
            top: `${p.top.toFixed(2)}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.driftDelay}s, ${p.twinkleDelay}s`,
            animationDuration: `${p.driftDuration}s, ${p.twinkleDuration}s`,
          }}
        />
      ))}
    </div>
  );
}

function ChronoLines() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.06]"
      aria-hidden
    >
      <defs>
        <linearGradient id="ua-chrono-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0" />
          <stop offset="50%" stopColor="#daa520" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[12, 28, 44, 60, 76].map((x, i) => (
        <line
          key={i}
          x1={`${x}%`}
          y1="0%"
          x2={`${x + 18 + i * 3}%`}
          y2="100%"
          stroke="url(#ua-chrono-line)"
          strokeWidth="0.4"
        />
      ))}
    </svg>
  );
}

function NebulaBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
          x: [0, 16, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        className="absolute -top-44 -right-28 w-[min(92vw,30rem)] h-[min(92vw,30rem)] rounded-full bg-amber-600/[0.07] blur-[100px]"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.06, 1],
          x: [0, -18, 0],
          y: [0, 12, 0],
        }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-32 w-[min(96vw,34rem)] h-[min(96vw,34rem)] rounded-full bg-[#0a0906]/[0.75] blur-[110px]"
      />
      <motion.div
        animate={{
          opacity: [0.05, 0.09, 0.05],
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,26rem)] h-[min(45vh,18rem)] rounded-full bg-[#ffd700]/[0.04] blur-[95px]"
      />
    </div>
  );
}

function UnionAwardsFooter({
  coupleNames,
}: {
  coupleNames: { first: string; second: string };
}) {
  return (
    <footer className="relative z-10 py-14 text-center text-[#8b7355]/80 text-xs sm:text-sm tracking-[0.18em] uppercase font-union-awards">
      <p>
        © {new Date().getFullYear()} {coupleNames.first} · {coupleNames.second}{" "}
        <span className="text-[#5c4d3a]/60">—</span>{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ffb347]/75 hover:text-[#ffd700] transition-colors underline-offset-4 hover:underline"
        >
          JoinUs.lk
        </a>
      </p>
    </footer>
  );
}

export function UnionAwardsShell({
  children,
  coupleNames,
}: UnionAwardsShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-amber-500/25 selection:text-amber-100 bg-[#000000] text-[#d4c4a8] font-union-awards">
      <style>{`
        .ua-gold-display {
          background: linear-gradient(
            165deg,
            #fffef0 0%,
            #ffd700 18%,
            #daa520 38%,
            #ffb347 52%,
            #b8860b 72%,
            #ffd700 88%,
            #fff8dc 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 rgba(255, 248, 220, 0.45))
            drop-shadow(0 -1px 1px rgba(40, 28, 8, 0.85))
            drop-shadow(0 3px 5px rgba(0, 0, 0, 0.65))
            drop-shadow(0 0 20px rgba(255, 215, 0, 0.25));
        }
        .ua-shimmer {
          animation: ua-shimmer 7s ease-in-out infinite;
        }
        @keyframes ua-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .ua-gold-numeral {
          background: linear-gradient(
            160deg,
            #fffef5 0%,
            #ffe566 22%,
            #daa520 48%,
            #c9a227 68%,
            #ffd700 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 rgba(255, 250, 220, 0.5))
            drop-shadow(0 -1px 1px rgba(30, 22, 6, 0.75))
            drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5))
            drop-shadow(0 0 12px rgba(255, 200, 80, 0.35));
        }
        .ua-amber-glow {
          color: #ff8c00;
          text-shadow:
            0 0 18px rgba(255, 140, 0, 0.45),
            0 0 36px rgba(255, 102, 0, 0.2),
            0 1px 0 rgba(255, 200, 120, 0.35);
        }
        .ua-particle-dot {
          background: radial-gradient(
            circle,
            rgba(255, 250, 220, 1) 0%,
            rgba(255, 228, 140, 0.65) 40%,
            rgba(255, 200, 80, 0.28) 58%,
            transparent 74%
          );
          box-shadow:
            0 0 2px 1px rgba(255, 245, 200, 0.7),
            0 0 8px 3px rgba(255, 215, 120, 0.38),
            0 0 16px 5px rgba(255, 190, 70, 0.18);
          filter: drop-shadow(0 0 4px rgba(255, 230, 150, 0.55));
          animation-name: ua-particle-drift, ua-star-twinkle;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
        }
        @keyframes ua-particle-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-12px, 14px, 0); }
        }
        @keyframes ua-star-twinkle {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(255, 238, 190, 0.5));
            box-shadow:
              0 0 2px 1px rgba(255, 245, 215, 0.55),
              0 0 7px 2.5px rgba(255, 215, 120, 0.28),
              0 0 14px 4px rgba(255, 185, 70, 0.12);
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(255, 245, 210, 0.72));
            box-shadow:
              0 0 3px 1.2px rgba(255, 252, 230, 0.75),
              0 0 11px 4px rgba(255, 225, 140, 0.42),
              0 0 22px 7px rgba(255, 195, 90, 0.2);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ua-shimmer { animation: none; background-position: 50% 50%; }
          .ua-particle-dot {
            animation: none !important;
            filter: drop-shadow(0 0 4px rgba(255, 230, 170, 0.55));
            box-shadow:
              0 0 2px 1px rgba(255, 245, 210, 0.55),
              0 0 8px 3px rgba(255, 210, 120, 0.3),
              0 0 14px 5px rgba(255, 185, 80, 0.14);
          }
        }
      `}</style>
      <NebulaBlobs />
      <GoldParticles />
      <ChronoLines />
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-14">
        {children}
      </main>
      <UnionAwardsFooter coupleNames={coupleNames} />
    </div>
  );
}
