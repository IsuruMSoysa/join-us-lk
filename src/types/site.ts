import { type Timestamp } from "firebase/firestore";
import {
  type EventContent,
  type SectionKey,
  type ThemeConfig,
} from "./template";

export type SiteStatus = "draft" | "published";

export type SiteDocument = {
  slug: string;
  templateId: string;
  clientId: string;
  status: SiteStatus;
  content: EventContent;
  theme: ThemeConfig;
  config: {
    metadata: { title: string; invalidInviteTitle: string };
    features: { showInvalidInvitePage: boolean };
    sections: Array<{
      key: SectionKey;
      enabled: boolean;
      requiresValidInvite?: boolean;
    }>;
  };
  assets: {
    heroRingImageUrl: string;
    mapEmbedSrc: string;
    galleryImages: string[];
  };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type InviteeDocument = {
  slug: string;
  displayName: string;
  createdAt?: Timestamp;
};

export type RsvpDocument = {
  inviteeSlug: string;
  name: string;
  attendance: "yes" | "no";
  submittedAt?: Timestamp;
};
