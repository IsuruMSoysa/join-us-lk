export const brand = {
  productName: "join-us-lk",
  displayName: "JoinUs.lk",
  supportEmail: "info@isurumsoysa.com",
  marketingTagline: "Event invite sites that guests actually love",
} as const;

export function getDefaultDocumentTitle() {
  return `${brand.displayName} — Digital invitations & RSVP`;
}
