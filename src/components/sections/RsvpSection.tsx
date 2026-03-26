import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, HeartCrack, Send } from "lucide-react";
import { AnimatedSection } from "../shared/AnimatedSection";
import { type EventContent } from "../../types/template";
import { submitRsvp } from "../../lib/firestore/rsvps";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

type RsvpSectionProps = {
  siteId: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

export function RsvpSection({
  siteId,
  inviteeSlug,
  inviteeName,
  personalized,
  content,
}: RsvpSectionProps) {
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
    <section className="py-10 md:py-14">
      <AnimatedSection>
        <div className="rsvp-panel px-5 py-10 sm:px-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-round text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              {content.rsvpTitle}
            </h2>
            <p className="font-round text-base sm:text-lg rsvp-muted mb-6">
              {content.rsvpDeadlineText}{" "}
              <span className="rsvp-label font-bold">{content.rsvpByDate}</span>
            </p>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 md:py-10"
                >
                  {attendance === "no" ? (
                    <>
                      <div className="inline-flex p-5 md:p-6 rounded-full mb-6 rsvp-control text-[var(--rsvp-icon-muted)]">
                        <HeartCrack size={48} />
                      </div>
                      <h3 className="font-round text-2xl md:text-3xl font-bold mb-4">
                        {content.rsvpSuccessDeclinedTitle}
                      </h3>
                      <p className="rsvp-muted">
                        {content.rsvpSuccessDeclinedBody}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex p-5 md:p-6 rounded-full mb-6 rsvp-choice-selected">
                        <Heart size={48} className="fill-current" />
                      </div>
                      <h3 className="font-round text-2xl md:text-3xl font-bold mb-4">
                        {content.rsvpSuccessAttendingTitle}
                      </h3>
                      <p className="rsvp-muted">
                        {content.rsvpSuccessAttendingBody}
                      </p>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 md:space-y-8 text-left"
                >
                  {submitStatus === "error" && errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rsvp-error border p-4 rounded-2xl text-sm"
                    >
                      {errorMessage}
                    </motion.p>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-bold uppercase tracking-widest rsvp-label ml-2 sm:ml-4"
                    >
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      className="w-full rsvp-control border-2 rounded-2xl md:rounded-3xl px-5 sm:px-6 md:px-8 py-4 md:py-5 transition-colors disabled:opacity-60"
                      placeholder="e.g. John & Jane"
                    />
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest rsvp-label ml-2 sm:ml-4">
                      {content.invitePromptAttendanceLabel}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {[
                        {
                          id: "yes",
                          label: content.invitePromptAttendYesLabel,
                          icon: Heart,
                        },
                        {
                          id: "no",
                          label: content.invitePromptAttendNoLabel,
                          icon: HeartCrack,
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={attendance === opt.id}
                          onClick={() => setAttendance(opt.id as "yes" | "no")}
                          className={`rsvp-choice flex items-center justify-between px-5 sm:px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-3xl border-2 min-h-16 md:min-h-[78px] transition-all ${
                            attendance === opt.id
                              ? "rsvp-choice-selected scale-[1.01]"
                              : ""
                          }`}
                        >
                          <span className="font-bold text-sm sm:text-base">
                            {opt.label}
                          </span>
                          <opt.icon
                            size={20}
                            className={
                              attendance === opt.id
                                ? ""
                                : "rsvp-choice-icon-muted"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 md:pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="w-full rsvp-submit font-round font-bold py-4 md:py-6 rounded-2xl md:rounded-3xl transition-all disabled:opacity-60 flex items-center justify-center gap-3 text-base md:text-lg min-h-14 md:min-h-16"
                    >
                      {submitStatus === "submitting" ? (
                        <div className="w-6 h-6 border-4 border-current/30 border-t-current rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{content.submitRsvpLabel}</span>
                          <Send size={20} />
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
