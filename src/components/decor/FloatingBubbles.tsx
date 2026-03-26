import { motion } from "framer-motion";

type FloatingBubblesProps = {
  count?: number;
  minSize?: number;
  maxSize?: number;
  color?: string;
  maxOpacity?: number;
};

export function FloatingBubbles({
  count = 15,
  minSize = 16,
  maxSize = 56,
  color = "rgba(14, 165, 233, 0.35)",
  maxOpacity = 0.75,
}: FloatingBubblesProps) {
  const bubbles = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const startX = Math.random() * 100; // left offset in %
    const driftA = Math.random() * 60 - 30; // px
    const driftB = Math.random() * 100 - 50; // px
    const driftC = Math.random() * 80 - 40; // px
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const delay = Math.random() * 10;

    return {
      id: i,
      size,
      startX: `${startX}%`,
      driftA,
      driftB,
      driftC,
      duration,
      delay,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{
            y: "110vh",
            x: 0,
            opacity: 0,
            scale: 0.55,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, maxOpacity * 0.55, maxOpacity, 0],
            scale: [0.55, 1, 1.25, 1],
            x: [0, bubble.driftA, bubble.driftB, bubble.driftC],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: bubble.startX,
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.55) 20%, transparent 48%), ${color}`,
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow:
              "0 8px 24px rgba(14, 165, 233, 0.22), inset 0 0 10px rgba(255, 255, 255, 0.35)",
          }}
        />
      ))}
    </div>
  );
}
