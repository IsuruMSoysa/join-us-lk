import { InvalidInvite } from "../InvalidInvite";
import { type InviteContext, type TemplateConfig } from "../../types/template";
import { type ComponentType } from "react";

type PageComposerProps = {
  config: TemplateConfig;
  context: InviteContext;
  sectionRegistry: Record<
    string,
    ComponentType<{
      context: InviteContext;
    }>
  >;
};

export function PageComposer({
  config,
  context,
  sectionRegistry,
}: PageComposerProps) {
  if (
    context.personalized &&
    !context.validInvite &&
    config.features.showInvalidInvitePage
  ) {
    return (
      <InvalidInvite
        firstName={context.content.names.first}
        secondName={context.content.names.second}
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
