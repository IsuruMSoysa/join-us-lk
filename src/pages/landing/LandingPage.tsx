import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { brand, getDefaultDocumentTitle } from "../../config/brand";
import { Badge } from "../../components/ui/badge";
import { AnimatedSection } from "../../components/shared/AnimatedSection";
import { getPublishedShowcaseProjects } from "../../lib/firestore/showcaseProjects";
import { type ShowcaseProjectWithId } from "../../types/showcaseProject";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";
import { Skeleton } from "../../components/ui/skeleton";
import {
  CalendarHeart,
  LayoutTemplate,
  Link2,
  Mail,
  Linkedin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { FloatingBubbles } from "../../components/decor/FloatingBubbles";

const FEATURES = [
  {
    title: "Template-built, brand-ready",
    body: "Polished invite sites—story, details, gallery, map, RSVP—without starting from a blank page.",
    icon: LayoutTemplate,
  },
  {
    title: "One link per guest",
    body: "Personalized URLs and RSVP flows so seating, dietary notes, and headcounts stay organized.",
    icon: Link2,
  },
  {
    title: "RSVP that actually converts",
    body: "Clear deadlines, friendly copy, and instant capture—your clients see responses as they land.",
    icon: CalendarHeart,
  },
  {
    title: "Portal for your clients",
    body: "Approved hosts export data and manage invitees securely—no inbox archaeology.",
    icon: ShieldCheck,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Brief",
    body: "Share the event vibe, palette, and must-have sections.",
  },
  {
    step: "02",
    title: "Build",
    body: "We shape the site on JoinUs.lk templates and your assets.",
  },
  {
    step: "03",
    title: "Launch",
    body: "Publish, send guest links, and watch RSVPs roll in.",
  },
];

const TEMPLATES = [
  {
    name: "Wedding Classic",
    blurb:
      "Timeless romance—hero story, quote, details, gallery, map, and gated RSVP.",
    accent: "from-secondary/25 to-primary/15",
  },
  {
    name: "Beach Modern",
    blurb:
      "Breezy coastal energy—bold type, airy layout, perfect for destination celebrations.",
    accent: "from-primary/20 to-accent/10",
  },
];

const staggerContainer = (reducedMotion: boolean) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: reducedMotion
      ? { duration: 0.2 }
      : { staggerChildren: 0.09, delayChildren: 0.06 },
  },
});

const staggerItem = (reducedMotion: boolean) => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
  show: reducedMotion
    ? { opacity: 1, transition: { duration: 0.2 } }
    : {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
      },
});

export function LandingPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showcase, setShowcase] = useState<ShowcaseProjectWithId[]>([]);
  const [showcaseLoading, setShowcaseLoading] = useState(true);
  const [showcaseError, setShowcaseError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const whatsappNumberDigitsOnly = "94789436808";
  const whatsappDisplayNumber = "+94789436808";
  const whatsappText = "Hi isuru. I'd like a quote for an invitation website.";
  const whatsappHref = `https://wa.me/${whatsappNumberDigitsOnly}?text=${encodeURIComponent(whatsappText)}`;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBlobY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 72],
  );
  const heroBlobY2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 40],
  );
  const heroFade = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, prefersReducedMotion ? 1 : 0.88],
  );

  useEffect(() => {
    document.title = getDefaultDocumentTitle();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setShowcaseLoading(true);
      setShowcaseError(null);
      try {
        const rows = await getPublishedShowcaseProjects(24);
        if (!cancelled) setShowcase(rows);
      } catch (e) {
        if (!cancelled) {
          setShowcaseError(
            e instanceof Error ? e.message : "Could not load portfolio.",
          );
        }
      } finally {
        if (!cancelled) setShowcaseLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text font-round">
      {!prefersReducedMotion ? (
        <>
          <FloatingBubbles
            count={8}
            minSize={20}
            maxSize={68}
            color="color-mix(in srgb, var(--color-primary) 10%, transparent)"
            maxOpacity={0.9}
            glowColor="color-mix(in srgb, var(--color-primary) 10%, transparent)"
            borderColor="color-mix(in srgb, var(--color-primary) 25%, rgba(255, 255, 255, 0.65))"
          />
          <FloatingBubbles
            count={8}
            minSize={20}
            maxSize={68}
            color="color-mix(in srgb, var(--color-secondary) 8%, transparent)"
            maxOpacity={0.9}
            glowColor="color-mix(in srgb, var(--color-secondary) 8%, transparent)"
            borderColor="color-mix(in srgb, var(--color-secondary) 20%, rgba(255, 255, 255, 0.65))"
          />
          <FloatingBubbles
            count={8}
            minSize={20}
            maxSize={68}
            color="color-mix(in srgb, var(--color-accent) 8%, transparent)"
            maxOpacity={0.9}
            glowColor="color-mix(in srgb, var(--color-accent) 8%, transparent)"
            borderColor="color-mix(in srgb, var(--color-accent) 20%, rgba(255, 255, 255, 0.65))"
          />
        </>
      ) : null}
      <header className="sticky top-0 z-50 border-b border-secondary/10">
        <div className="glass-landing mx-3 mt-3 rounded-2xl px-4 py-3 md:mx-6 md:px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <a
              href="/"
              className="font-display text-xl md:text-2xl font-bold text-secondary tracking-tight"
            >
              <img
                src={"/images/JoinUsLk.png"}
                alt={`Brand Logo`}
                className="h-8 w-auto"
                referrerPolicy="no-referrer"
              />
            </a>
            {/* Desktop nav */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-text/85">
              <a
                href="#features"
                className="hover:text-secondary transition-colors"
              >
                Features
              </a>
              <a
                href="#work"
                className="hover:text-secondary transition-colors"
              >
                Work
              </a>
              <a
                href="#templates"
                className="hover:text-secondary transition-colors"
              >
                Templates
              </a>
              <a
                href="#contact"
                className="hover:text-secondary transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Desktop actions */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/portal"
                className="rounded-xl border border-primary/35 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                Client portal
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-background shadow-md hover:opacity-95 transition-opacity inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp {whatsappDisplayNumber}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="ml-auto inline-flex items-center justify-center rounded-xl border border-secondary/30 bg-background/60 px-2 py-2 text-secondary shadow-sm md:hidden"
              aria-label={
                mobileNavOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>

          {/* Mobile nav dropdown */}
          {mobileNavOpen ? (
            <div className="mt-3 flex flex-col gap-3 md:hidden">
              <nav className="flex flex-col gap-1 text-sm font-medium text-text/90">
                <a
                  href="#features"
                  className="rounded-xl px-3 py-2 hover:bg-secondary/10 hover:text-secondary transition-colors text-left"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#work"
                  className="rounded-xl px-3 py-2 hover:bg-secondary/10 hover:text-secondary transition-colors text-left"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Work
                </a>
                <a
                  href="#templates"
                  className="rounded-xl px-3 py-2 hover:bg-secondary/10 hover:text-secondary transition-colors text-left"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Templates
                </a>
                <a
                  href="#contact"
                  className="rounded-xl px-3 py-2 hover:bg-secondary/10 hover:text-secondary transition-colors text-left"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Contact
                </a>
              </nav>
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/portal"
                  className="inline-flex items-center justify-center rounded-xl border border-primary/35 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Client portal
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-background shadow-md hover:opacity-95 transition-opacity gap-2"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp {whatsappDisplayNumber}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main>
        <section
          ref={heroRef}
          className="relative overflow-hidden px-4 pt-10 pb-20 md:px-6 md:pt-16 md:pb-28"
        >
          {!prefersReducedMotion ? (
            <>
              <motion.div
                style={{ y: heroBlobY, opacity: heroFade }}
                className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
                aria-hidden
              />
              <motion.div
                style={{ y: heroBlobY }}
                className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-secondary/12 blur-3xl"
                aria-hidden
              />
              <motion.div
                style={{ y: heroBlobY2 }}
                className="pointer-events-none absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
                aria-hidden
              />
            </>
          ) : (
            <>
              <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
              <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-secondary/12 blur-3xl" />
            </>
          )}

          <div className="relative max-w-6xl mx-auto text-center space-y-8">
            <Badge
              variant="secondary"
              className="font-round text-xs uppercase tracking-widest px-3 py-1"
            >
              {brand.marketingTagline}
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-[1.08] max-w-4xl mx-auto">
              Invitation websites that feel as special as the{" "}
              <span className="text-secondary">event</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-text/75 leading-relaxed">
              <strong className="text-text font-semibold">
                {brand.displayName}
              </strong>{" "}
              partners with planners, venues, and hosts in Sri Lanka—digital
              invites, per-guest links, RSVP tracking, and a secure dashboard so
              nothing slips through the cracks.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={`mailto:${brand.supportEmail}?subject=JoinUs.lk%20—%20project%20inquiry`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-bold text-background shadow-lg hover:opacity-95 transition-opacity sm:px-8 sm:py-4"
              >
                <Sparkles className="h-5 w-5" aria-hidden />
                Start a conversation
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-secondary/40 px-6 py-3 text-base font-bold text-secondary hover:bg-secondary/10 transition-colors sm:px-8 sm:py-4"
              >
                See real invites
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-secondary px-6 py-3 text-base font-bold text-background shadow-lg hover:opacity-95 transition-opacity sm:px-8 sm:py-4"
              >
                <MessageCircle className="h-5 w-5 mr-1" aria-hidden />
                WhatsApp {whatsappDisplayNumber}
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-28 px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
                Built for busy teams
              </h2>
              <p className="text-center text-text/70 max-w-2xl mx-auto mb-12 text-lg">
                Everything you need to deliver a premium invite
                experience—without the spreadsheet chaos.
              </p>
            </AnimatedSection>
            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              variants={staggerContainer(prefersReducedMotion)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {FEATURES.map((f) => (
                <motion.div
                  key={f.title}
                  variants={staggerItem(prefersReducedMotion)}
                >
                  <div className="glass-landing rounded-3xl p-6 md:p-8 h-full transition-transform duration-300 hover:-translate-y-1 hover:border-primary/35 border border-transparent">
                    <f.icon
                      className="h-10 w-10 text-secondary mb-4"
                      strokeWidth={1.75}
                    />
                    <h3 className="font-display text-xl md:text-2xl font-bold text-text mb-2">
                      {f.title}
                    </h3>
                    <p className="text-text/75 leading-relaxed">{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* <section id="work" className="scroll-mt-28 px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
                Already out in the wild
              </h2>
              <p className="text-center text-text/70 max-w-2xl mx-auto mb-12 text-lg">
                A few live invites powered by JoinUs.lk—curated for couples and
                brands who wanted the full experience.
              </p>
            </AnimatedSection>

            {showcaseLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((k) => (
                  <div
                    key={k}
                    className="glass-landing rounded-3xl overflow-hidden"
                  >
                    <Skeleton className="aspect-4/3 w-full rounded-none" />
                    <div className="p-5 space-y-2">
                      <Skeleton className="h-6 w-[75%]" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showcaseError ? (
              <p className="text-center text-accent text-sm font-medium glass-landing rounded-2xl py-6 px-4">
                {showcaseError}
              </p>
            ) : null}

            {!showcaseLoading && !showcaseError && showcase.length === 0 ? (
              <div className="glass-landing rounded-3xl text-center py-16 px-6">
                <p className="font-display text-xl font-semibold text-text mb-2">
                  Portfolio loading dock
                </p>
                <p className="text-text/70 max-w-md mx-auto">
                  We&apos;re lining up public showcases. Check back soon—or
                  email us and we&apos;ll send live examples.
                </p>
              </div>
            ) : null}

            {!showcaseLoading && !showcaseError && showcase.length > 0 ? (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer(prefersReducedMotion)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {showcase.map((project) => (
                  <motion.article
                    key={project.id}
                    variants={staggerItem(prefersReducedMotion)}
                    className="glass-landing rounded-3xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 border border-transparent"
                  >
                    <div className="aspect-4/3 bg-secondary/10 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-bold text-text">
                        {project.title}
                      </h3>
                      <p className="text-text/70 text-sm mt-1 flex-1">
                        {project.subtitle}
                      </p>
                      {project.siteSlug ? (
                        <Link
                          to={`/${project.siteSlug}`}
                          className="mt-4 inline-flex text-sm font-bold text-secondary hover:text-accent transition-colors"
                        >
                          View live invite →
                        </Link>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : null}
          </div>
        </section> */}

        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-14">
                How we ship it
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s, i) => (
                <div key={s.step}>
                  <AnimatedSection delay={0.08 * i}>
                    <div className="glass-landing rounded-3xl p-8 text-center h-full">
                      <p className="font-display text-4xl font-bold text-primary/90 mb-3">
                        {s.step}
                      </p>
                      <h3 className="font-display text-xl font-bold text-secondary mb-2">
                        {s.title}
                      </h3>
                      <p className="text-text/75">{s.body}</p>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="scroll-mt-28 px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
                Templates that flex
              </h2>
              <p className="text-center text-text/70 max-w-2xl mx-auto mb-12 text-lg">
                Pick a family, tune colors and copy—your clients get a cohesive
                story from save-the-date to thank-you.
              </p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {TEMPLATES.map((t) => (
                <div key={t.name}>
                  <AnimatedSection isZoomIn>
                    <div className="glass-landing rounded-3xl overflow-hidden h-full transition-transform duration-300 hover:-translate-y-1">
                      <div className={`h-36 bg-linear-to-br ${t.accent}`} />
                      <div className="p-8">
                        <h3 className="font-display text-2xl font-bold text-text mb-3">
                          {t.name}
                        </h3>
                        <p className="text-text/75 leading-relaxed">
                          {t.blurb}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section id="developer" className="scroll-mt-28 px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
                Meet the developer
              </h2>
              <p className="text-center text-text/70 max-w-2xl mx-auto text-base">
                Software engineer building the JoinUs.lk experience for invite
                owners and their guests.
              </p>
            </div>

            <AnimatedSection delay={0.08}>
              <div className="glass-landing rounded-3xl p-6 md:p-7 text-center">
                <div className="relative mx-auto w-fit">
                  <div
                    className="absolute -inset-2 rounded-full bg-primary/10 blur-lg"
                    aria-hidden
                  />
                  <img
                    src="/images/my.jpg"
                    alt="Isuru M Soysa"
                    className="relative h-44 w-44 sm:h-40 sm:w-40 rounded-full object-cover border border-secondary/25 shadow-sm"
                    loading="lazy"
                    style={{ filter: "grayscale(1)" }}
                  />
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-text mt-4">
                  Isuru M Soysa
                </h3>
                <p className="text-text/70 mt-1 text-sm md:text-base">
                  Software Engineer based in Sri Lanka
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                  <a
                    href="mailto:info@isurumsoysa.com"
                    className="inline-flex items-center gap-2 text-secondary/90 font-semibold hover:text-secondary transition-colors"
                  >
                    <Mail className="h-5 w-5" aria-hidden />
                    info@isurumsoysa.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/isuru-m-soysa/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-secondary/90 font-semibold hover:text-secondary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" aria-hidden />
                    LinkedIn
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section> */}

        <section id="contact" className="scroll-mt-28 px-6 pb-16">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto glass-dark rounded-3xl px-8 py-14 text-center text-background border border-background/20">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready when you are
              </h2>
              <p className="text-background/85 text-lg mb-8 max-w-xl mx-auto">
                Tell us about the event, timeline, and guest count. We&apos;ll
                map how JoinUs.lk fits—weddings, corporate galas, or anything
                worth celebrating.
              </p>
              <a
                href={`mailto:${brand.supportEmail}`}
                className="inline-flex rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-background shadow-lg hover:opacity-95 transition-opacity"
              >
                Email {brand.supportEmail}
              </a>
            </div>
          </AnimatedSection>
        </section>

        <footer className="border-t border-secondary/15 px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text/70">
            <a
              href="/"
              className="font-display text-xl md:text-2xl font-bold text-secondary tracking-tight"
            >
              <img
                src={"/images/JoinUsLk.png"}
                alt={`Brand Logo`}
                className="h-5 w-auto"
                referrerPolicy="no-referrer"
              />
            </a>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href={`mailto:${brand.supportEmail}`}
                className="hover:text-secondary transition-colors"
              >
                {brand.supportEmail}
              </a>
              <Link
                to="/portal"
                className="hover:text-secondary transition-colors"
              >
                Client portal
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
