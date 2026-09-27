import { OliveLeaf } from "./OliveLeaf";

/** 6 leaves, staggered negative delays so none start off-screen empty. */
const LEAVES = [
  { left: "8%", size: 16, color: "#5c6e2c", duration: 22, delay: -4 },
  { left: "22%", size: 13, color: "#6f7f38", duration: 28, delay: -14 },
  { left: "38%", size: 18, color: "#869347", duration: 19, delay: -8 },
  { left: "57%", size: 14, color: "#4a5a22", duration: 33, delay: -20 },
  { left: "74%", size: 17, color: "#9ea65e", duration: 24, delay: -2 },
  { left: "91%", size: 15, color: "#5c6e2c", duration: 30, delay: -11 },
];

export function FallingLeaves() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="og-falling-leaf absolute top-[-8%]"
          style={{
            left: leaf.left,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <OliveLeaf size={leaf.size} color={leaf.color} rotation={0} style={{ position: "static" }} />
        </span>
      ))}
    </div>
  );
}
