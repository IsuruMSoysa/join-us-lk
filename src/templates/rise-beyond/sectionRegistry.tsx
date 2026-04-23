import { type ComponentType } from "react";
import { RiseBeyondHero } from "./sections/RiseBeyondHero";
import { RiseBeyondDetails } from "./sections/RiseBeyondDetails";
import { RiseBeyondGallery } from "./sections/RiseBeyondGallery";
import { RiseBeyondMap } from "./sections/RiseBeyondMap";
import { RiseBeyondRsvp } from "./sections/RiseBeyondRsvp";
import { type InviteContext, type SectionKey } from "../../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const RiseBeyondHeroAdapter = ({ context }: SectionComponentProps) => (
  <RiseBeyondHero
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
    ringImageUrl={context.assets.heroRingImageUrl}
  />
);

const RiseBeyondDetailsAdapter = ({ context }: SectionComponentProps) => (
  <RiseBeyondDetails content={context.content} />
);

const RiseBeyondGalleryAdapter = ({ context }: SectionComponentProps) => (
  <RiseBeyondGallery
    content={context.content}
    images={context.assets.galleryImages}
  />
);

const RiseBeyondMapAdapter = ({ context }: SectionComponentProps) => (
  <RiseBeyondMap
    content={context.content}
    mapEmbedSrc={context.assets.mapEmbedSrc}
  />
);

const RiseBeyondRsvpAdapter = ({ context }: SectionComponentProps) => (
  <RiseBeyondRsvp
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
  hero: RiseBeyondHeroAdapter,
  details: RiseBeyondDetailsAdapter,
  gallery: RiseBeyondGalleryAdapter,
  map: RiseBeyondMapAdapter,
  rsvp: RiseBeyondRsvpAdapter,
};
