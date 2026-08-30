import { type CSSProperties } from "react";

type TulipProps = {
  /** Overall height in px — every other dimension is derived from it. */
  height: number;
  /** Seconds for one sway cycle. The design uses 7–11s in the hero, 13s on the RSVP panel. */
  swayDuration?: number;
  swayDelay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * A tulip built entirely from positioned spans and organic border-radii — no
 * image, no SVG. Rendered four times in the hero row and once, oversized and
 * faded, as the RSVP panel's decoration.
 *
 * The sway animation itself lives on `.et-tulip` in EmeraldTulipShell so it can
 * be disabled wholesale under `prefers-reduced-motion`.
 */
export function Tulip({
  height,
  swayDuration = 9,
  swayDelay = 0,
  className = "",
  style,
}: TulipProps) {
  const bloomW = height * 0.44;
  const bloomH = height * 0.34;
  const stemW = height > 150 ? 3 : 2;
  const leafW = height * 0.2;
  const leafH = height * 0.3;

  return (
    <div
      aria-hidden
      className={`et-tulip relative shrink-0 ${className}`}
      style={{
        width: bloomW,
        height,
        animationDuration: `${swayDuration}s`,
        animationDelay: `${swayDelay}s`,
        ...style,
      }}
    >
      {/* Stem — stops just under the bloom so the two overlap rather than butt. */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: stemW,
          height: height - bloomH * 0.78,
          background: "linear-gradient(#3c8f68,#16402d)",
        }}
      />

      {/* Two leaves, mirrored radii so they curve away from the stem. */}
      <span
        className="absolute"
        style={{
          left: `calc(50% - ${leafW}px)`,
          bottom: height * 0.06,
          width: leafW,
          height: leafH,
          borderRadius: "0 100% 0 100%",
          background: "linear-gradient(160deg,#38916a,#1a4a33)",
        }}
      />
      <span
        className="absolute"
        style={{
          left: "50%",
          bottom: height * 0.24,
          width: leafW * 0.8,
          height: leafH * 0.8,
          borderRadius: "100% 0 100% 0",
          background: "linear-gradient(200deg,#276b4d,#143526)",
        }}
      />

      {/* Bloom — two darker side petals behind one bright front petal. */}
      <span
        className="absolute left-0 top-0"
        style={{
          width: bloomW * 0.58,
          height: bloomH,
          borderRadius: "60% 40% 45% 55% / 70% 70% 30% 30%",
          background: "linear-gradient(160deg,#1fa971,#177650)",
          transform: "rotate(-11deg)",
        }}
      />
      <span
        className="absolute right-0 top-0"
        style={{
          width: bloomW * 0.58,
          height: bloomH,
          borderRadius: "40% 60% 55% 45% / 70% 70% 30% 30%",
          background: "linear-gradient(200deg,#1fa971,#2c7a56)",
          transform: "rotate(11deg)",
        }}
      />
      <span
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: bloomH * 0.06,
          width: bloomW * 0.62,
          height: bloomH * 0.96,
          borderRadius: "50% 50% 46% 46% / 66% 66% 34% 34%",
          background: "linear-gradient(165deg,#8ff0c0,#5fe3a5 45%,#3ec98d)",
        }}
      />
    </div>
  );
}
