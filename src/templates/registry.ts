import { lazy } from "react";
import { type TemplateDefinition } from "../types/template";

export const templateRegistry: Record<string, TemplateDefinition> = {
  "wedding-classic": {
    id: "wedding-classic",
    name: "Wedding Classic",
    description: "Bohemian vintage wedding invitation",
    sectionKeys: ["hero", "details", "gallery", "map", "rsvp"],
    componentPath: "wedding-classic",
  },
  "beach-modern": {
    id: "beach-modern",
    name: "Beach Modern Blue",
    description: "A refreshing beach-themed template with modern blue accents",
    sectionKeys: ["hero", "details", "gallery", "map", "rsvp"],
    componentPath: "beach-modern",
  },
  "rise-beyond": {
    id: "rise-beyond",
    name: "Rise Beyond",
    description:
      "High-energy corporate event invitation with space-themed visuals",
    sectionKeys: ["hero", "details", "gallery", "map", "rsvp"],
    componentPath: "rise-beyond",
  },
};

export const templateComponents: Record<string, ReturnType<typeof lazy>> = {
  "wedding-classic": lazy(() => import("./wedding-classic")),
  "beach-modern": lazy(() => import("./beach-modern")),
  "rise-beyond": lazy(() => import("./rise-beyond/index")),
};
