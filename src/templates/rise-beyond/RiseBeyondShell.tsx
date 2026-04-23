import { type ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

type RiseBeyondShellProps = {
  children: ReactNode;
  coupleNames: {
    first: string;
    second: string;
  };
};

function Starfield() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.15]"
      aria-hidden
    >
      <div
        className="absolute inset-0 animate-rise-star-drift"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at center, rgba(255,255,255,0.9) 50%, transparent 51%)",
          backgroundSize: "120px 120px",
        }}
      />
      <div
        className="absolute inset-0 opacity-60 animate-rise-star-drift-reverse"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at center, rgba(147,197,253,0.7) 50%, transparent 51%)",
          backgroundSize: "80px 80px",
          backgroundPosition: "40px 60px",
        }}
      />
    </div>
  );
}

function TwinkleStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => ({
        left: ((i * 37 + 11) % 100) + (i % 5) * 0.4,
        top: ((i * 53 + 7) % 100) + ((i * 17) % 6) * 0.3,
        delay: ((i * 0.17) % 4.5).toFixed(2),
        duration: (2.1 + (i % 6) * 0.45).toFixed(2),
        size: (i % 4 === 0 ? 2.25 : i % 3 === 0 ? 1.75 : 1) as number,
      })),
    [],
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden
    >
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white rise-twinkle-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

type MeteorGlowDef = {
  topPct: number;
  leftPct: number;
  /** CSS `rotate(deg)` (clockwise positive). Negative ≈ trail aimed map-northeast (+x, −y). Motion follows this axis. */
  trailDeg: number;
  w: number;
  h: number;
  /** Distance along trail in px (smaller → more “behind” along trail, larger → ahead). */
  pathStart: number;
  pathEnd: number;
  opacity: [number, number, number];
  duration: number;
  repeatDelay: number;
  delay: number;
};

/** Unit direction for local +X after `rotate(trailDeg)`; screen +x right, +y down (e.g. −35° → toward northeast). */
function trailUnit(trailDeg: number) {
  const r = (trailDeg * Math.PI) / 180;
  return { vx: Math.cos(r), vy: Math.sin(r) };
}

function AmbientMeteorGlows() {
  const meteors = useMemo<MeteorGlowDef[]>(
    () => [
      {
        topPct: 6,
        leftPct: -8,
        trailDeg: -38,
        w: 260,
        h: 14,
        pathStart: -220,
        pathEnd: 520,
        opacity: [0, 0.5, 0],
        duration: 3.4,
        repeatDelay: 2.2,
        delay: 0,
      },
      {
        topPct: 14,
        leftPct: 18,
        trailDeg: -36,
        w: 220,
        h: 12,
        pathStart: -180,
        pathEnd: 460,
        opacity: [0, 0.42, 0],
        duration: 3.8,
        repeatDelay: 1.8,
        delay: 0.6,
      },
      {
        topPct: 4,
        leftPct: 42,
        trailDeg: -41,
        w: 240,
        h: 13,
        pathStart: -200,
        pathEnd: 500,
        opacity: [0, 0.48, 0],
        duration: 3.2,
        repeatDelay: 2.6,
        delay: 1.4,
      },
      {
        topPct: 22,
        leftPct: 62,
        trailDeg: -34,
        w: 200,
        h: 11,
        pathStart: -240,
        pathEnd: 400,
        opacity: [0, 0.38, 0],
        duration: 4.1,
        repeatDelay: 1.5,
        delay: 2.1,
      },
      {
        topPct: 58,
        leftPct: 4,
        trailDeg: -39,
        w: 250,
        h: 14,
        pathStart: -200,
        pathEnd: 540,
        opacity: [0, 0.45, 0],
        duration: 3.6,
        repeatDelay: 2,
        delay: 0.3,
      },
      {
        topPct: 78,
        leftPct: -6,
        trailDeg: -37,
        w: 270,
        h: 15,
        pathStart: -230,
        pathEnd: 560,
        opacity: [0, 0.52, 0],
        duration: 3.9,
        repeatDelay: 2.4,
        delay: 1.1,
      },
      {
        topPct: 88,
        leftPct: 28,
        trailDeg: -40,
        w: 230,
        h: 12,
        pathStart: -160,
        pathEnd: 480,
        opacity: [0, 0.44, 0],
        duration: 3.5,
        repeatDelay: 2.1,
        delay: 1.8,
      },
    ],
    [],
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden mix-blend-screen"
      aria-hidden
    >
      {meteors.map((m, i) => {
        const { vx, vy } = trailUnit(m.trailDeg);
        const x0 = m.pathStart * vx;
        const y0 = m.pathStart * vy;
        const x1 = m.pathEnd * vx;
        const y1 = m.pathEnd * vy;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-lg will-change-transform"
            style={{
              top: `${m.topPct}%`,
              left: `${m.leftPct}%`,
              width: m.w,
              height: m.h,
              rotate: m.trailDeg,
              transformOrigin: "center center",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.15) 20%, rgba(255,255,255,0.75) 50%, rgba(254,202,202,0.35) 78%, transparent 100%)",
              boxShadow: "0 0 28px 6px rgba(59,130,246,0.25)",
            }}
            initial={{ x: x0, y: y0, opacity: m.opacity[0] }}
            animate={{
              x: [x0, x1, x1],
              y: [y0, y1, y1],
              opacity: [m.opacity[0], m.opacity[1], m.opacity[2]],
            }}
            transition={{
              duration: m.duration,
              times: [0, 0.72, 1],
              repeat: Infinity,
              repeatDelay: m.repeatDelay,
              ease: "easeInOut",
              delay: m.delay,
            }}
          />
        );
      })}
    </div>
  );
}

function NebulaBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.08, 1],
          x: [0, 24, 0],
          y: [0, -16, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-[min(90vw,28rem)] h-[min(90vw,28rem)] rounded-full bg-red-600/12 blur-[120px]"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.12, 1],
          x: [0, -28, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-[min(95vw,32rem)] h-[min(95vw,32rem)] rounded-full bg-blue-600/14 blur-[120px]"
      />
    </div>
  );
}

function RiseBeyondFooter({
  coupleNames,
}: {
  coupleNames: { first: string; second: string };
}) {
  return (
    <footer className="relative z-10 py-14 text-center rise-silver-footer text-xs sm:text-sm tracking-[0.2em] uppercase">
      <p>
        © {new Date().getFullYear()} {coupleNames.first} · {coupleNames.second}{" "}
        <span className="rise-silver-footer-faint">—</span>{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400/80 hover:text-red-400/90 transition-colors underline-offset-4 hover:underline"
        >
          JoinUs.lk
        </a>
      </p>
    </footer>
  );
}

export function RiseBeyondShell({
  children,
  coupleNames,
}: RiseBeyondShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-red-500/30 selection:text-slate-900 bg-[#050a15] text-slate-300 font-rise-beyond">
      <style>{`
        .rise-silver-display {
          background: linear-gradient(
            168deg,
            #ffffff 0%,
            #eef2f7 14%,
            #94a3b8 32%,
            #d8dee9 48%,
            #f8fafc 62%,
            #9ca3af 76%,
            #e4e9f0 90%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 rgba(255, 255, 255, 0.5))
            drop-shadow(0 -1px 1px rgba(15, 23, 42, 0.75))
            drop-shadow(0 3px 4px rgba(0, 0, 0, 0.55))
            drop-shadow(0 0 24px rgba(203, 213, 225, 0.5))
            drop-shadow(0 0 56px rgba(148, 163, 184, 0.32));
        }
        .rise-silver-numeral {
          background: linear-gradient(
            158deg,
            #f8fafc 0%,
            #cbd5e1 45%,
            #e2e8f0 72%,
            #94a3b8 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 rgba(255, 255, 255, 0.4))
            drop-shadow(0 -1px 1px rgba(15, 23, 42, 0.65))
            drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45))
            drop-shadow(0 0 14px rgba(199, 210, 224, 0.4));
        }
        .rise-silver-body {
          color: #cbd5e1;
          text-shadow:
            0 0 18px rgba(203, 213, 225, 0.32),
            0 1px 0 rgba(255, 255, 255, 0.22),
            0 -1px 1px rgba(0, 0, 0, 0.42),
            0 2px 3px rgba(0, 0, 0, 0.35);
        }
        .rise-silver-body-strong {
          color: #e8edf4;
          text-shadow:
            0 0 20px rgba(226, 232, 240, 0.38),
            0 1px 0 rgba(255, 255, 255, 0.32),
            0 -1px 1px rgba(0, 0, 0, 0.45),
            0 2px 4px rgba(0, 0, 0, 0.38);
        }
        .rise-silver-muted {
          color: #94a3b8;
          text-shadow:
            0 0 14px rgba(148, 163, 184, 0.28),
            0 1px 0 rgba(255, 255, 255, 0.14);
        }
        .rise-silver-subtle {
          color: #64748b;
          text-shadow: 0 0 10px rgba(100, 116, 139, 0.22);
        }
        .rise-silver-footer {
          color: rgba(148, 163, 184, 0.55);
          text-shadow: 0 0 8px rgba(100, 116, 139, 0.2);
        }
        .rise-silver-footer-faint {
          color: rgba(100, 116, 139, 0.45);
        }
        .rise-silver-input::placeholder {
          color: rgba(148, 163, 184, 0.42);
        }
        @keyframes rise-star-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(60px, 40px, 0); }
        }
        @keyframes rise-star-drift-reverse {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-40px, -30px, 0); }
        }
        .animate-rise-star-drift {
          animation: rise-star-drift 90s linear infinite;
        }
        .animate-rise-star-drift-reverse {
          animation: rise-star-drift-reverse 120s linear infinite;
        }
        @keyframes rise-twinkle {
          0%, 100% { opacity: 0.12; transform: scale(0.65); }
          45% { opacity: 0.55; transform: scale(1); }
          55% { opacity: 1; transform: scale(1.15); }
          80% { opacity: 0.35; transform: scale(0.85); }
        }
        .rise-twinkle-star {
          animation-name: rise-twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
      <Starfield />
      <TwinkleStars />
      <NebulaBlobs />
      <AmbientMeteorGlows />
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-14">
        {children}
      </main>
      <RiseBeyondFooter coupleNames={coupleNames} />
    </div>
  );
}
