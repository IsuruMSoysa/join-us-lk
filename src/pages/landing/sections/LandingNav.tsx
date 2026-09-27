import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#journey", label: "How it works" },
  { href: "#templates", label: "Templates" },
  // { href: "#testimonials", label: "Kind words" },
];

type LandingNavProps = {
  whatsappHref: string;
};

export function LandingNav({ whatsappHref }: LandingNavProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1152px] items-center justify-between gap-4 px-4 py-4 md:px-16">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/images/joinus-pigeon.png"
            alt="JoinUs.lk"
            className="h-9 w-9 object-contain md:h-11 md:w-11"
          />
          <span className="font-display text-lg font-extrabold tracking-tight md:text-xl">
            JoinUs<span className="text-primary">.lk</span>
          </span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-9 font-round text-sm font-medium text-text/78 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/portal"
            className="whitespace-nowrap font-round text-sm font-medium text-text/80 hover:text-text transition-colors"
          >
            Client portal
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex whitespace-nowrap items-center rounded-[14px] bg-accent px-[22px] py-3 font-round text-sm font-bold text-[#062B14] hover:opacity-95 transition-opacity"
          >
            WhatsApp us
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 md:hidden"
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? (
            <X className="h-5 w-5 text-primary" aria-hidden />
          ) : (
            <Menu className="h-5 w-5 text-primary" aria-hidden />
          )}
        </button>
      </div>

      {mobileNavOpen ? (
        <div className="mx-4 mb-3 flex flex-col gap-3 rounded-2xl bg-panel px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1 font-round text-sm font-medium text-text/90">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 hover:bg-white/5 hover:text-primary transition-colors"
                onClick={() => setMobileNavOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/portal"
              className="inline-flex items-center justify-center rounded-xl border border-secondary/35 px-4 py-2 text-sm font-semibold text-secondary hover:bg-secondary/10 transition-colors"
              onClick={() => setMobileNavOpen(false)}
            >
              Client portal
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-[#062B14] hover:opacity-95 transition-opacity"
              onClick={() => setMobileNavOpen(false)}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
