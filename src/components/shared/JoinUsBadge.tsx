import { brand } from "../../config/brand";

type JoinUsBadgeProps = {
  className?: string;
};

/**
 * The "Created with joinus.lk" footer pill. Themes that want this branding
 * (currently: Olive Garden) render it in their own footer rather than each
 * hand-rolling their own link, so future themes can reuse it too.
 */
export function JoinUsBadge({ className = "" }: JoinUsBadgeProps) {
  return (
    <a
      href="https://joinus.lk"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#e3ddc7] px-4 py-2 text-xs text-[#5d6240] transition-colors hover:border-[#b7bc82] ${className}`}
    >
      Created with <span className="text-[#a0443a]">♥</span> by{" "}
      <span className="font-medium">{brand.displayName}</span>
    </a>
  );
}
