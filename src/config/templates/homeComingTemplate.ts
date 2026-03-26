import { homeComingInvitees } from "../invitees/homeComingInvitees";
import { type TemplateDefinition } from "../../types/template";

export const homeComingTemplate: TemplateDefinition = {
  id: "homeComing",
  routeBase: "/home-coming",
  config: {
    metadata: {
      title: "Home Coming",
      invalidInviteTitle: "Invalid Home Coming Invite",
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
    eventDateTime: "2026-05-17T18:30:00",
    eventTime: "06:30 PM",
    venueName: "Isuru's Sweet Home",
    venueAddress: "105/1, Delgahawatta, Melagama, Wadduwa",
    rsvpByDate: "May 01, 2026",
    tagline: "An Evening of Homecoming and Joy",
    heroGreeting: "Our hearts return home after the vows.",
    heroInvite: "Join us for a warm celebration with our family and friends.",
    quoteText:
      "For the two of us, home isn't a place. It is a person. And we are finally home.",
    quoteRef: "Stephanie Perkins",
    detailsTitle: "Home Coming Celebration",
    detailsDateSubtitle: "Save the Date",
    detailsTimeSubtitle: "Evening Celebration",
    detailsMapLinkText: "Open Venue",
    galleryTitle: "Memories from Our Engagement Day",
    mapTitle: "Celebration Venue",
    rsvpTitle: "Confirm Your Presence",
    rsvpDeadlineText: "Please let us know by",
    rsvpSuccessAttendingTitle: "Wonderful! See you there.",
    rsvpSuccessAttendingBody:
      "Thank you for confirming. We are excited to celebrate with you.",
    rsvpSuccessDeclinedTitle: "We will miss you this time.",
    rsvpSuccessDeclinedBody:
      "Thank you for your response. Sending love, and we hope to meet soon.",
    invitePromptNameLabel: "Guest Name(s)",
    invitePromptAttendanceLabel: "Will you join our home coming?",
    invitePromptAttendYesLabel: "Yes, with love",
    invitePromptAttendNoLabel: "Sorry, cannot make it",
    submitRsvpLabel: "Send Response",
  },
  theme: {
    themeClassName: "theme-home-coming",
    showBackgroundTexture: true,
    backgroundTextureImageUrl: "/images/paper-2.jpg",
  },
  invitees: {
    allowedSlugs: homeComingInvitees,
    defaultGuestLabel: "Dear Friend",
  },
  assets: {
    heroRingImageUrl: "/images/ring.png",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1401.0676193396034!2d79.94246640092325!3d6.669503463164127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2slk!4v1774289894963!5m2!1sen!2slk",
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
