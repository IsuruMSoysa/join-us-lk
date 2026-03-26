import { type ComponentType } from "react";
import { DetailsSection } from "../components/sections/DetailsSection";
import { GallerySection } from "../components/sections/GallerySection";
import { HeroSection } from "../components/sections/HeroSection";
import { MapSection } from "../components/sections/MapSection";
import { RsvpSection } from "../components/sections/RsvpSection";
import { type InviteContext, type SectionKey } from "../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const HeroSectionAdapter = ({ context }: SectionComponentProps) => (
  <HeroSection
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.template.content}
    ringImageUrl={context.template.assets.heroRingImageUrl}
  />
);

const RsvpSectionAdapter = ({ context }: SectionComponentProps) => (
  <RsvpSection
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    content={context.template.content}
  />
);

const DetailsSectionAdapter = ({ context }: SectionComponentProps) => (
  <DetailsSection content={context.template.content} />
);
const GallerySectionAdapter = ({ context }: SectionComponentProps) => (
  <GallerySection
    content={context.template.content}
    images={context.template.assets.galleryImages}
  />
);
const MapSectionAdapter = ({ context }: SectionComponentProps) => (
  <MapSection
    content={context.template.content}
    mapEmbedSrc={context.template.assets.mapEmbedSrc}
  />
);

export const sectionRegistry: Record<
  SectionKey,
  ComponentType<SectionComponentProps>
> = {
  hero: HeroSectionAdapter,
  details: DetailsSectionAdapter,
  gallery: GallerySectionAdapter,
  map: MapSectionAdapter,
  rsvp: RsvpSectionAdapter,
};
