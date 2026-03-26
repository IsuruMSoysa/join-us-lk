import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSiteBySlug } from "../../lib/firestore/sites";
import { getInvitees } from "../../lib/firestore/invitees";
import { parseInviteeNameFromSlug } from "../../utils/inviteeName";
import { applyThemeColors } from "../../utils/colors";
import { InviteSitePage } from "./InviteSitePage";
import { type InviteContext } from "../../types/template";
import { type SiteDocument } from "../../types/site";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

type SiteWithId = SiteDocument & { id: string };

export function InviteSiteLoader() {
  const { siteSlug = "", inviteeSlug = "" } = useParams<{
    siteSlug: string;
    inviteeSlug?: string;
  }>();
  const [site, setSite] = useState<SiteWithId | null>(null);
  const [allowedSlugs, setAllowedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError("");
      try {
        const loaded = await getSiteBySlug(siteSlug);
        if (!loaded) {
          setError("Invitation not found");
          return;
        }
        setSite(loaded);
        const invitees = await getInvitees(loaded.id);
        setAllowedSlugs(invitees.map((i) => i.slug));
      } catch {
        setError("Failed to load invitation");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, [siteSlug]);

  useEffect(() => {
    if (!site) return;
    applyThemeColors(site.theme.colors);
  }, [site]);

  const context = useMemo<InviteContext | null>(() => {
    if (!site) return null;
    const personalized = Boolean(inviteeSlug);
    const validInvite = inviteeSlug ? allowedSlugs.includes(inviteeSlug) : false;
    return {
      pathname: window.location.pathname,
      siteId: site.id,
      siteSlug: site.slug,
      inviteeSlug,
      inviteeName: parseInviteeNameFromSlug(inviteeSlug, "Dear Guest"),
      personalized,
      validInvite,
      content: site.content,
      config: site.config,
      theme: site.theme,
      assets: site.assets,
    };
  }, [site, inviteeSlug, allowedSlugs]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <Card className="w-full max-w-lg glass">
          <CardHeader>
            <CardTitle>Loading invitation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !site || !context) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Unavailable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text/70">{error || "Invitation unavailable."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <InviteSitePage templateId={site.templateId} context={context} />;
}
