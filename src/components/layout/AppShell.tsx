import { type ReactNode } from "react";
import { BackgroundElements } from "./BackgroundElements";
import { AppFooter } from "./AppFooter";

type AppShellProps = {
  children: ReactNode;
  themeClassName: string;
  showBackgroundTexture?: boolean;
  backgroundTextureImageUrl?: string;
  coupleNames: {
    first: string;
    second: string;
  };
};

export function AppShell({
  children,
  themeClassName,
  showBackgroundTexture = true,
  backgroundTextureImageUrl = "/images/paper-2.jpg",
  coupleNames,
}: AppShellProps) {
  return (
    <div
      className={`app-theme ${themeClassName} bg-cream text-coffee font-sans min-h-screen overflow-x-hidden selection:bg-maroon/20`}
    >
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
      <BackgroundElements />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-6 md:px-12">
        {children}
      </main>
      <AppFooter coupleNames={coupleNames} />
    </div>
  );
}
