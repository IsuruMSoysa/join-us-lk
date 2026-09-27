import { type ComponentType } from "react";
import { OliveGardenHero } from "./sections/OliveGardenHero";
import { OliveGardenSchedule } from "./sections/OliveGardenSchedule";
import { OliveGardenGallery } from "./sections/OliveGardenGallery";
import { OliveGardenMap } from "./sections/OliveGardenMap";
import { OliveGardenRsvp } from "./sections/OliveGardenRsvp";
import { type InviteContext, type SectionKey } from "../../types/template";

type SectionComponentProps = {
  context: InviteContext;
};

const OliveGardenHeroAdapter = ({ context }: SectionComponentProps) => (
  <OliveGardenHero
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    validInvite={context.validInvite}
    content={context.content}
  />
);

// "How the day unfolds" reuses the shared `orderOfDay` section key/content,
// same as EmeraldTulipOrderOfDay — just always-on by default here.
const OliveGardenScheduleAdapter = ({ context }: SectionComponentProps) => (
  <OliveGardenSchedule content={context.content} />
);

const OliveGardenGalleryAdapter = ({ context }: SectionComponentProps) => (
  <OliveGardenGallery content={context.content} images={context.assets.galleryImages} />
);

const OliveGardenMapAdapter = ({ context }: SectionComponentProps) => (
  <OliveGardenMap content={context.content} mapEmbedSrc={context.assets.mapEmbedSrc} />
);

const OliveGardenRsvpAdapter = ({ context }: SectionComponentProps) => (
  <OliveGardenRsvp
    siteId={context.siteId}
    inviteeSlug={context.inviteeSlug}
    inviteeName={context.inviteeName}
    personalized={context.personalized}
    content={context.content}
  />
);

/**
 * No "details" adapter: this design folds the date/time/venue details into
 * the hero's week-strip instead of a separate cards section. PageComposer
 * simply skips a config section key the registry doesn't implement.
 */
export const sectionRegistry: Partial<
  Record<SectionKey, ComponentType<SectionComponentProps>>
> = {
  hero: OliveGardenHeroAdapter,
  orderOfDay: OliveGardenScheduleAdapter,
  gallery: OliveGardenGalleryAdapter,
  map: OliveGardenMapAdapter,
  rsvp: OliveGardenRsvpAdapter,
};
