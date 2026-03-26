import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { FlyingButterfly } from "../../components/decor/FlyingButterfly";

type WeddingClassicShellProps = {
  children: ReactNode;
  showBackgroundTexture?: boolean;
  backgroundTextureImageUrl?: string;
  coupleNames: {
    first: string;
    second: string;
  };
};

function WeddingClassicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[30rem] h-[30rem] bg-secondary/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-3xl"
      />
      <FlyingButterfly index={0} size={15} color="var(--color-secondary)" />
      <FlyingButterfly index={1} size={10} color="var(--color-primary)" delay={0.5} />
      <FlyingButterfly
        index={2}
        size={18}
        color="var(--color-primary)"
        delay={1}
        isForeground
      />
      <FlyingButterfly
        index={3}
        size={12}
        color="var(--color-primary)"
        delay={1.5}
        isForeground
      />
    </div>
  );
}

function WeddingClassicFooter({
  coupleNames,
}: {
  coupleNames: { first: string; second: string };
}) {
  return (
    <footer className="py-6 text-center text-text/60 font-round text-sm">
      <p>
        © {new Date().getFullYear()} {coupleNames.first} & {coupleNames.second}
      </p>
    </footer>
  );
}

export function WeddingClassicShell({
  children,
  showBackgroundTexture = true,
  backgroundTextureImageUrl = "/images/paper-2.jpg",
  coupleNames,
}: WeddingClassicShellProps) {
  return (
    <div className="app-theme min-h-screen overflow-x-hidden selection:bg-accent/20">
      {showBackgroundTexture && (
        <div
          className="fixed inset-0 z-0 w-full max-w-none bg-center bg-no-repeat pointer-events-none opacity-5"
          style={{
            backgroundImage: `url(${backgroundTextureImageUrl})`,
            backgroundSize: "cover",
          }}
          aria-hidden
        />
      )}
      <WeddingClassicBackground />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-6 md:px-12">
        {children}
      </main>
      <WeddingClassicFooter coupleNames={coupleNames} />
    </div>
  );
}
