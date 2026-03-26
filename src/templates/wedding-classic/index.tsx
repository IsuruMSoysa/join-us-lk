import { PageComposer } from "../../components/composer/PageComposer";
import { type InviteContext } from "../../types/template";
import { WeddingClassicShell } from "./WeddingClassicShell";
import { weddingClassicSectionRegistry } from "./sectionRegistry";

type WeddingClassicTemplateProps = {
  context: InviteContext;
};

export default function WeddingClassicTemplate({
  context,
}: WeddingClassicTemplateProps) {
  return (
    <WeddingClassicShell
      showBackgroundTexture={context.theme.showBackgroundTexture}
      backgroundTextureImageUrl={context.theme.backgroundTextureImageUrl}
      coupleNames={context.content.names}
    >
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={weddingClassicSectionRegistry}
      />
    </WeddingClassicShell>
  );
}
