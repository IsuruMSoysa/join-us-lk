import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, XCircle } from "lucide-react";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { submitRsvp } from "../../../lib/firestore/rsvps";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

type EvergreenRsvpProps = {
  siteId: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

export function EvergreenRsvp({
  siteId,
  inviteeSlug,
  inviteeName,
  personalized,
  content,
}: EvergreenRsvpProps) {
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
        <div className="relative overflow-hidden rounded-3xl border border-[#16452F] bg-[#0B2A1E]/45 backdrop-blur-xl px-5 py-10 sm:px-10 md:px-14 md:py-16 shadow-[inset_0_1px_0_rgba(220,232,224,0.07),0_36px_90px_-44px_rgba(0,0,0,0.95)]">
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#DCE8E0]/[0.06] blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="eg-serif-display text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
              {content.rsvpTitle}
            </h2>
            <p className="eg-muted-text mt-4 text-sm sm:text-base">
              {content.rsvpDeadlineText}{" "}
              <span className="text-[#DCE8E0]">{content.rsvpByDate}</span>
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
                      className="absolute inset-0 rounded-full border border-[#7FA88C]/55"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full border border-[#DCE8E0]/25"
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
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DCE8E0] to-[#7FA88C] text-[#04120C] shadow-[0_0_40px_rgba(180,214,192,0.35)]"
                    >
                      {attendance === "no" ? (
                        <XCircle size={34} strokeWidth={1.8} />
                      ) : (
                        <Check size={34} strokeWidth={2.4} />
                      )}
                    </motion.div>
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-3">
                    {attendance === "no"
                      ? content.rsvpSuccessDeclinedTitle
                      : content.rsvpSuccessAttendingTitle}
                  </h3>
                  <p className="eg-muted-text text-sm md:text-base leading-relaxed">
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
                      className="rounded-xl border border-[#8b3a3a]/50 bg-[#2a1010]/70 px-4 py-3 text-sm text-[#f2d5d5]"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}

                  <div className="space-y-2.5">
                    <label
                      htmlFor="evergreen-name"
                      className="eg-label block text-[10px] sm:text-xs font-medium"
                    >
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      type="text"
                      id="evergreen-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      className="eg-input w-full rounded-xl border border-[#16452F] bg-[#04120C]/50 p-3.5 text-[#DCE8E0] outline-none transition-all focus:border-[#7FA88C] focus:bg-[#04120C]/70 focus:shadow-[0_0_26px_rgba(127,168,140,0.18)] disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="eg-label text-[10px] sm:text-xs font-medium">
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
                          className={`min-h-[52px] rounded-xl border px-5 py-3.5 text-left text-sm tracking-wide transition-all ${
                            attendance === opt.id
                              ? "border-[#DCE8E0] bg-[#DCE8E0] text-[#04120C] shadow-[0_0_28px_rgba(180,214,192,0.28)]"
                              : "border-[#16452F] bg-[#04120C]/40 text-[#DCE8E0] hover:border-[#7FA88C]/60"
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCE8E0]/25 bg-gradient-to-r from-[#DCE8E0] to-[#a9cbb6] py-4 md:py-5 text-sm uppercase tracking-[0.22em] text-[#04120C] transition-opacity disabled:opacity-55 shadow-[0_16px_44px_-18px_rgba(180,214,192,0.55)]"
                    >
                      {submitStatus === "submitting" ? (
                        <div className="h-6 w-6 rounded-full border-2 border-[#04120C]/25 border-t-[#04120C] animate-spin" />
                      ) : (
                        <>
                          <span>{content.submitRsvpLabel}</span>
                          <ChevronRight size={20} strokeWidth={2} />
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
