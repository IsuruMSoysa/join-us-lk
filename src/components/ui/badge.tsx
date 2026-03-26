import * as React from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "destructive";

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-primary/15 text-text border border-primary/30",
  secondary: "bg-secondary/10 text-secondary border border-secondary/20",
  outline: "border border-secondary/30 text-text",
  success: "bg-emerald-500/10 text-emerald-700 border border-emerald-600/30",
  destructive: "bg-accent/10 text-accent border border-accent/30",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
