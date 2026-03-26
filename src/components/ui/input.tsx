import * as React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-secondary/20 bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
