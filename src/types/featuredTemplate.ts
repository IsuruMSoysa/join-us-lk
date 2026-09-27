export type FeaturedTemplateDocument = {
  siteId: string;
  /** Denormalized from sites/{siteId}.slug, refreshed on save. */
  siteSlug: string;
  /** Must exist in sites/{siteId}/invitees for the preview link to render a valid invite. */
  sampleInviteeSlug: string;
  label: string;
  blurb: string;
  sortOrder: number;
  published: boolean;
  isNew: boolean;
};

export type FeaturedTemplateWithId = FeaturedTemplateDocument & { id: string };
