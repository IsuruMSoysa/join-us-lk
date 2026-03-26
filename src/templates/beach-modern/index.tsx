import { PageComposer } from "../../components/composer/PageComposer";
import { BeachModernShell } from "./BeachModernShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";
import beachBackgroundImage from "./assets/beach-bg.svg";

type BeachModernTemplateProps = {
  context: InviteContext;
};

export default function BeachModernTemplate({
  context,
}: BeachModernTemplateProps) {
  return (
    <BeachModernShell
      coupleNames={context.content.names}
      showBackgroundTexture={context.theme.showBackgroundTexture}
      backgroundTextureImageUrl={
        context.theme.backgroundTextureImageUrl ?? beachBackgroundImage
      }
    >
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={sectionRegistry}
      />
    </BeachModernShell>
  );
}
