export type ShowcaseProjectDocument = {
  title: string;
  subtitle: string;
  imageUrl: string;
  /** Published invite path segment, e.g. `my-wedding` → `/${siteSlug}` */
  siteSlug?: string;
  sortOrder: number;
  published: boolean;
};

export type ShowcaseProjectWithId = ShowcaseProjectDocument & { id: string };
