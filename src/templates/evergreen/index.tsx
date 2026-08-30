import { PageComposer } from "../../components/composer/PageComposer";
import { EvergreenShell } from "./EvergreenShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";

type EvergreenTemplateProps = {
  context: InviteContext;
};

export default function EvergreenTemplate({ context }: EvergreenTemplateProps) {
  return (
    <EvergreenShell coupleNames={context.content.names}>
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={sectionRegistry}
      />
    </EvergreenShell>
  );
}
