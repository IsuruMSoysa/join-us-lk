import { InvalidInvite } from "../InvalidInvite";
import { type InviteContext, type TemplateConfig } from "../../types/template";
import { type ComponentType } from "react";

type PageComposerProps = {
  config: TemplateConfig;
  context: InviteContext;
  sectionRegistry: Partial<
    Record<
      string,
      ComponentType<{
        context: InviteContext;
      }>
    >
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

        // A template need not implement every SectionKey, and a stored site
        // document can name a section its template does not carry.
        const SectionComponent = sectionRegistry[section.key];
        if (!SectionComponent) return null;

        return <SectionComponent key={section.key} context={context} />;
      })}
    </>
  );
}
