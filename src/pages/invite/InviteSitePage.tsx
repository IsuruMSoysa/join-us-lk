import { Suspense } from "react";
import { type InviteContext } from "../../types/template";
import { templateComponents } from "../../templates/registry";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

type InviteSitePageProps = {
  templateId: string;
  context: InviteContext;
};

export function InviteSitePage({ templateId, context }: InviteSitePageProps) {
  const TemplateComponent = templateComponents[templateId];
  if (!TemplateComponent) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <Card className="glass max-w-lg">
          <CardHeader>
            <CardTitle>Template not found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text/70">
            This invitation template is not available in the current deployment.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center p-6">
          <Card className="w-full max-w-lg glass">
            <CardHeader>
              <CardTitle>Loading invitation</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      }
    >
      <TemplateComponent context={context} />
    </Suspense>
  );
}
