import { useEffect } from "react";
import { AppShell } from "../components/layout/AppShell";
import { PageComposer } from "../components/composer/PageComposer";
import { type TemplateDefinition, type InviteContext } from "../types/template";
import {
  isValidInviteeSlug,
  parseInviteeNameFromSlug,
} from "../utils/inviteeName";

type TemplatePageProps = {
  template: TemplateDefinition;
  pathname: string;
  inviteeSlug?: string;
};

export function TemplatePage({
  template,
  pathname,
  inviteeSlug = "",
}: TemplatePageProps) {
  const personalized = inviteeSlug.length > 0;
  const validInvite = isValidInviteeSlug(
    inviteeSlug,
    template.invitees.allowedSlugs,
  );
  const inviteeName = parseInviteeNameFromSlug(
    inviteeSlug,
    template.invitees.defaultGuestLabel,
  );

  const context: InviteContext = {
    pathname,
    inviteeSlug,
    inviteeName,
    personalized,
    validInvite,
    template,
  };

  useEffect(() => {
    const baseTitle = `${template.content.names.first} & ${template.content.names.second} - ${template.config.metadata.title}`;
    const title = personalized ? `${inviteeName} - ${baseTitle}` : baseTitle;
    const showInvalidTitle = personalized && !validInvite;
    document.title = showInvalidTitle
      ? `${template.config.metadata.invalidInviteTitle} - ${baseTitle}`
      : title;
  }, [
    template,
    inviteeName,
    personalized,
    validInvite,
  ]);

  return (
    <AppShell
      themeClassName={template.theme.themeClassName}
      showBackgroundTexture={template.theme.showBackgroundTexture}
      backgroundTextureImageUrl={template.theme.backgroundTextureImageUrl}
      coupleNames={template.content.names}
    >
      <PageComposer config={template.config} context={context} />
    </AppShell>
  );
}
