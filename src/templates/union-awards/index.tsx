import { PageComposer } from "../../components/composer/PageComposer";
import { UnionAwardsShell } from "./UnionAwardsShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";

type UnionAwardsTemplateProps = {
  context: InviteContext;
};

export default function UnionAwardsTemplate({
  context,
}: UnionAwardsTemplateProps) {
  return (
    <UnionAwardsShell coupleNames={context.content.names}>
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={sectionRegistry}
      />
    </UnionAwardsShell>
  );
}
