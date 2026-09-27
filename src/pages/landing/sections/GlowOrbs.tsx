const ORBS = [
  { className: "-left-16 top-10 h-56 w-56 bg-dusk/45", duration: "9s" },
  { className: "right-[-4rem] top-64 h-52 w-52 bg-primary/20", duration: "11s" },
  { className: "left-1/3 bottom-10 h-60 w-60 bg-secondary/20", duration: "13s" },
];

export function GlowOrbs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`animate-orb-drift absolute rounded-full blur-3xl ${orb.className}`}
          style={{ animationDuration: orb.duration }}
        />
      ))}
    </div>
  );
}
