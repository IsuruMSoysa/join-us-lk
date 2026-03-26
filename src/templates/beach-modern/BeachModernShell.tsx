import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { FloatingBubbles } from "../../components/decor/FloatingBubbles";

type BeachModernShellProps = {
  children: ReactNode;
  showBackgroundTexture?: boolean;
  backgroundTextureImageUrl?: string;
  coupleNames: {
    first: string;
    second: string;
  };
};

function BeachModernBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft blue gradient blobs */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-160 h-160 bg-sky-400/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-160 h-160 bg-blue-500/10 rounded-full blur-[100px]"
      />

      {/* Beach/Bubble animations */}
      <FloatingBubbles
        count={24}
        minSize={20}
        maxSize={68}
        color="rgba(56, 189, 248, 0.45)"
        maxOpacity={0.9}
      />
    </div>
  );
}

function BeachModernFooter({
  coupleNames,
}: {
  coupleNames: { first: string; second: string };
}) {
  return (
    <footer className="py-12 text-center text-sky-900/40 font-sans text-sm tracking-wide">
      <p className="uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} {coupleNames.first} & {coupleNames.second}{" "}
        - Made with ❤️ by{" "}
        <span className="text-sky-400 hover:text-sky-500 transition-colors">
          JoinUs.lk
        </span>
      </p>
    </footer>
  );
}

export function BeachModernShell({
  children,
  showBackgroundTexture = false,
  backgroundTextureImageUrl,
  coupleNames,
}: BeachModernShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-sky-200/50 bg-[#f0f9ff] font-sans">
      {showBackgroundTexture && backgroundTextureImageUrl && (
        <div
          className="fixed inset-0 z-0 w-full max-w-none bg-center bg-no-repeat pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage: `url(${backgroundTextureImageUrl})`,
            backgroundSize: "cover",
          }}
          aria-hidden
        />
      )}
      <BeachModernBackground />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:px-12">
        {children}
      </main>
      <BeachModernFooter coupleNames={coupleNames} />
    </div>
  );
}
