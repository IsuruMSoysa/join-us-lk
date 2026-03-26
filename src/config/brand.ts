export const brand = {
  productName: "join-us-lk",
  displayName: "Join Us LK",
  supportEmail: "hello@joinus.lk",
  marketingTagline: "Premium Event Invitation Platform",
} as const;

export function getDefaultDocumentTitle() {
  return `${brand.displayName} - Invitation Platform`;
}
