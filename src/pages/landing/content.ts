import { Link2, CalendarHeart, LayoutTemplate, ShieldCheck } from "lucide-react";

export const EVENT_WORDS = [
  "Weddings",
  "Homecomings",
  "Engagements",
  "Birthdays",
  "Corporate galas",
  "Anniversaries",
  "Launch nights",
];

export const FEATURES = [
  {
    title: "One link per guest",
    body: "Personal URLs keep seating, dietary notes and headcounts sorted.",
    icon: Link2,
    dotClassName: "bg-primary shadow-[0_0_14px_3px_var(--color-primary)]",
  },
  {
    title: "Live RSVPs",
    body: "Friendly deadlines and instant replies — watch the list fill up.",
    icon: CalendarHeart,
    dotClassName: "bg-secondary shadow-[0_0_14px_3px_var(--color-secondary)]",
  },
  {
    title: "Ready-made templates",
    body: "Story, gallery, map and RSVP without a blank page.",
    icon: LayoutTemplate,
    dotClassName: "bg-accent shadow-[0_0_14px_3px_var(--color-accent)]",
  },
  {
    title: "Host portal",
    body: "Hosts and planners export guests and manage invites securely.",
    icon: ShieldCheck,
    dotClassName: "bg-text shadow-[0_0_14px_3px_var(--color-text)]",
  },
];

export const STEPS = [
  {
    step: "01",
    title: "Brief",
    body: "Share the event vibe, palette and must-have sections.",
  },
  {
    step: "02",
    title: "Build",
    body: "We shape the site on JoinUs.lk templates with your assets.",
  },
  {
    step: "03",
    title: "Launch",
    body: "Publish, send guest links, and watch RSVPs roll in.",
  },
];

export const QUOTES = [
  {
    quote:
      "Placeholder: a couple on how easy RSVPs were and how guests loved their link.",
    who: "[Couple name] · [Venue], [Month Year]",
  },
  {
    quote:
      "Placeholder: a planner on exporting the seating list in one click.",
    who: "[Planner name] · [Company]",
  },
  {
    quote: "Placeholder: a venue manager on fewer calls chasing headcounts.",
    who: "[Name] · [Venue]",
  },
];
