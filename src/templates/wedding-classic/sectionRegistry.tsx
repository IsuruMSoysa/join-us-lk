import { type ComponentType } from "react";
import { type InviteContext, type SectionKey } from "../../types/template";
import { DetailsSection } from "./sections/DetailsSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { MapSection } from "./sections/MapSection";
import { RsvpSection } from "../../components/sections/RsvpSection";

type SectionComponentProps = {
  context: InviteContext;
};

const HeroSectionAdapter = ({ context }: SectionComponentProps) => (
  <HeroSection
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
    ringImageUrl={context.assets.heroRingImageUrl}
  />
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

const DetailsSectionAdapter = ({ context }: SectionComponentProps) => (
  <DetailsSection content={context.content} />
);
const GallerySectionAdapter = ({ context }: SectionComponentProps) => (
  <GallerySection content={context.content} images={context.assets.galleryImages} />
);
const MapSectionAdapter = ({ context }: SectionComponentProps) => (
  <MapSection content={context.content} mapEmbedSrc={context.assets.mapEmbedSrc} />
);

export const weddingClassicSectionRegistry: Record<
  SectionKey,
  ComponentType<SectionComponentProps>
> = {
  hero: HeroSectionAdapter,
  details: DetailsSectionAdapter,
  gallery: GallerySectionAdapter,
  map: MapSectionAdapter,
  rsvp: RsvpSectionAdapter,
};
