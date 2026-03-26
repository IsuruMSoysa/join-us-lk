import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

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

type CountdownTimerProps = {
  eventDateTime: string;
};

export function CountdownTimer({ eventDateTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDateTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDateTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDateTime]);

  return (
    <div className="mt-16 relative">
      <div className="flex justify-center gap-4 md:gap-10">
        {Object.entries(timeLeft).map(([interval, value], idx) => (
          <motion.div
            key={interval}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="glass w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border-gold/10 shadow-inner">
              <span className="font-round text-2xl md:text-4xl font-bold text-olive">
                {value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-coffee/60 font-round font-bold">
              {interval}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
