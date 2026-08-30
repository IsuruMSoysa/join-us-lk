export type SectionKey =
  | "hero"
  | "details"
  | "orderOfDay"
  | "gallery"
  | "map"
  | "rsvp";

/** One row of the optional "Order of the Day" schedule. */
export type OrderOfDayItem = {
  time: string;
  title: string;
  description: string;
};

export type EventContent = {
  names: {
    first: string;
    second: string;
  };
  eventDateTime: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  rsvpByDate: string;
  tagline: string;
  heroGreeting: string;
  heroInvite: string;
  quoteText: string;
  quoteRef: string;
  detailsTitle: string;
  detailsDateSubtitle: string;
  detailsTimeSubtitle: string;
  detailsMapLinkText: string;
  /**
   * Optional: only templates carrying an "orderOfDay" section use these, and
   * site documents saved before the section existed have neither key. Site
   * content is read straight off the Firestore doc without merging template
   * defaults (see InviteSiteLoader), so consumers must tolerate `undefined`.
   */
  orderOfDayTitle?: string;
  orderOfDayItems?: OrderOfDayItem[];
  galleryTitle: string;
  mapTitle: string;
  rsvpTitle: string;
  rsvpDeadlineText: string;
  rsvpSuccessAttendingTitle: string;
  rsvpSuccessAttendingBody: string;
  rsvpSuccessDeclinedTitle: string;
  rsvpSuccessDeclinedBody: string;
  invitePromptNameLabel: string;
  invitePromptAttendanceLabel: string;
  invitePromptAttendYesLabel: string;
  invitePromptAttendNoLabel: string;
  submitRsvpLabel: string;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
};

export type ThemeFonts = {
  heading: string;
  body: string;
  handwritten: string;
};

export type ThemeConfig = {
  colors: ThemeColors;
  fonts: ThemeFonts;
  showBackgroundTexture: boolean;
  backgroundTextureImageUrl?: string;
};

export type SectionConfig = {
  key: SectionKey;
  enabled: boolean;
  requiresValidInvite?: boolean;
};

export type TemplateConfig = {
  metadata: {
    title: string;
    invalidInviteTitle: string;
  };
  features: {
    showInvalidInvitePage: boolean;
  };
  sections: SectionConfig[];
};

export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  sectionKeys: SectionKey[];
  componentPath: string;
};

export type SiteTemplateDefaults = {
  content: EventContent;
  config: TemplateConfig;
  theme: ThemeConfig;
  assets: {
    heroRingImageUrl: string;
    mapEmbedSrc: string;
    galleryImages: string[];
    /** Premium event logo (e.g. Union Awards hero). */
    eventLogoUrl?: string;
  };
};

export type InviteContext = {
  pathname: string;
  siteId: string;
  siteSlug: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  content: EventContent;
  config: TemplateConfig;
  theme: ThemeConfig;
  assets: {
    heroRingImageUrl: string;
    mapEmbedSrc: string;
    galleryImages: string[];
    eventLogoUrl?: string;
  };
};
