import { weddingInvitees } from "../invitees/weddingInvitees";
import { type TemplateDefinition } from "../../types/template";

export const weddingTemplate: TemplateDefinition = {
  id: "wedding",
  routeBase: "/",
  config: {
    metadata: {
      title: "Wedding",
      invalidInviteTitle: "Invalid Invite",
    },
    features: {
      showInvalidInvitePage: false,
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
    heroInvite:
      "Join us as we weave our futures together under the canopy of the stars.",
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
    rsvpSuccessAttendingBody:
      "We can't wait to celebrate this cosmic union with you.",
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
    themeClassName: "theme-wedding",
    showBackgroundTexture: true,
    backgroundTextureImageUrl: "/images/paper-2.jpg",
  },
  invitees: {
    allowedSlugs: weddingInvitees,
    defaultGuestLabel: "Dear Guest",
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
};
