import { type SiteTemplateDefaults } from "../types/template";
import { brand } from "../config/brand";

const DEFAULT_TEMPLATE_ID = "wedding-classic";

const templateDefaults: Record<string, SiteTemplateDefaults> = {
  "wedding-classic": {
    config: {
      metadata: {
        title: `${brand.displayName} Wedding`,
        invalidInviteTitle: "Invalid Invite",
      },
      features: {
        showInvalidInvitePage: true,
      },
      sections: [
        { key: "hero", enabled: true },
        { key: "details", enabled: true },
        { key: "gallery", enabled: true },
        { key: "map", enabled: true },
        { key: "rsvp", enabled: true, requiresValidInvite: true },
      ],
    },
    content: {
      names: { first: "Isuru", second: "Aruni" },
      eventDateTime: "2026-05-14T12:00:00",
      eventTime: "09:30 AM",
      venueName: "Mandakini Banquet Hall",
      venueAddress: "Kurunegala Road, Balagalla, Divulapitiya",
      rsvpByDate: "May 01, 2026",
      tagline: "A Celestial Dance of Two Souls",
      heroGreeting: "In the quiet hum of the universe, our paths converged.",
      heroInvite: "Join us as we weave our futures together under the canopy of the stars.",
      quoteText:
        "I love you without knowing how, or when, or from where. I love you straightforwardly, without complexities or pride; so I love you because I know no other way.",
      quoteRef: "— Pablo Neruda, Sonnet XVII",
      detailsTitle: "The Ceremony & Celebration",
      detailsDateSubtitle: "Save the Date",
      detailsTimeSubtitle: "The Golden Hour",
      detailsMapLinkText: "View Map",
      galleryTitle: "Memories from Our Engagement Day",
      mapTitle: "The Destination",
      rsvpTitle: "Confirm Your Presence",
      rsvpDeadlineText: "Kindly let us know by",
      rsvpSuccessAttendingTitle: "You're on the list!",
      rsvpSuccessAttendingBody: "We can't wait to celebrate this cosmic union with you.",
      rsvpSuccessDeclinedTitle: "We'll miss you!",
      rsvpSuccessDeclinedBody:
        "Thank you for letting us know. We're sorry you can't join us, but we hope our paths cross again soon.",
      invitePromptNameLabel: "Your Name(s)",
      invitePromptAttendanceLabel: "Will you join the dance?",
      invitePromptAttendYesLabel: "Joyfully Accept",
      invitePromptAttendNoLabel: "Regretfully Decline",
      submitRsvpLabel: "Send RSVP",
    },
    theme: {
      colors: {
        primary: "#D4AF37",
        secondary: "#556B2F",
        accent: "#800000",
        background: "#FDFCF8",
        text: "#6F4E37",
        muted: "#8B7D6B",
      },
      fonts: {
        heading: "Outfit",
        body: "Inter",
        handwritten: "Dancing Script",
      },
      showBackgroundTexture: true,
      backgroundTextureImageUrl: "/images/paper-2.jpg",
    },
    assets: {
      heroRingImageUrl: "/images/ring.png",
      mapEmbedSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.014974731634!2d80.0262051!3d7.239130100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e3e1821395f1%3A0xeb2264b713646f4b!2sHotel%20Mandakini!5e0!3m2!1sen!2slk!4v1773298620394!5m2!1sen!2slk",
      galleryImages: [
        "/images/1.webp",
        "/images/2.webp",
        "/images/3.webp",
        "/images/5.webp",
        "/images/6.webp",
        "/images/4.webp",
      ],
    },
  },
  "rise-beyond": {
    config: {
      metadata: {
        title: `${brand.displayName} — Rise Beyond`,
        invalidInviteTitle: "Invalid access",
      },
      features: {
        showInvalidInvitePage: true,
      },
      sections: [
        { key: "hero", enabled: true },
        { key: "details", enabled: true },
        { key: "gallery", enabled: true },
        { key: "map", enabled: true },
        { key: "rsvp", enabled: true, requiresValidInvite: true },
      ],
    },
    content: {
      names: { first: "ACME Corp", second: "Annual Summit" },
      eventDateTime: "2026-09-18T09:00:00",
      eventTime: "09:00 AM — 6:00 PM",
      venueName: "Colombo Innovation Hub",
      venueAddress: "Level 12, Example Tower, Colombo 03",
      rsvpByDate: "September 01, 2026",
      tagline: "Momentum. Growth. The next horizon.",
      heroGreeting:
        "You're invited to an executive experience built for leaders who refuse to plateau.",
      heroInvite: "Reserve your seat. The ascent begins together.",
      quoteText:
        "The only way to discover the limits of the possible is to go beyond them into the impossible.",
      quoteRef: "— Arthur C. Clarke",
      detailsTitle: "Mission briefing",
      detailsDateSubtitle: "Key date",
      detailsTimeSubtitle: "Schedule",
      detailsMapLinkText: "Locate venue",
      galleryTitle: "Previous launches",
      mapTitle: "Coordinates",
      rsvpTitle: "Confirm attendance",
      rsvpDeadlineText: "RSVP by",
      rsvpSuccessAttendingTitle: "You're confirmed",
      rsvpSuccessAttendingBody:
        "We received your RSVP. See you at the summit.",
      rsvpSuccessDeclinedTitle: "Response recorded",
      rsvpSuccessDeclinedBody:
        "Thank you for letting us know. We hope to connect on a future initiative.",
      invitePromptNameLabel: "Full name",
      invitePromptAttendanceLabel: "Will you attend?",
      invitePromptAttendYesLabel: "Confirm",
      invitePromptAttendNoLabel: "Decline",
      submitRsvpLabel: "Submit RSVP",
    },
    theme: {
      colors: {
        primary: "#dc2626",
        secondary: "#1d4ed8",
        accent: "#38bdf8",
        background: "#050a15",
        text: "#f8fafc",
        muted: "#94a3b8",
      },
      fonts: {
        heading: "Inter",
        body: "Inter",
        handwritten: "Inter",
      },
      showBackgroundTexture: false,
    },
    assets: {
      heroRingImageUrl: "",
      mapEmbedSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.014974731634!2d80.0262051!3d7.239130100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e3e1821395f1%3A0xeb2264b713646f4b!2sHotel%20Mandakini!5e0!3m2!1sen!2slk!4v1773298620394!5m2!1sen!2slk",
      galleryImages: [
        "/images/1.webp",
        "/images/2.webp",
        "/images/3.webp",
      ],
    },
  },
};

function cloneDefaults(defaults: SiteTemplateDefaults): SiteTemplateDefaults {
  return {
    content: { ...defaults.content, names: { ...defaults.content.names } },
    config: {
      metadata: { ...defaults.config.metadata },
      features: { ...defaults.config.features },
      sections: defaults.config.sections.map((section) => ({ ...section })),
    },
    theme: {
      ...defaults.theme,
      colors: { ...defaults.theme.colors },
      fonts: { ...defaults.theme.fonts },
    },
    assets: {
      ...defaults.assets,
      galleryImages: [...defaults.assets.galleryImages],
    },
  };
}

export function getSiteTemplateDefaults(templateId: string): SiteTemplateDefaults {
  const selectedDefaults =
    templateDefaults[templateId] ?? templateDefaults[DEFAULT_TEMPLATE_ID];
  return cloneDefaults(selectedDefaults);
}

