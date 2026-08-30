import { type ReactNode, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

/**
 * Evergreen palette — misty pine woodland.
 *   Canopy  #04120C  page base / nearest pine band
 *   Forest  #0B2A1E  mid-ground pine band, card surfaces
 *   Moss    #16452F  borders, accents
 *   Sage    #7FA88C  muted text, labels
 *   Mist    #DCE8E0  body text
 *   Snow    #FFFFFF  headings, numerals
 */

type EvergreenShellProps = {
  children: ReactNode;
  coupleNames: {
    first: string;
    second: string;
  };
};

/** Deterministic PRNG so decor positions are stable across renders. */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function CanopyGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.06, 1],
          x: [0, 18, 0],
          y: [0, -12, 0],
        }}
        transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
        className="absolute -top-48 -right-32 w-[min(94vw,32rem)] h-[min(94vw,32rem)] rounded-full bg-emerald-900/25 blur-[110px]"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.05, 1],
          x: [0, -20, 0],
          y: [0, 14, 0],
        }}
        transition={{ duration: 66, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-44 -left-36 w-[min(96vw,36rem)] h-[min(96vw,36rem)] rounded-full bg-[#0B2A1E]/70 blur-[110px]"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(84vw,28rem)] h-[min(48vh,20rem)] rounded-full bg-[#DCE8E0]/[0.06] blur-[95px]"
      />
    </div>
  );
}

/** Volumetric light shafts breaking through the canopy. */
function LightShafts() {
  const shafts = [
    { x: 10, width: 7, skew: 16, delay: "0s" },
    { x: 27, width: 4, skew: 13, delay: "2.4s" },
    { x: 48, width: 9, skew: 19, delay: "1.1s" },
    { x: 68, width: 5, skew: 15, delay: "3.6s" },
    { x: 84, width: 7, skew: 21, delay: "0.8s" },
  ];

  return (
    // viewBox + preserveAspectRatio="none" lets the beams use a plain 0-100 grid;
    // SVG `points` does not accept percentage units.
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] mix-blend-screen"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="eg-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2f0e6" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#cfe6d6" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#a9cbb6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {shafts.map((s, i) => (
        <polygon
          key={i}
          className="eg-shaft"
          style={{ animationDelay: s.delay }}
          fill="url(#eg-shaft)"
          points={`${s.x},0 ${s.x + s.width},0 ${s.x + s.width + s.skew},100 ${s.x + s.skew},100`}
        />
      ))}
    </svg>
  );
}

/** Slow horizontal fog bands drifting across the woodland. */
function FogBands() {
  const bands = [
    { top: "18%", height: "13rem", duration: "78s", opacity: 0.16 },
    { top: "48%", height: "10rem", duration: "96s", opacity: 0.12 },
    { top: "74%", height: "16rem", duration: "64s", opacity: 0.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden>
      {bands.map((b, i) => (
        <div
          key={i}
          className="eg-fog absolute -left-1/4 w-[150%] blur-2xl"
          style={{
            top: b.top,
            height: b.height,
            opacity: b.opacity,
            animationDuration: b.duration,
            animationDirection: i % 2 === 1 ? "reverse" : "normal",
          }}
        />
      ))}
    </div>
  );
}

/** One layer of repeating pine silhouettes, drawn as a single path. */
function pineLayerPath(count: number, seed: number, baseHeight: number) {
  const rnd = mulberry32(seed);
  const step = 100 / count;
  // Solid ground band so the trunks read as one continuous tree line.
  let d = "M0,100 L0,92 L100,92 L100,100 Z ";

  for (let i = 0; i < count; i += 1) {
    const cx = i * step + step / 2 + (rnd() - 0.5) * step * 0.5;
    const halfWidth = step * (0.42 + rnd() * 0.3);
    const height = baseHeight * (0.72 + rnd() * 0.55);
    const top = 100 - height;
    // Three stacked tiers give the conifer its layered profile.
    const tierOne = top + height * 0.34;
    const tierTwo = top + height * 0.64;

    d +=
      `M${(cx - halfWidth).toFixed(2)},100 ` +
      `L${(cx - halfWidth * 0.82).toFixed(2)},${tierTwo.toFixed(2)} ` +
      `L${(cx - halfWidth * 0.5).toFixed(2)},${tierTwo.toFixed(2)} ` +
      `L${(cx - halfWidth * 0.58).toFixed(2)},${tierOne.toFixed(2)} ` +
      `L${(cx - halfWidth * 0.28).toFixed(2)},${tierOne.toFixed(2)} ` +
      `L${cx.toFixed(2)},${top.toFixed(2)} ` +
      `L${(cx + halfWidth * 0.28).toFixed(2)},${tierOne.toFixed(2)} ` +
      `L${(cx + halfWidth * 0.58).toFixed(2)},${tierOne.toFixed(2)} ` +
      `L${(cx + halfWidth * 0.5).toFixed(2)},${tierTwo.toFixed(2)} ` +
      `L${(cx + halfWidth * 0.82).toFixed(2)},${tierTwo.toFixed(2)} ` +
      `L${(cx + halfWidth).toFixed(2)},100 Z `;
  }

  return d;
}

/** Three bottom-anchored pine bands that parallax against each other on scroll. */
function PineParallax() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const farY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const layers = useMemo(
    () => [
      {
        d: pineLayerPath(15, 0x45_56_47_52, 62),
        fill: "#0B2A1E",
        opacity: 0.85,
        height: "20vh",
        y: farY,
      },
      {
        d: pineLayerPath(11, 0x50_49_4e_45, 78),
        fill: "#082018",
        opacity: 0.95,
        height: "26vh",
        y: midY,
      },
      {
        d: pineLayerPath(7, 0x57_4f_4f_44, 96),
        fill: "#04120C",
        opacity: 1,
        height: "32vh",
        y: nearY,
      },
    ],
    [farY, midY, nearY],
  );

  return (
    // Explicit height: the layers inside are absolutely positioned, so the
    // container would otherwise collapse to 0 and clip them away.
    <div
      className="fixed inset-x-0 bottom-0 h-[38vh] pointer-events-none z-[3] overflow-hidden"
      aria-hidden
    >
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          style={{ y: reducedMotion ? 0 : layer.y }}
          className="absolute inset-x-0 bottom-0"
        >
          <svg
            className="w-full block"
            style={{ height: layer.height, opacity: layer.opacity }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d={layer.d} fill={layer.fill} />
          </svg>
        </motion.div>
      ))}
      {/* Ground haze where the pines meet the page edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04120C] via-[#04120C]/70 to-transparent" />
    </div>
  );
}

/** Sparse leaves drifting down through the shafts. */
function FallingLeaves() {
  const leaves = useMemo(() => {
    const rnd = mulberry32(0x4c_45_41_46);
    return Array.from({ length: 18 }, () => ({
      left: 2 + rnd() * 96,
      size: 4 + rnd() * 5,
      delay: (rnd() * 22).toFixed(2),
      duration: (18 + rnd() * 16).toFixed(1),
      opacity: 0.18 + rnd() * 0.22,
      tilt: (rnd() * 90).toFixed(0),
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[4] overflow-hidden"
      aria-hidden
    >
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="eg-leaf absolute"
          style={{
            left: `${leaf.left.toFixed(2)}%`,
            width: leaf.size,
            height: leaf.size * 1.8,
            opacity: leaf.opacity,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            rotate: `${leaf.tilt}deg`,
          }}
        />
      ))}
    </div>
  );
}

function EvergreenFooter({
  coupleNames,
}: {
  coupleNames: { first: string; second: string };
}) {
  return (
    <footer className="relative z-10 py-14 text-center text-[#7FA88C]/85 text-xs sm:text-sm tracking-[0.2em] uppercase">
      <p>
        © {new Date().getFullYear()} {coupleNames.first} · {coupleNames.second}{" "}
        <span className="text-[#16452F]">—</span>{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#DCE8E0]/80 hover:text-white transition-colors underline-offset-4 hover:underline"
        >
          JoinUs.lk
        </a>
      </p>
    </footer>
  );
}

export function EvergreenShell({ children, coupleNames }: EvergreenShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-50 bg-[#04120C] text-[#DCE8E0] font-evergreen">
      <style>{`
        .eg-serif-display {
          background: linear-gradient(
            170deg,
            #ffffff 0%,
            #f2f8f4 28%,
            #dce8e0 58%,
            #bcd4c4 82%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 rgba(255, 255, 255, 0.25))
            drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6))
            drop-shadow(0 0 26px rgba(180, 214, 192, 0.18));
        }
        .eg-mist-text { color: #dce8e0; }
        .eg-muted-text { color: #7fa88c; }
        .eg-label {
          color: #7fa88c;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }
        .eg-input::placeholder { color: #4d7360; }

        .eg-fog {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(200, 224, 210, 0.16) 22%,
            rgba(226, 240, 230, 0.3) 50%,
            rgba(200, 224, 210, 0.16) 78%,
            transparent 100%
          );
          animation-name: eg-fog-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes eg-fog-drift {
          0% { transform: translate3d(-18%, 0, 0); }
          50% { transform: translate3d(12%, -8px, 0); }
          100% { transform: translate3d(-18%, 0, 0); }
        }

        .eg-shaft {
          animation: eg-shaft-breathe 11s ease-in-out infinite;
          transform-origin: top center;
        }
        @keyframes eg-shaft-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .eg-leaf {
          top: -6%;
          border-radius: 60% 0 60% 0;
          background: linear-gradient(
            145deg,
            rgba(226, 240, 230, 0.85) 0%,
            rgba(127, 168, 140, 0.6) 55%,
            rgba(22, 69, 47, 0.4) 100%
          );
          animation-name: eg-leaf-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes eg-leaf-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); }
          25% { transform: translate3d(22px, 25vh, 0) rotate(120deg); }
          50% { transform: translate3d(-14px, 55vh, 0) rotate(220deg); }
          75% { transform: translate3d(18px, 82vh, 0) rotate(320deg); }
          100% { transform: translate3d(-6px, 112vh, 0) rotate(420deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .eg-fog, .eg-shaft, .eg-leaf { animation: none !important; }
          .eg-leaf { display: none; }
        }
      `}</style>
      <CanopyGradient />
      <LightShafts />
      <FogBands />
      <PineParallax />
      <FallingLeaves />
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-14">
        {children}
      </main>
      <EvergreenFooter coupleNames={coupleNames} />
    </div>
  );
}
