import { homeComingTemplate } from "./homeComingTemplate";
import { weddingTemplate } from "./weddingTemplate";

export const templateRegistry = {
  wedding: weddingTemplate,
  homeComing: homeComingTemplate,
} as const;
