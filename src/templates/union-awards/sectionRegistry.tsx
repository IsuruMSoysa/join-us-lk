import { type ComponentType } from "react";
import { UnionAwardsHero } from "./sections/UnionAwardsHero";
import { UnionAwardsDetails } from "./sections/UnionAwardsDetails";
import { UnionAwardsGallery } from "./sections/UnionAwardsGallery";
import { UnionAwardsMap } from "./sections/UnionAwardsMap";
import { UnionAwardsRsvp } from "./sections/UnionAwardsRsvp";
import { type InviteContext, type SectionKey } from "../../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const UnionAwardsHeroAdapter = ({ context }: SectionComponentProps) => (
  <UnionAwardsHero
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
    eventLogoUrl={context.assets.eventLogoUrl}
  />
);

const UnionAwardsDetailsAdapter = ({ context }: SectionComponentProps) => (
  <UnionAwardsDetails content={context.content} />
);

const UnionAwardsGalleryAdapter = ({ context }: SectionComponentProps) => (
  <UnionAwardsGallery
    content={context.content}
    images={context.assets.galleryImages}
  />
);

const UnionAwardsMapAdapter = ({ context }: SectionComponentProps) => (
  <UnionAwardsMap
    content={context.content}
    mapEmbedSrc={context.assets.mapEmbedSrc}
  />
);

const UnionAwardsRsvpAdapter = ({ context }: SectionComponentProps) => (
  <UnionAwardsRsvp
    siteId={context.siteId}
    inviteeSlug={context.inviteeSlug}
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    content={context.content}
  />
);

export const sectionRegistry: Record<
  SectionKey,
  ComponentType<SectionComponentProps>
> = {
  hero: UnionAwardsHeroAdapter,
  details: UnionAwardsDetailsAdapter,
  gallery: UnionAwardsGalleryAdapter,
  map: UnionAwardsMapAdapter,
  rsvp: UnionAwardsRsvpAdapter,
};
