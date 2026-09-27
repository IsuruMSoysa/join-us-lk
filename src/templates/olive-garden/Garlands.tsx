import { useMemo } from "react";
import { OliveLeaf } from "./OliveLeaf";
import { mulberry32, seededRange } from "../../utils/seededRandom";

const OLIVE_COLORS = [
  "#3b4519",
  "#4a5a22",
  "#5c6e2c",
  "#6f7f38",
  "#869347",
  "#9ea65e",
  "#b7bc82",
];

/** k = clamp(viewportWidth / 1280, 0.45, 1) — read once at mount, no resize
 *  listener: this is decorative chrome, not layout, so a stale value after a
 *  window resize is an acceptable trade-off against added complexity. */
function useLeafScale(): number {
  return useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1280;
    return Math.min(1, Math.max(0.45, width / 1280));
  }, []);
}

type Vine = {
  leftPercent: number;
  heightVh: number;
  leafCount: number;
  baseSize: number;
  swayDuration: number;
  swayDelay: number;
};

const VINES: Vine[] = [
  { leftPercent: 14, heightVh: 100, leafCount: 28, baseSize: 34, swayDuration: 9, swayDelay: 0 },
  { leftPercent: 44, heightVh: 74, leafCount: 19, baseSize: 30, swayDuration: 10.5, swayDelay: 1.4 },
  { leftPercent: 76, heightVh: 46, leafCount: 12, baseSize: 26, swayDuration: 8.4, swayDelay: 0.8 },
];

function VineColumn({ vine, seed, scale }: { vine: Vine; seed: number; scale: number }) {
  const leaves = useMemo(() => {
    const random = mulberry32(seed);
    return Array.from({ length: vine.leafCount }, (_, i) => {
      const t = i / Math.max(vine.leafCount - 1, 1);
      // Taper toward the tip (top) to ~50% of the base size, ±20% jitter.
      const taper = 1 - t * 0.5;
      const jitter = seededRange(random, 0.8, 1.2);
      const size = vine.baseSize * taper * jitter * scale;
      const alternate = i % 2 === 0 ? 1 : -1;
      const rotation = alternate * seededRange(random, 7, 35) - 14;
      const color = OLIVE_COLORS[Math.floor(random() * OLIVE_COLORS.length)];
      return {
        top: `${t * 100}%`,
        side: alternate > 0 ? ("left" as const) : ("right" as const),
        size,
        rotation,
        color,
      };
    });
  }, [seed, vine, scale]);

  return (
    <div
      className="og-vine absolute top-0"
      style={{
        left: `${vine.leftPercent}%`,
        height: `${vine.heightVh}vh`,
        width: 1,
        animationDuration: `${vine.swayDuration}s`,
        animationDelay: `${vine.swayDelay}s`,
      }}
    >
      <span
        className="absolute left-0 top-0 h-full"
        style={{ width: 1.5, background: "linear-gradient(#4a5a22, rgba(74,90,34,.15))" }}
      />
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="absolute"
          style={{ top: leaf.top, [leaf.side]: 0 }}
        >
          <OliveLeaf size={leaf.size} color={leaf.color} rotation={leaf.rotation} />
        </span>
      ))}
    </div>
  );
}

function CornerCluster({ seed, scale }: { seed: number; scale: number }) {
  const leaves = useMemo(() => {
    const random = mulberry32(seed);
    return Array.from({ length: 11 }, (_, i) => {
      const t = i / 10;
      const angle = -48 + t * 96;
      const size = seededRange(random, 48, 92) * scale;
      const color = OLIVE_COLORS[Math.floor(random() * OLIVE_COLORS.length)];
      return { angle, size, color };
    });
  }, [seed, scale]);

  return (
    <div className="og-corner-cluster absolute left-0 top-0 h-24 w-24">
      {leaves.map((leaf, i) => (
        <span key={i} className="absolute left-0 top-0">
          <OliveLeaf size={leaf.size} color={leaf.color} rotation={leaf.angle} />
        </span>
      ))}
    </div>
  );
}

/**
 * Fixed, behind-content, pointer-events-none side garlands: a left column of
 * three tapering vines plus a fanned corner cluster, mirrored via
 * `scaleX(-1)` for the right column (same seeds — mirroring is purely a
 * transform, per the design reference).
 */
export function Garlands() {
  const scale = useLeafScale();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute left-0 top-0 h-full" style={{ width: "min(12vw, 130px)" }}>
        <CornerCluster seed={11} scale={scale} />
        {/* Keyed wrapper: this repo ships no @types/react, so `key` is not
            accepted directly on a plain function component. */}
        {VINES.map((vine, i) => (
          <span key={i}>
            <VineColumn vine={vine} seed={100 + i} scale={scale} />
          </span>
        ))}
      </div>
      <div
        className="absolute right-0 top-0 h-full"
        style={{ width: "min(12vw, 130px)", transform: "scaleX(-1)" }}
      >
        <CornerCluster seed={11} scale={scale} />
        {VINES.map((vine, i) => (
          <span key={i}>
            <VineColumn vine={vine} seed={100 + i} scale={scale} />
          </span>
        ))}
      </div>
    </div>
  );
}
