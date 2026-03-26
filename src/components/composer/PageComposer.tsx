import { InvalidInvite } from "../InvalidInvite";
import { sectionRegistry } from "../../config/sectionRegistry";
import { type InviteContext, type TemplateConfig } from "../../types/template";

type PageComposerProps = {
  config: TemplateConfig;
  context: InviteContext;
};

export function PageComposer({ config, context }: PageComposerProps) {
  if (
    context.personalized &&
    !context.validInvite &&
    config.features.showInvalidInvitePage
  ) {
    return (
      <InvalidInvite
        firstName={context.template.content.names.first}
        secondName={context.template.content.names.second}
      />
    );
  }

  return (
    <>
      {config.sections.map((section) => {
        if (!section.enabled) return null;
        if (section.requiresValidInvite && !context.validInvite) return null;

        const SectionComponent = sectionRegistry[section.key];
        return <SectionComponent key={section.key} context={context} />;
      })}
    </>
  );
}
