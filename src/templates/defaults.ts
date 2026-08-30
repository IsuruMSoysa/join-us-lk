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
  "union-awards": {
    config: {
      metadata: {
        title: `${brand.displayName} — Union Assurance Annual Awards`,
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
      names: { first: "Union Assurance", second: "Annual Awards 2026" },
      eventDateTime: "2026-06-20T18:00:00",
      eventTime: "6:00 PM — 11:00 PM",
      venueName: "Grand Ballroom, Cinnamon Grand Colombo",
      venueAddress: "77 Galle Road, Colombo 03",
      rsvpByDate: "June 01, 2026",
      tagline: "Legacy to infinity — a night beyond time.",
      heroGreeting:
        "You are cordially invited to celebrate excellence, resilience, and the people who shape our tomorrow.",
      heroInvite: "Confirm your presence for an evening of prestige and recognition.",
      quoteText:
        "The future belongs to those who believe in the beauty of their dreams.",
      quoteRef: "— Eleanor Roosevelt",
      detailsTitle: "The evening",
      detailsDateSubtitle: "Mark the date",
      detailsTimeSubtitle: "Schedule",
      detailsMapLinkText: "View venue map",
      galleryTitle: "Moments through time",
      mapTitle: "Destination in time",
      rsvpTitle: "Your commitment",
      rsvpDeadlineText: "RSVP by",
      rsvpSuccessAttendingTitle: "You're confirmed",
      rsvpSuccessAttendingBody:
        "We received your RSVP. We look forward to hosting you at the Annual Awards.",
      rsvpSuccessDeclinedTitle: "Response recorded",
      rsvpSuccessDeclinedBody:
        "Thank you for letting us know. We hope to see you at a future occasion.",
      invitePromptNameLabel: "Full name",
      invitePromptAttendanceLabel: "Will you attend?",
      invitePromptAttendYesLabel: "Accept with pleasure",
      invitePromptAttendNoLabel: "Regretfully decline",
      submitRsvpLabel: "Submit RSVP",
    },
    theme: {
      colors: {
        primary: "#daa520",
        secondary: "#ff6600",
        accent: "#ffb347",
        background: "#080808",
        text: "#e8dcc8",
        muted: "#8b7355",
      },
      fonts: {
        heading: "Montserrat",
        body: "Montserrat",
        handwritten: "Montserrat",
      },
      showBackgroundTexture: false,
    },
    assets: {
      heroRingImageUrl: "",
      mapEmbedSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.014974731634!2d80.0262051!3d7.239130100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e3e1821395f1%3A0xeb2264b713646f4b!2sHotel%20Mandakini!5e0!3m2!1sen!2slk!4v1773298620394!5m2!1sen!2slk",
      galleryImages: ["/images/1.webp", "/images/2.webp", "/images/3.webp"],
      eventLogoUrl:
        "https://storage.googleapis.com/gallery_images_join_us_lk/union%20assurance/event%20logo.png",
    },
  },
  evergreen: {
    config: {
      metadata: {
        title: `${brand.displayName} — Evergreen`,
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
      names: { first: "Amaya", second: "Ruwan" },
      eventDateTime: "2026-11-14T16:30:00",
      eventTime: "4:30 PM — 11:00 PM",
      venueName: "The Pine Grove, Nuwara Eliya",
      venueAddress: "Moon Plains Road, Nuwara Eliya",
      rsvpByDate: "October 20, 2026",
      tagline: "Two hearts, one forest, forever.",
      heroGreeting: "Together with their families",
      heroInvite:
        "Join us beneath the pines as we say our vows, and stay for an evening of dinner, dancing and firelight.",
      quoteText:
        "And into the forest I go, to lose my mind and find my soul.",
      quoteRef: "— John Muir",
      detailsTitle: "The celebration",
      detailsDateSubtitle: "The day",
      detailsTimeSubtitle: "The hour",
      detailsMapLinkText: "The place",
      galleryTitle: "Moments among the pines",
      mapTitle: "Find us in the woods",
      rsvpTitle: "Will you join us?",
      rsvpDeadlineText: "Kindly respond by",
      rsvpSuccessAttendingTitle: "We'll see you under the canopy",
      rsvpSuccessAttendingBody:
        "Your RSVP is confirmed. We can't wait to celebrate with you among the pines.",
      rsvpSuccessDeclinedTitle: "Response received",
      rsvpSuccessDeclinedBody:
        "Thank you for letting us know. You'll be in our thoughts on the day.",
      invitePromptNameLabel: "Your name",
      invitePromptAttendanceLabel: "Will you be joining us?",
      invitePromptAttendYesLabel: "Joyfully accept",
      invitePromptAttendNoLabel: "Regretfully decline",
      submitRsvpLabel: "Send RSVP",
    },
    theme: {
      colors: {
        primary: "#7FA88C",
        secondary: "#16452F",
        accent: "#DCE8E0",
        background: "#04120C",
        text: "#FFFFFF",
        muted: "#7FA88C",
      },
      fonts: {
        heading: "Cormorant Garamond",
        body: "Cormorant Garamond",
        handwritten: "Dancing Script",
      },
      showBackgroundTexture: false,
    },
    assets: {
      heroRingImageUrl: "",
      mapEmbedSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.014974731634!2d80.0262051!3d7.239130100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e3e1821395f1%3A0xeb2264b713646f4b!2sHotel%20Mandakini!5e0!3m2!1sen!2slk!4v1773298620394!5m2!1sen!2slk",
      galleryImages: ["/images/1.webp", "/images/2.webp", "/images/3.webp"],
    },
  },
  "emerald-tulip": {
    config: {
      metadata: {
        title: `${brand.displayName} — Madhushanka & Salani`,
        invalidInviteTitle: "Invalid Invite",
      },
      features: {
        showInvalidInvitePage: true,
      },
      sections: [
        { key: "hero", enabled: true },
        { key: "details", enabled: true },
        // Optional section — off unless the couple turns it on and adds rows.
        { key: "orderOfDay", enabled: false },
        { key: "gallery", enabled: true },
        { key: "map", enabled: true },
        { key: "rsvp", enabled: true, requiresValidInvite: true },
      ],
    },
    content: {
      names: { first: "Madhushanka", second: "Salani" },
      // The Poruwa, not the 8.00 AM doors — this is what the countdown targets.
      eventDateTime: "2026-10-21T09:03:00",
      eventTime: "8.00 AM — 3.30 PM",
      venueName: "Iris Hall, Purple Sun Resort",
      venueAddress: "New Ratnapura Road, Avissawella",
      rsvpByDate: "October 07, 2026",
      tagline:
        "Two families, a room full of tulips, and one “I do” we'd love you to witness.",
      heroGreeting:
        "Together with their families · we invite you to our wedding",
      // Sits beside the countdown, and reads as one sentence with its eyebrow.
      heroInvite: "until we say the two best words we know.",
      // The gallery's closing quote card and its signature.
      quoteText: "Still the best decision either of us has ever made.",
      quoteRef: "M & S",
      detailsTitle: "The details",
      detailsDateSubtitle: "The day",
      detailsTimeSubtitle: "The hour",
      detailsMapLinkText: "The place",
      orderOfDayTitle: "Order of the day",
      orderOfDayItems: [],
      galleryTitle: "How we got here",
      mapTitle: "Getting there",
      rsvpTitle: "Say you'll come",
      rsvpDeadlineText: "Kindly reply by",
      rsvpSuccessAttendingTitle: "You're on the list — a seat is yours.",
      rsvpSuccessAttendingBody:
        "Directions, dress notes and everything else you need are on their way.",
      rsvpSuccessDeclinedTitle: "We'll miss you.",
      rsvpSuccessDeclinedBody:
        "We'll save you a tulip and send photos from the day.",
      invitePromptNameLabel: "Your name",
      invitePromptAttendanceLabel: "Will you be joining us?",
      invitePromptAttendYesLabel: "Joyfully, yes",
      invitePromptAttendNoLabel: "Sadly, no",
      submitRsvpLabel: "Send it",
    },
    theme: {
      colors: {
        primary: "#1FA971",
        secondary: "#16402D",
        accent: "#8FF0C0",
        background: "#050F0A",
        text: "#EAF7EF",
        muted: "#7FBFA0",
      },
      fonts: {
        heading: "Cormorant Garamond",
        body: "Jost",
        handwritten: "Cormorant Garamond",
      },
      showBackgroundTexture: false,
    },
    assets: {
      heroRingImageUrl: "",
      // Query-based embed — works without an API key. Swap for a place-pinned
      // `/maps/embed?pb=` URL once the venue's exact pin is confirmed.
      mapEmbedSrc:
        "https://www.google.com/maps?q=Purple+Sun+Resort,+New+Ratnapura+Road,+Avissawella&output=embed",
      galleryImages: ["/images/1.webp", "/images/2.webp", "/images/3.webp"],
    },
  },
};

function cloneDefaults(defaults: SiteTemplateDefaults): SiteTemplateDefaults {
  return {
    content: {
      ...defaults.content,
      names: { ...defaults.content.names },
      // Copy the rows too, or every site seeded from a template would share
      // one array instance with the module-level defaults.
      orderOfDayItems: defaults.content.orderOfDayItems?.map((item) => ({
        ...item,
      })),
    },
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

