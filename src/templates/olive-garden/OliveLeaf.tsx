import { type CSSProperties } from "react";

type OliveLeafProps = {
  /** Width/height in px — the leaf is always square. */
  size: number;
  color: string;
  /** Degrees; the leaf rotates from its top-left corner. */
  rotation: number;
  style?: CSSProperties;
  className?: string;
};

/**
 * A single leaf: a square with two opposite corners fully rounded
 * (`border-radius: 0 100%`), plus a diagonal midrib highlight layered over
 * the base colour. No image/SVG — just gradients, per the design reference.
 */
export function OliveLeaf({
  size,
  color,
  rotation,
  style,
  className = "",
}: OliveLeafProps) {
  return (
    <span
      aria-hidden
      className={`absolute block ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "0 100%",
        background: `linear-gradient(135deg, transparent 47.5%, rgba(246,241,228,.45) 49.5%, transparent 51.5%), ${color}`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "top left",
        ...style,
      }}
    />
  );
}
