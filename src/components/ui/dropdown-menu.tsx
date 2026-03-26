import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export function DropdownMenu({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div className="relative inline-flex" ref={rootRef}>
      <button type="button" onClick={() => setOpen((value) => !value)}>
        {trigger}
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-2 min-w-40 rounded-md border border-secondary/20 bg-background p-1 shadow-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownMenuItem({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-secondary/10",
        className,
      )}
    >
      {children}
    </button>
  );
}
