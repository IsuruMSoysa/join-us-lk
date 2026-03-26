import { motion } from "framer-motion";
import { FlyingButterfly } from "../decor/FlyingButterfly";

export function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 ">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[30rem] h-[30rem] bg-olive/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-maroon/5 rounded-full blur-3xl"
      />
      <FlyingButterfly index={0} size={15} color="var(--color-olive)" />
      <FlyingButterfly index={1} size={10} color="var(--color-gold)" delay={0.5} />
      <FlyingButterfly
        index={2}
        size={18}
        color="var(--color-gold)"
        delay={1}
        isForeground
      />
      <FlyingButterfly
        index={3}
        size={12}
        color="var(--color-gold)"
        delay={1.5}
        isForeground
      />
      <FlyingButterfly
        index={4}
        size={14}
        color="var(--color-gold)"
        delay={2}
        isForeground
      />
      <FlyingButterfly
        index={5}
        size={11}
        color="var(--color-olive)"
        delay={2.5}
        isForeground
      />
    </div>
  );
}
