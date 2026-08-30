import { PageComposer } from "../../components/composer/PageComposer";
import { EmeraldTulipShell } from "./EmeraldTulipShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";

type EmeraldTulipTemplateProps = {
  context: InviteContext;
};

export default function EmeraldTulipTemplate({
  context,
}: EmeraldTulipTemplateProps) {
  return (
    <EmeraldTulipShell
      coupleNames={context.content.names}
      eventDateTime={context.content.eventDateTime}
    >
      <PageComposer
        config={context.config}
        context={context}
        sectionRegistry={sectionRegistry}
      />
    </EmeraldTulipShell>
  );
}
