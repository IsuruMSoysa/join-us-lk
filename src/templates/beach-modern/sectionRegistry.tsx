import { type ComponentType } from "react";
import { BeachHero } from "./sections/BeachHero";
import { BeachDetails } from "./sections/BeachDetails";
import { BeachGallery } from "./sections/BeachGallery";
import { BeachMap } from "./sections/BeachMap";
import { RsvpSection } from "../../components/sections/RsvpSection";
import { type InviteContext, type SectionKey } from "../../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const BeachHeroAdapter = ({ context }: SectionComponentProps) => (
  <BeachHero
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
    ringImageUrl={context.assets.heroRingImageUrl}
  />
);

const BeachDetailsAdapter = ({ context }: SectionComponentProps) => (
  <BeachDetails content={context.content} />
);

const BeachGalleryAdapter = ({ context }: SectionComponentProps) => (
  <BeachGallery content={context.content} images={context.assets.galleryImages} />
);

const BeachMapAdapter = ({ context }: SectionComponentProps) => (
  <BeachMap content={context.content} mapEmbedSrc={context.assets.mapEmbedSrc} />
);

const RsvpSectionAdapter = ({ context }: SectionComponentProps) => (
  <RsvpSection
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
  hero: BeachHeroAdapter,
  details: BeachDetailsAdapter,
  gallery: BeachGalleryAdapter,
  map: BeachMapAdapter,
  rsvp: RsvpSectionAdapter,
};
