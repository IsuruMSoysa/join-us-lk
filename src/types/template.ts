export type SectionKey = "hero" | "details" | "gallery" | "map" | "rsvp";

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

export type ThemeConfig = {
  themeClassName: string;
  showBackgroundTexture: boolean;
  backgroundTextureImageUrl?: string;
};

export type InviteeConfig = {
  allowedSlugs: readonly string[];
  defaultGuestLabel: string;
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
  routeBase: string;
  config: TemplateConfig;
  content: EventContent;
  theme: ThemeConfig;
  invitees: InviteeConfig;
  assets: {
    heroRingImageUrl: string;
    mapEmbedSrc: string;
    galleryImages: string[];
  };
};

export type InviteContext = {
  pathname: string;
  inviteeSlug: string;
  inviteeName: string;
  personalized: boolean;
  validInvite: boolean;
  template: TemplateDefinition;
};
