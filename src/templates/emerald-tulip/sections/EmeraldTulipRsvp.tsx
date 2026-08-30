import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";
import { submitRsvp } from "../../../lib/firestore/rsvps";
import { Tulip } from "../Tulip";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

type EmeraldTulipRsvpProps = {
  siteId: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

export function EmeraldTulipRsvp({
  siteId,
  inviteeSlug,
  inviteeName,
  personalized,
  content,
}: EmeraldTulipRsvpProps) {
  const [name, setName] = useState(personalized ? inviteeName : "");
  const [attendance, setAttendance] = useState<"" | "yes" | "no">("");
  const [submitStatus, setSubmitStatus] = useState<RsvpSubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // The design shows a hint until both a name and an answer exist, with no
  // error styling — the submit itself stays enabled and validates on click.
  const ready = name.trim().length > 0 && attendance !== "";

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
    <section id="rsvp" className="scroll-mt-6 pt-[min(13vh,120px)]">
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-[30px] border border-[#8ff0c0]/[0.22] bg-gradient-to-br from-[#1fa971]/[0.22] to-[#050f0a]/[0.65] p-[clamp(28px,5vw,76px)] shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-[12px]">
          {/* Oversized decorative bloom, bleeding off the bottom-right corner. */}
          <div className="pointer-events-none absolute -bottom-6 -right-14 z-0 opacity-[0.14]">
            <Tulip height={320} swayDuration={13} />
          </div>

          <div className="relative z-10 max-w-[640px]">
            <p className="et-label text-[11px] tracking-[0.34em]">
              {content.rsvpDeadlineText} {content.rsvpByDate}
            </p>
            <h2 className="et-display mt-4 text-[clamp(38px,6.4vw,78px)] font-light leading-[0.98] text-white">
              {content.rsvpTitle}
            </h2>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-9 rounded-[20px] border border-[#8ff0c0]/35 bg-[#8ff0c0]/[0.09] px-[34px] py-8"
                >
                  <h3 className="et-display text-[34px] font-light leading-[1.16] text-white">
                    {attendance === "no"
                      ? content.rsvpSuccessDeclinedTitle
                      : content.rsvpSuccessAttendingTitle}
                  </h3>
                  <p className="et-ui mt-4 text-[15px] font-light leading-[1.7] text-[#c8e5d6]">
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
                  className="mt-9 flex flex-col gap-7"
                >
                  {submitStatus === "error" && errorMessage ? (
                    <motion.p
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="et-ui rounded-xl border border-[#8b3a3a]/50 bg-[#2a1010]/70 px-4 py-3 text-sm text-[#f2d5d5]"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}

                  <div>
                    <label
                      htmlFor="emerald-tulip-name"
                      className="et-label block text-[10px] tracking-[0.3em]"
                    >
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      id="emerald-tulip-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      placeholder={content.invitePromptNameLabel}
                      className="et-input et-display mt-2 w-full border-0 border-b border-[#8ff0c0]/30 bg-transparent px-0.5 py-3 text-xl font-light text-white outline-none transition-colors duration-[250ms] focus:border-[#8ff0c0] disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <p className="et-label text-[10px] tracking-[0.3em]">
                      {content.invitePromptAttendanceLabel}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-3">
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
                          className={`et-ui whitespace-nowrap rounded-full border px-7 py-3.5 text-xs tracking-[0.14em] transition-all duration-[250ms] ${
                            attendance === opt.id
                              ? "border-[#8ff0c0] bg-[#8ff0c0]/[0.18] text-[#eaf7ef] shadow-[0_0_30px_rgba(95,227,165,0.35)]"
                              : "border-[#8ff0c0]/[0.24] bg-white/[0.03] text-[#a9c9b8] hover:border-[#8ff0c0]/60"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="et-ui rounded-full bg-gradient-to-r from-[#1fa971] to-[#8ff0c0] px-[38px] py-[17px] text-xs font-medium uppercase tracking-[0.2em] text-[#04140d] shadow-[0_14px_44px_rgba(95,227,165,0.35)] transition-all hover:-translate-y-[3px] hover:shadow-[0_20px_56px_rgba(95,227,165,0.55)] disabled:translate-y-0 disabled:opacity-55"
                    >
                      {submitStatus === "submitting"
                        ? "Sending…"
                        : `${content.submitRsvpLabel} →`}
                    </button>
                    {ready ? null : (
                      <span className="et-ui text-[13px] font-light text-[#7fbfa0]">
                        A name and an answer, please.
                      </span>
                    )}
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
