/**
* Converts a URL path slug (e.g. "mr-tom-hanks") into a display name ("Mr. Tom Hanks").
* Used for personalized invite links like BASEURL/mr-tom-hanks
*/

const HONORIFIC_MAP: Record<string, string> = {
  mr: "Mr.",
  mrs: "Mrs.",
  ms: "Ms.",
  dr: "Dr.",
  prof: "Prof.",
};

function capitalizeWord(word: string): string {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (HONORIFIC_MAP[lower]) return HONORIFIC_MAP[lower];
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
* Parses pathname (e.g. "/mr-tom-hanks") into a display name.
* Empty path or "/" returns a generic label for non-personalized visits.
*/
export function parseInviteeName(pathname: string): string {
  const slug = getLastPathSegment(pathname);
  if (!slug) return "Dear Guest";

  const parts = slug.split("-").filter(Boolean);
  if (parts.length === 0) return "Dear Guest";

  return parts.map(capitalizeWord).join(" ");
}

/**
* Returns the last non-empty segment of the pathname, or an empty string.
*/
export function getLastPathSegment(pathname: string): string {
  const segments = pathname.split("/").map((s) => s.trim()).filter(Boolean);
  if (segments.length === 0) return "";
  return segments[segments.length - 1] ?? "";
}

/**
* True when the URL has an invitee slug (not root only).
*/
export function hasInviteeSlug(pathname: string): boolean {
  const slug = getLastPathSegment(pathname);
  return slug.length > 0;
}

/**
* Returns true if the pathname's last segment exists in the allowed slug list.
*/
export function isValidInviteSlug(
  pathname: string,
  allowedSlugs: readonly string[],
): boolean {
  const slug = getLastPathSegment(pathname);
  if (!slug) return false;
  return allowedSlugs.includes(slug);
}

export function parseInviteeNameFromSlug(
  inviteeSlug: string,
  defaultGuestLabel: string,
): string {
  if (!inviteeSlug) return defaultGuestLabel;
  const parts = inviteeSlug.split("-").filter(Boolean);
  if (parts.length === 0) return defaultGuestLabel;
  return parts.map(capitalizeWord).join(" ");
}

export function isValidInviteeSlug(
  inviteeSlug: string,
  allowedSlugs: readonly string[],
): boolean {
  if (!inviteeSlug) return false;
  return allowedSlugs.includes(inviteeSlug);
}
