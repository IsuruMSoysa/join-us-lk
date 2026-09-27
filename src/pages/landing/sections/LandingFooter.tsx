import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-6 md:px-16 md:py-7">
      <div className="mx-auto flex max-w-[1152px] items-center justify-between font-round text-xs text-text/50 md:text-[13px]">
        <span>
          © 2026 JoinUs.lk
          <span className="hidden md:inline"> · Colombo, Sri Lanka</span>
        </span>
        <Link to="/portal" className="hover:text-text/80 transition-colors">
          Client portal
        </Link>
      </div>
    </footer>
  );
}
