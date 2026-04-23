import { PageComposer } from "../../components/composer/PageComposer";
import { RiseBeyondShell } from "./RiseBeyondShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";

type RiseBeyondTemplateProps = {
  context: InviteContext;
};

export default function RiseBeyondTemplate({
  context,
}: RiseBeyondTemplateProps) {
  return (
    <RiseBeyondShell coupleNames={context.content.names}>
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={sectionRegistry}
      />
    </RiseBeyondShell>
  );
}
