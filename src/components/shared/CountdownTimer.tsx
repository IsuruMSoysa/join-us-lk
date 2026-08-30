import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(eventDateTime: string): TimeLeft {
  const difference = +new Date(eventDateTime) - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

function isTodayTheDay(eventDateTime: string): boolean {
  const event = new Date(eventDateTime);
  const now = new Date();
  return (
    event.getFullYear() === now.getFullYear() &&
    event.getMonth() === now.getMonth() &&
    event.getDate() === now.getDate()
  );
}

type CountdownVariant =
  | "classic"
  | "corporate"
  | "awards"
  | "forest"
  | "tulip";

type VariantStyles = {
  /** Extra margin/positioning on the outermost wrapper. */
  root: string;
  /** The box around each numeral. */
  cell: string;
  /** The numeral itself. */
  numeral: string;
  /** The "days / hours / …" caption under each cell. */
  label: string;
  /** Wrapper for the "Today is the Day!" state (currently unused — see below). */
  todayWrapper: string;
  todayText: string;
  /** Optional non-rectangular cell shape. */
  clipPath?: string;
  /** Extra padding on the "Today is the Day!" row. */
  todayRowClass?: string;
  /**
   * Optional overrides for the final (seconds) cell, for variants that
   * emphasize it. Left unset, the last cell looks like all the others.
   */
  lastCell?: string;
  lastNumeral?: string;
};

const VARIANT_STYLES: Record<CountdownVariant, VariantStyles> = {
  classic: {
    root: "mt-16 relative",
    cell: "glass w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border-gold/10 shadow-inner",
    numeral: "font-round text-2xl md:text-4xl font-bold text-olive",
    label:
      "mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-coffee/60 font-round font-bold",
    todayWrapper:
      "glass mx-auto max-w-lg rounded-2xl border-gold/10 px-8 py-6 shadow-inner",
    todayText:
      "font-round text-center text-2xl sm:text-3xl md:text-4xl font-bold text-olive drop-shadow-[0_0_20px_rgba(180,140,60,0.25)]",
  },
  corporate: {
    root: "mt-0 relative",
    cell: "w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-md shadow-inner shadow-black/40 skew-x-[-6deg]",
    numeral:
      "rise-silver-numeral skew-x-[6deg] text-xl sm:text-2xl md:text-4xl font-black tabular-nums",
    label:
      "mt-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] text-blue-300/80 font-semibold",
    todayWrapper:
      "mx-auto max-w-lg rounded-lg border border-white/15 bg-white/5 px-8 py-6 backdrop-blur-md shadow-inner shadow-black/40 skew-x-[-6deg]",
    todayText:
      "rise-silver-numeral skew-x-[6deg] text-center text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white",
  },
  awards: {
    root: "mt-0 relative",
    cell: "w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center border border-[#c9a227]/55 bg-[#0a0a0a]/90 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,215,0,0.12),0_8px_28px_-8px_rgba(212,175,55,0.35)]",
    numeral:
      "ua-gold-numeral text-xl sm:text-2xl md:text-4xl font-black tabular-nums tracking-tighter",
    label:
      "mt-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#ffb347]/90 font-semibold",
    todayWrapper:
      "mx-auto max-w-lg border border-[#c9a227]/55 px-8 py-6 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,215,0,0.12),0_8px_28px_-8px_rgba(212,175,55,0.35)]",
    todayText:
      "ua-gold-numeral text-center text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]",
    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
    todayRowClass: "px-2",
  },
  forest: {
    root: "mt-0 relative",
    cell: "w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center rounded-xl border border-[#16452F] bg-[#0B2A1E]/50 backdrop-blur-md shadow-[inset_0_1px_0_rgba(220,232,224,0.08),0_10px_32px_-14px_rgba(0,0,0,0.85)]",
    numeral:
      "font-evergreen text-2xl sm:text-3xl md:text-5xl font-light tabular-nums text-white",
    label:
      "mt-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#7FA88C] font-medium",
    todayWrapper:
      "mx-auto max-w-lg rounded-xl border border-[#16452F] bg-[#0B2A1E]/50 px-8 py-6 backdrop-blur-md shadow-[inset_0_1px_0_rgba(220,232,224,0.08),0_10px_32px_-14px_rgba(0,0,0,0.85)]",
    todayText:
      "font-evergreen text-center text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white",
  },
  tulip: {
    root: "mt-0 relative",
    cell: "min-w-[72px] sm:min-w-20 rounded-[18px] border border-[#8ff0c0]/[0.14] bg-white/[0.03] px-3 pt-[18px] pb-3.5 flex items-center justify-center",
    numeral:
      "font-emerald-tulip text-[clamp(30px,5.4vw,62px)] font-light leading-none tabular-nums text-[#eaf7ef]",
    label:
      "mt-2 font-emerald-tulip-ui text-[10px] uppercase tracking-[0.26em] text-[#7fbfa0]",
    todayWrapper:
      "mx-auto max-w-lg rounded-[18px] border border-[#8ff0c0]/[0.22] bg-[#1fa971]/[0.14] px-8 py-6 backdrop-blur-md",
    todayText:
      "font-emerald-tulip text-center text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#eaf7ef]",
    // The seconds cell is the live one — brighter frame, glowing numeral.
    // `!` is required: these override same-specificity utilities already on
    // `cell`/`numeral`, and class order in the attribute does not decide that.
    lastCell: "border-[#8ff0c0]/[0.22]! bg-[#1fa971]/[0.14]!",
    lastNumeral: "et-glow text-[#8ff0c0]!",
  },
};

type CountdownTimerProps = {
  eventDateTime: string;
  /** Sharp dark panels for corporate / space themes; soft moss panels for forest. */
  variant?: CountdownVariant;
};

export function CountdownTimer({
  eventDateTime,
  variant = "classic",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDateTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDateTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDateTime]);

  const styles = VARIANT_STYLES[variant];
  const showTodayLabel = isTodayTheDay(eventDateTime);

  if (showTodayLabel) {
    return (
      <div className={styles.root}>
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className={`flex justify-center ${styles.todayRowClass ?? ""}`}
        >
          <div
            // className={styles.todayWrapper}
            style={
              variant === "awards"
                ? { clipPath: "polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)" }
                : undefined
            }
          >
            <p className={styles.todayText}>Today is the Day!</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-10">
        {Object.entries(timeLeft).map(([interval, value], idx, entries) => {
          const isLast = idx === entries.length - 1;
          return (
            <motion.div
              key={interval}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`${styles.cell} ${isLast ? (styles.lastCell ?? "") : ""}`}
                style={
                  styles.clipPath ? { clipPath: styles.clipPath } : undefined
                }
              >
                <span
                  className={`${styles.numeral} ${isLast ? (styles.lastNumeral ?? "") : ""}`}
                >
                  {value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className={styles.label}>{interval}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
