import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, HeartCrack, Send } from "lucide-react";
import { AnimatedSection } from "../shared/AnimatedSection";
import { type EventContent } from "../../types/template";

type RsvpSubmitStatus = "idle" | "submitting" | "success" | "error";

const RSVP_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL ?? "";

type RsvpSectionProps = {
  inviteeName: string;
  personalized: boolean;
  content: EventContent;
};

export function RsvpSection({
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

    if (!RSVP_SCRIPT_URL) {
      setSubmitStatus("error");
      setErrorMessage("RSVP is not configured");
      return;
    }

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
      const body = new URLSearchParams({
        name: `trimmedName-${content.eventDateTime}`,
        attendance,
      });
      const res = await fetch(RSVP_SCRIPT_URL, {
        method: "POST",
        body,
        redirect: "follow",
      });
      const text = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = JSON.parse(text) as { ok?: boolean; error?: string };
      } catch {
        if (!res.ok) throw new Error("Request failed");
      }

      if (data.ok === true) {
        setSubmitStatus("success");
        return;
      }
      if (data.ok === false && data.error) {
        setSubmitStatus("error");
        setErrorMessage(data.error);
        return;
      }
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Could not send your RSVP. Please try again or contact us directly.",
      );
    }
  };

  return (
    <section className="py-12">
      <AnimatedSection>
        <div className="glass-dark px-6 py-12 md:p-20 rounded-[4rem] text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-round text-4xl md:text-6xl font-bold mb-6">
              {content.rsvpTitle}
            </h2>
            <p className="font-round text-lg text-cream/70 mb-6">
              {content.rsvpDeadlineText}{" "}
              <span className="text-gold font-bold">{content.rsvpByDate}</span>
            </p>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10"
                >
                  {attendance === "no" ? (
                    <>
                      <div className="inline-flex p-6 bg-cream/10 rounded-full mb-6 text-cream/40">
                        <HeartCrack size={48} />
                      </div>
                      <h3 className="font-round text-3xl font-bold mb-4">
                        {content.rsvpSuccessDeclinedTitle}
                      </h3>
                      <p className="text-cream/60">
                        {content.rsvpSuccessDeclinedBody}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex p-6 bg-gold/20 rounded-full mb-6">
                        <Heart size={48} className="text-gold fill-gold" />
                      </div>
                      <h3 className="font-round text-3xl font-bold mb-4">
                        {content.rsvpSuccessAttendingTitle}
                      </h3>
                      <p className="text-cream/60">
                        {content.rsvpSuccessAttendingBody}
                      </p>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 text-left"
                >
                  {submitStatus === "error" && errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-maroon/20 border border-maroon/50 text-cream p-4 rounded-2xl text-sm"
                    >
                      {errorMessage}
                    </motion.p>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold uppercase tracking-widest text-gold/80 ml-4"
                    >
                      {content.invitePromptNameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitStatus === "submitting"}
                      className="w-full bg-cream/5 border-2 border-cream/10 rounded-3xl px-8 py-5 focus:border-gold/50 focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="e.g. John & Jane"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-gold/80 ml-4">
                      {content.invitePromptAttendanceLabel}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          onClick={() => setAttendance(opt.id as "yes" | "no")}
                          className={`flex items-center justify-between px-8 py-5 rounded-3xl border-2 transition-all ${
                            attendance === opt.id
                              ? "bg-gold text-coffee border-gold"
                              : "bg-cream/5 border-cream/10 hover:border-cream/30"
                          }`}
                        >
                          <span className="font-bold">{opt.label}</span>
                          <opt.icon
                            size={20}
                            className={
                              attendance === opt.id
                                ? "text-coffee"
                                : "text-gold"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="w-full bg-gold text-coffee font-round font-bold py-6 rounded-3xl shadow-xl shadow-gold/10 hover:shadow-gold/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                    >
                      {submitStatus === "submitting" ? (
                        <div className="w-6 h-6 border-4 border-coffee/30 border-t-coffee rounded-full animate-spin" />
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
