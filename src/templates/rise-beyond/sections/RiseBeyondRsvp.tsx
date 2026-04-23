import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, XCircle } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { submitRsvp } from "../../../lib/firestore/rsvps";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

type RiseBeyondRsvpProps = {
  siteId: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

export function RiseBeyondRsvp({
  siteId,
  inviteeSlug,
  inviteeName,
  personalized,
  content,
}: RiseBeyondRsvpProps) {
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
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-5 py-10 sm:px-10 md:px-14 md:py-16 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.35)]">
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-red-600/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="rise-silver-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase -skew-x-[4deg]">
              {content.rsvpTitle}
            </h2>
            <p className="rise-silver-muted mt-4 font-mono text-xs sm:text-sm uppercase tracking-[0.2em]">
              {content.rsvpDeadlineText}{" "}
              <span className="text-red-400 font-bold">{content.rsvpByDate}</span>
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
                      className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full border border-blue-300/30"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.08, type: "spring", stiffness: 220, damping: 16 }}
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_0_40px_rgba(59,130,246,0.55)]"
                    >
                      {attendance === "no" ? (
                        <XCircle size={36} strokeWidth={2} />
                      ) : (
                        <Check size={36} strokeWidth={3} />
                      )}
                    </motion.div>
                  </div>
                  <h3 className="rise-silver-body-strong text-xl md:text-2xl font-bold mb-3">
                    {attendance === "no"
                      ? content.rsvpSuccessDeclinedTitle
                      : content.rsvpSuccessAttendingTitle}
                  </h3>
                  <p className="rise-silver-muted text-sm md:text-base leading-relaxed">
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
                      className="border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}

                  <div className="space-y-2 -skew-x-[6deg]">
                    <label
                      htmlFor="rise-beyond-name"
                      className="skew-x-[6deg] block font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-blue-300/90"
                    >
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      type="text"
                      id="rise-beyond-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      className="rise-silver-body rise-silver-input skew-x-[6deg] w-full border-0 border-b-2 border-white/20 bg-white/5 px-0 py-3.5 outline-none transition-colors focus:border-red-500 disabled:opacity-60 rounded-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-4 -skew-x-[6deg]">
                    <p className="skew-x-[6deg] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-blue-300/90">
                      {content.invitePromptAttendanceLabel}
                    </p>
                    <div className="skew-x-[6deg] grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className={`min-h-[52px] border-2 px-5 py-3.5 text-left text-sm font-bold uppercase tracking-wide transition-all rounded-md ${
                            attendance === opt.id
                              ? "border-blue-400 bg-blue-600 text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]"
                              : "border-white/15 bg-white/[0.04] rise-silver-body-strong hover:border-white/35"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 -skew-x-[4deg]">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="skew-x-[4deg] flex w-full items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-blue-700 py-4 md:py-5 font-bold uppercase tracking-[0.2em] text-sm text-white transition-opacity disabled:opacity-55 rounded-md border border-white/10 shadow-[0_12px_40px_-12px_rgba(239,68,68,0.45)]"
                    >
                      {submitStatus === "submitting" ? (
                        <div className="h-6 w-6 border-2 border-white/25 border-t-white rounded-full animate-spin" />
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
