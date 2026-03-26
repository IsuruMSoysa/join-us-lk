import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

type AnimatedSectionProps = {
  children: ReactNode;
  delay?: number;
  isZoomIn?: boolean;
};

export function AnimatedSection({
  children,
  delay = 0.2,
  isZoomIn = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = usePrefersReducedMotion();

  const initial = reducedMotion
    ? { opacity: 0 }
    : isZoomIn
      ? { opacity: 0, scale: 0.85 }
      : { opacity: 0, y: 50 };

  const animate =
    isInView
      ? reducedMotion
        ? { opacity: 1 }
        : isZoomIn
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, y: 0 }
      : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: reducedMotion ? 0.2 : 0.8,
        delay: reducedMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
