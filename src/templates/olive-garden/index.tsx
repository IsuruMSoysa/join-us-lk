import { PageComposer } from "../../components/composer/PageComposer";
import { OliveGardenShell } from "./OliveGardenShell";
import { sectionRegistry } from "./sectionRegistry";
import { type InviteContext } from "../../types/template";

type OliveGardenTemplateProps = {
  context: InviteContext;
};

export default function OliveGardenTemplate({ context }: OliveGardenTemplateProps) {
  return (
    <OliveGardenShell
      coupleNames={context.content.names}
      eventDateTime={context.content.eventDateTime}
      fallingLeaves={context.content.fallingLeaves ?? true}
    >
      <PageComposer config={context.config} context={context} sectionRegistry={sectionRegistry} />
    </OliveGardenShell>
  );
}
