import { type ComponentType } from "react";
import { EmeraldTulipHero } from "./sections/EmeraldTulipHero";
import { EmeraldTulipDetails } from "./sections/EmeraldTulipDetails";
import { EmeraldTulipOrderOfDay } from "./sections/EmeraldTulipOrderOfDay";
import { EmeraldTulipGallery } from "./sections/EmeraldTulipGallery";
import { EmeraldTulipMap } from "./sections/EmeraldTulipMap";
import { EmeraldTulipRsvp } from "./sections/EmeraldTulipRsvp";
import { type InviteContext, type SectionKey } from "../../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const EmeraldTulipHeroAdapter = ({ context }: SectionComponentProps) => (
  <EmeraldTulipHero
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
  />
);

const EmeraldTulipDetailsAdapter = ({ context }: SectionComponentProps) => (
  <EmeraldTulipDetails content={context.content} />
);

const EmeraldTulipOrderOfDayAdapter = ({ context }: SectionComponentProps) => (
  <EmeraldTulipOrderOfDay content={context.content} />
);

const EmeraldTulipGalleryAdapter = ({ context }: SectionComponentProps) => (
  <EmeraldTulipGallery
    content={context.content}
    images={context.assets.galleryImages}
  />
);

const EmeraldTulipMapAdapter = ({ context }: SectionComponentProps) => (
  <EmeraldTulipMap
    content={context.content}
    mapEmbedSrc={context.assets.mapEmbedSrc}
  />
);

const EmeraldTulipRsvpAdapter = ({ context }: SectionComponentProps) => (
  <EmeraldTulipRsvp
    siteId={context.siteId}
    inviteeSlug={context.inviteeSlug}
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    content={context.content}
  />
);

/**
 * The first template to carry `orderOfDay`. Templates that omit the key are
 * unaffected — PageComposer skips section keys a registry does not implement.
 */
export const sectionRegistry: Partial<
  Record<SectionKey, ComponentType<SectionComponentProps>>
> = {
  hero: EmeraldTulipHeroAdapter,
  details: EmeraldTulipDetailsAdapter,
  orderOfDay: EmeraldTulipOrderOfDayAdapter,
  gallery: EmeraldTulipGalleryAdapter,
  map: EmeraldTulipMapAdapter,
  rsvp: EmeraldTulipRsvpAdapter,
};
