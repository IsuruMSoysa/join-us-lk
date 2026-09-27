import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { OliveLeaf } from "../OliveLeaf";
import { type EventContent } from "../../../types/template";
import { submitRsvp } from "../../../lib/firestore/rsvps";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

type OliveGardenRsvpProps = {
  siteId: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

function getOrdinalDay(eventDateTime: string): string {
  const date = new Date(eventDateTime);
  if (Number.isNaN(date.getTime())) return "";
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${day}${suffix}`;
}

/** Fills the {name}/{venue}/{ordinalDay} tokens in the stored success copy. */
function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** A faint leaf sprig for the RSVP card's corners. */
function Sprig({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none absolute opacity-[0.14] ${className}`} aria-hidden>
      <div className="relative h-16 w-16">
        <OliveLeaf size={30} color="#4a5a22" rotation={-20} />
        <OliveLeaf size={22} color="#6b7a3a" rotation={18} style={{ left: 14, top: 10 }} />
        <OliveLeaf size={16} color="#869347" rotation={-4} style={{ left: 6, top: 22 }} />
      </div>
    </div>
  );
}

export function OliveGardenRsvp({
  siteId,
  inviteeSlug,
  inviteeName,
  personalized,
  content,
}: OliveGardenRsvpProps) {
  const [name, setName] = useState(personalized ? inviteeName : "");
  const [attendance, setAttendance] = useState<"" | "yes" | "no">("");
  const [submitStatus, setSubmitStatus] = useState<RsvpSubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      await submitRsvp(siteId, { inviteeSlug, name: trimmedName, attendance });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Could not send your RSVP. Please try again or contact us directly.");
    }
  };

  const interpolationValues = {
    name: name.trim(),
    venue: content.venueName,
    ordinalDay: getOrdinalDay(content.eventDateTime),
  };

  return (
    <section id="rsvp" className="scroll-mt-6 pt-[min(13vh,120px)]">
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-[30px] bg-[#fbf8ee] p-[clamp(28px,5vw,64px)] shadow-[0_12px_30px_rgba(74,90,34,0.25)]">
          <Sprig className="left-4 top-4" />
          <Sprig className="bottom-4 right-4 rotate-180" />

          <div className="relative z-10 mx-auto max-w-[620px] text-center">
            <p className="og-label text-[11px] uppercase tracking-[0.34em] text-[#85641b]">
              KINDLY REPLY BY {content.rsvpByDate}
            </p>
            <h2 className="og-serif mt-4 text-[clamp(32px,5vw,52px)] font-light leading-[1.05] text-[#3d4224]">
              {content.rsvpTitle}
            </h2>
            <p className="og-ui mt-3 text-[14px] font-light text-[#555a38]">
              Just your name and an answer. (We're secretly hoping it's a yes.)
            </p>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-9 rounded-[20px] bg-[#4a5a22]/[0.08] px-[34px] py-8 text-left"
                >
                  <h3 className="og-serif text-[28px] font-light leading-[1.2] text-[#3d4224]">
                    {interpolate(
                      attendance === "no"
                        ? content.rsvpSuccessDeclinedTitle
                        : content.rsvpSuccessAttendingTitle,
                      interpolationValues,
                    )}
                  </h3>
                  <p className="og-ui mt-4 text-[15px] font-light leading-[1.7] text-[#555a38]">
                    {interpolate(
                      attendance === "no"
                        ? content.rsvpSuccessDeclinedBody
                        : content.rsvpSuccessAttendingBody,
                      interpolationValues,
                    )}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -16 }}
                  onSubmit={handleSubmit}
                  className="mt-9 flex flex-col items-center gap-7 text-left"
                >
                  {submitStatus === "error" && errorMessage ? (
                    <motion.p
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="og-ui w-full rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}

                  <div className="w-full">
                    <label htmlFor="olive-garden-name" className="og-label block text-[10px] uppercase tracking-[0.3em] text-[#85641b]">
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      id="olive-garden-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      placeholder={content.invitePromptNameLabel}
                      className="og-serif mt-2 w-full border-0 border-b border-[#b7bc82] bg-transparent px-0.5 py-3 text-xl font-light text-[#3d4224] outline-none transition-colors focus:border-[#4a5a22] disabled:opacity-60"
                    />
                  </div>

                  <div className="w-full">
                    <p className="og-label text-[10px] uppercase tracking-[0.3em] text-[#85641b]">
                      {content.invitePromptAttendanceLabel}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-3">
                      {(
                        [
                          { id: "yes" as const, label: content.invitePromptAttendYesLabel },
                          { id: "no" as const, label: content.invitePromptAttendNoLabel },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={attendance === opt.id}
                          onClick={() => setAttendance(opt.id)}
                          className={`og-ui whitespace-nowrap rounded-full border px-7 py-3.5 text-xs tracking-[0.1em] transition-all ${
                            attendance === opt.id
                              ? "border-[#4a5a22] bg-[#4a5a22] text-[#f6f1e4]"
                              : "border-[#b7bc82] bg-transparent text-[#555a38] hover:border-[#4a5a22]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="og-ui rounded-full bg-[#4a5a22] px-[38px] py-[17px] text-xs font-medium uppercase tracking-[0.2em] text-[#f6f1e4] shadow-[0_14px_30px_rgba(74,90,34,0.3)] transition-all hover:-translate-y-[3px] disabled:translate-y-0 disabled:opacity-55"
                    >
                      {submitStatus === "submitting" ? "Sending…" : "Send with love →"}
                    </button>
                    {ready ? null : (
                      <span className="og-ui text-[13px] font-light text-[#6b7a3a]">
                        Your name and an answer, please.
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
