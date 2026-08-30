import { type ComponentType } from "react";
import { EvergreenHero } from "./sections/EvergreenHero";
import { EvergreenDetails } from "./sections/EvergreenDetails";
import { EvergreenGallery } from "./sections/EvergreenGallery";
import { EvergreenMap } from "./sections/EvergreenMap";
import { EvergreenRsvp } from "./sections/EvergreenRsvp";
import { type InviteContext, type SectionKey } from "../../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const EvergreenHeroAdapter = ({ context }: SectionComponentProps) => (
  <EvergreenHero
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
    heroRingImageUrl={context.assets.heroRingImageUrl}
  />
);

const EvergreenDetailsAdapter = ({ context }: SectionComponentProps) => (
  <EvergreenDetails content={context.content} />
);

const EvergreenGalleryAdapter = ({ context }: SectionComponentProps) => (
  <EvergreenGallery
    content={context.content}
    images={context.assets.galleryImages}
  />
);

const EvergreenMapAdapter = ({ context }: SectionComponentProps) => (
  <EvergreenMap
    content={context.content}
    mapEmbedSrc={context.assets.mapEmbedSrc}
  />
);

const EvergreenRsvpAdapter = ({ context }: SectionComponentProps) => (
  <EvergreenRsvp
    siteId={context.siteId}
    inviteeSlug={context.inviteeSlug}
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    content={context.content}
  />
);

export const sectionRegistry: Partial<
  Record<SectionKey, ComponentType<SectionComponentProps>>
> = {
  hero: EvergreenHeroAdapter,
  details: EvergreenDetailsAdapter,
  gallery: EvergreenGalleryAdapter,
  map: EvergreenMapAdapter,
  rsvp: EvergreenRsvpAdapter,
};
