import { motion, useScroll, useTransform } from "framer-motion";

type FlyingButterflyProps = {
  index?: number;
  size?: number;
  color?: string;
  delay?: number;
  isForeground?: boolean;
};

export function FlyingButterfly({
  index = 0,
  size = 12,
  color = "#D4AF37",
  delay = 0,
  isForeground = false,
}: FlyingButterflyProps) {
  const { scrollYProgress } = useScroll();

  const getPath = (i: number) => {
    const seed = i * 13.37;
    const random = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const startsLeft = i % 2 === 0;
    const startX = startsLeft
      ? `${3 + random(seed + 12) * 35}%`
      : `${62 + random(seed + 12) * 35}%`;
    const xPoints = startsLeft
      ? [
          startX,
          `${10 + random(seed) * 30}%`,
          `${40 + random(seed + 1) * 40}%`,
          `${70 + random(seed + 2) * 30}%`,
          "90%",
        ]
      : [
          startX,
          `${90 - random(seed) * 30}%`,
          `${60 - random(seed + 1) * 40}%`,
          `${30 - random(seed + 2) * 30}%`,
          "10%",
        ];

    const yPoints = [
      `${5 + random(seed + 3) * 15}vh`,
      `${20 + random(seed + 4) * 30}vh`,
      `${50 + random(seed + 5) * 40}vh`,
      `${80 + random(seed + 6) * 15}vh`,
      `${40 + random(seed + 7) * 50}vh`,
    ];

    const rotatePoints = [
      startsLeft ? 30 : -20,
      random(seed + 8) * 90 - 45,
      random(seed + 9) * 120 - 60,
      random(seed + 10) * 90 - 45,
      startsLeft ? 45 : -45,
    ];

    return { x: xPoints, y: yPoints, rotate: rotatePoints };
  };

  const path = getPath(index);
  const left = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], path.x);
  const top = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], path.y);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    path.rotate,
  );

  return (
    <motion.div
      style={{ left, top, rotate }}
      className={`fixed ${isForeground ? "z-10000" : "z-0"} pointer-events-none -translate-x-1/2 -translate-y-1/2`}
    >
      <svg
        viewBox="0 0 100 100"
        style={{ width: `${size * 5}px`, height: `${size * 5}px` }}
      >
        <motion.g
          animate={{
            scaleX: [1, 0.3, 1],
          }}
          transition={{
            duration: 0.3 + Math.random() * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M50 50 C20 20 10 40 10 60 C10 80 40 90 50 50 Z"
            fill={color}
            fillOpacity="0.8"
          />
          <path
            d="M50 50 C80 20 90 40 90 60 C90 80 60 90 50 50 Z"
            fill={color}
            fillOpacity="0.8"
          />
          <ellipse cx="50" cy="55" rx="3" ry="15" fill="#6F4E37" />
          <path
            d="M48 42 Q45 35 40 35"
            stroke="#6F4E37"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M52 42 Q55 35 60 35"
            stroke="#6F4E37"
            strokeWidth="1"
            fill="none"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
