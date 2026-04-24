import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, XCircle } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { submitRsvp } from "../../../lib/firestore/rsvps";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

type UnionAwardsRsvpProps = {
  siteId: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

export function UnionAwardsRsvp({
  siteId,
  inviteeSlug,
  inviteeName,
  personalized,
  content,
}: UnionAwardsRsvpProps) {
  const [name, setName] = useState(personalized ? inviteeName : "");
  const [attendance, setAttendance] = useState<"" | "yes" | "no">("");
  const [submitStatus, setSubmitStatus] = useState<RsvpSubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setSubmitStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (attendance !== "yes" && attendance !== "no") {
      setSubmitStatus("error");
      setErrorMessage("Please choose whether you can join us.");
      return;
    }

    setSubmitStatus("submitting");

    try {
      await submitRsvp(siteId, {
        inviteeSlug,
        name: trimmedName,
        attendance,
      });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Could not send your RSVP. Please try again or contact us directly.",
      );
    }
  };

  return (
    <section className="py-16 md:py-24">
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-2xl border border-[#b8860b]/30 bg-white/[0.04] backdrop-blur-xl px-5 py-10 sm:px-10 md:px-14 md:py-16 shadow-[0_32px_90px_-40px_rgba(255,165,0,0.35)]">
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-amber-500/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#ff6600]/15 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#ff8c00] mb-3">
              The commitment
            </p>
            <h2 className="ua-gold-display ua-shimmer font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase">
              {content.rsvpTitle}
            </h2>
            <p className="text-[#a89880] mt-4 font-mono text-xs sm:text-sm uppercase tracking-[0.18em]">
              {content.rsvpDeadlineText}{" "}
              <span className="text-[#ffb347] font-bold">
                {content.rsvpByDate}
              </span>
            </p>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 md:py-12"
                >
                  <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#daa520]/60"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full border border-[#ffd700]/35"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.08,
                        type: "spring",
                        stiffness: 220,
                        damping: 16,
                      }}
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.15,
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#daa520] to-[#ff8c00] text-black shadow-[0_0_40px_rgba(255,200,80,0.55)]"
                    >
                      {attendance === "no" ? (
                        <XCircle size={36} strokeWidth={2} />
                      ) : (
                        <Check size={36} strokeWidth={3} />
                      )}
                    </motion.div>
                  </div>
                  <h3 className="text-[#f5ebe0] text-xl md:text-2xl font-bold mb-3">
                    {attendance === "no"
                      ? content.rsvpSuccessDeclinedTitle
                      : content.rsvpSuccessAttendingTitle}
                  </h3>
                  <p className="text-[#a89880] text-sm md:text-base leading-relaxed">
                    {attendance === "no"
                      ? content.rsvpSuccessDeclinedBody
                      : content.rsvpSuccessAttendingBody}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -16 }}
                  onSubmit={handleSubmit}
                  className="mt-10 space-y-8 text-left"
                >
                  {submitStatus === "error" && errorMessage ? (
                    <motion.p
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-[#b45309]/50 bg-[#2a1508]/80 px-4 py-3 text-sm text-[#fed7aa]"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}

                  <div className="space-y-2">
                    <label
                      htmlFor="union-awards-name"
                      className="block font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#ffb347]/95"
                    >
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      type="text"
                      id="union-awards-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      className="w-full border-0 border-b-2 border-[#b8860b]/35 bg-white/[0.04] p-3.5 outline-none transition-all rounded-none text-[#f0e6d8] placeholder:text-[#6b5b4f] focus:border-[#ffa500] focus:shadow-[0_0_24px_rgba(255,165,0,0.2)] focus:bg-white/[0.06] disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#ffb347]/95">
                      {content.invitePromptAttendanceLabel}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            id: "yes" as const,
                            label: content.invitePromptAttendYesLabel,
                          },
                          {
                            id: "no" as const,
                            label: content.invitePromptAttendNoLabel,
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={attendance === opt.id}
                          onClick={() => setAttendance(opt.id)}
                          className={`min-h-[52px] border-2 px-5 py-3.5 text-left text-sm font-bold uppercase tracking-wide transition-all rounded-sm ${
                            attendance === opt.id
                              ? "border-[#ffd700] bg-gradient-to-r from-[#b8860b] to-[#ffa500] text-black shadow-[0_0_28px_rgba(255,200,80,0.35)]"
                              : "border-[#5c4d3a]/50 bg-white/[0.04] text-[#e8dcc8] hover:border-[#c9a227]/55"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#ffa500] to-[#ff6b00] py-4 md:py-5 font-bold uppercase tracking-[0.2em] text-sm text-black transition-opacity disabled:opacity-55 rounded-sm border border-[#ffd700]/30 shadow-[0_12px_40px_rgba(255,165,0,0.4)]"
                    >
                      {submitStatus === "submitting" ? (
                        <div className="h-6 w-6 border-2 border-black/25 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{content.submitRsvpLabel}</span>
                          <ChevronRight size={22} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
