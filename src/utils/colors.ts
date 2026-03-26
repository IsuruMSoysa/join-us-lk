import { type ThemeColors } from "../types/template";

const FALLBACK_COLORS: ThemeColors = {
  primary: "#D4AF37",
  secondary: "#556B2F",
  accent: "#800000",
  background: "#FDFCF8",
  text: "#6F4E37",
  muted: "#8B7D6B",
};

type Rgb = { r: number; g: number; b: number };

function normalizeHex(input: string): string {
  const hex = input.trim().replace(/^#/, "");
  if (hex.length === 3) {
    return `#${hex
      .split("")
      .map((c) => c + c)
      .join("")}`;
  }
  if (hex.length === 6) {
    return `#${hex}`;
  }
  return "#000000";
}

function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex);
  const value = Number.parseInt(normalized.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(base: string, blend: string, blendRatio: number): string {
  const baseRgb = hexToRgb(base);
  const blendRgb = hexToRgb(blend);
  const ratio = Math.max(0, Math.min(1, blendRatio));
  return rgbToHex({
    r: baseRgb.r * (1 - ratio) + blendRgb.r * ratio,
    g: baseRgb.g * (1 - ratio) + blendRgb.g * ratio,
    b: baseRgb.b * (1 - ratio) + blendRgb.b * ratio,
  });
}

function withAlpha(hex: string, alpha: number): string {
  const value = Math.max(0, Math.min(1, alpha));
  const alphaHex = Math.round(value * 255)
    .toString(16)
    .padStart(2, "0");
  return `${normalizeHex(hex)}${alphaHex}`;
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function readableOn(background: string, light = "#FDFCF8", dark = "#20160f"): string {
  return contrastRatio(background, light) >= contrastRatio(background, dark)
    ? light
    : dark;
}

export function applyThemeColors(colors?: Partial<ThemeColors>) {
  const merged: ThemeColors = {
    ...FALLBACK_COLORS,
    ...colors,
  };
  const root = document.documentElement;

  const rsvpSurface = mixHex(merged.background, merged.secondary, 0.45);
  const rsvpText = readableOn(rsvpSurface, "#FDFCF8", "#24180F");
  const rsvpMutedText =
    rsvpText === "#FDFCF8"
      ? mixHex(rsvpText, merged.background, 0.35)
      : mixHex(rsvpText, "#6A5441", 0.35);
  const rsvpLabel = readableOn(rsvpSurface, "#F2CE5F", "#735400");
  const rsvpBorder = withAlpha(readableOn(rsvpSurface, "#FFFFFF", "#1A120C"), 0.24);
  const rsvpControlBg = withAlpha(readableOn(rsvpSurface, "#FFFFFF", "#000000"), 0.08);
  const rsvpControlBorder = withAlpha(
    readableOn(rsvpSurface, "#FFFFFF", "#1A120C"),
    0.28,
  );
  const rsvpControlHoverBorder = withAlpha(
    readableOn(rsvpSurface, "#FFFFFF", "#1A120C"),
    0.5,
  );
  const rsvpSelectedBg = merged.primary;
  const rsvpSelectedText = readableOn(rsvpSelectedBg, "#1F150D", "#FDFCF8");
  const rsvpSelectedBorder =
    rsvpSelectedText === "#FDFCF8"
      ? mixHex(rsvpSelectedBg, "#FFFFFF", 0.35)
      : mixHex(rsvpSelectedBg, "#8A6A1D", 0.35);
  const rsvpButtonBg = merged.primary;
  const rsvpButtonText = readableOn(rsvpButtonBg, "#1F150D", "#FDFCF8");
  const rsvpFocusRing = withAlpha(
    readableOn(rsvpSurface, "#F4D56C", "#7A5B15"),
    0.5,
  );
  const rsvpDangerText = readableOn(merged.accent, "#FFF6F6", "#2A1010");
  const rsvpDangerBg = withAlpha(merged.accent, 0.28);
  const rsvpDangerBorder =
    rsvpDangerText === "#FFF6F6"
      ? mixHex(merged.accent, "#FFC0C0", 0.45)
      : mixHex(merged.accent, "#5E2626", 0.3);
  const rsvpIconMuted = withAlpha(readableOn(rsvpSurface, "#FFFFFF", "#1A120C"), 0.5);
  const rsvpGlow = withAlpha(readableOn(rsvpSurface, "#000000", "#000000"), 0.25);

  root.style.setProperty("--color-primary", merged.primary);
  root.style.setProperty("--color-secondary", merged.secondary);
  root.style.setProperty("--color-accent", merged.accent);
  root.style.setProperty("--color-background", merged.background);
  root.style.setProperty("--color-text", merged.text);
  root.style.setProperty("--color-muted", merged.muted);
  root.style.setProperty("--rsvp-surface", rsvpSurface);
  root.style.setProperty("--rsvp-text", rsvpText);
  root.style.setProperty("--rsvp-muted-text", rsvpMutedText);
  root.style.setProperty("--rsvp-label", rsvpLabel);
  root.style.setProperty("--rsvp-border", rsvpBorder);
  root.style.setProperty("--rsvp-control-bg", rsvpControlBg);
  root.style.setProperty("--rsvp-control-border", rsvpControlBorder);
  root.style.setProperty("--rsvp-control-hover-border", rsvpControlHoverBorder);
  root.style.setProperty("--rsvp-selected-bg", rsvpSelectedBg);
  root.style.setProperty("--rsvp-selected-text", rsvpSelectedText);
  root.style.setProperty("--rsvp-selected-border", rsvpSelectedBorder);
  root.style.setProperty("--rsvp-button-bg", rsvpButtonBg);
  root.style.setProperty("--rsvp-button-text", rsvpButtonText);
  root.style.setProperty("--rsvp-focus-ring", rsvpFocusRing);
  root.style.setProperty("--rsvp-danger-bg", rsvpDangerBg);
  root.style.setProperty("--rsvp-danger-border", rsvpDangerBorder);
  root.style.setProperty("--rsvp-danger-text", rsvpDangerText);
  root.style.setProperty("--rsvp-icon-muted", rsvpIconMuted);
  root.style.setProperty("--rsvp-glow", rsvpGlow);
}
