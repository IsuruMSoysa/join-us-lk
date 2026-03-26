import { PageComposer } from "../../components/composer/PageComposer";
import { BeachModernShell } from "./BeachModernShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";

type BeachModernTemplateProps = {
  context: InviteContext;
};

export default function BeachModernTemplate({
  context,
}: BeachModernTemplateProps) {
  return (
    <BeachModernShell
      coupleNames={context.content.names}
      showBackgroundTexture={false}
    >
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={sectionRegistry}
      />
    </BeachModernShell>
  );
}
