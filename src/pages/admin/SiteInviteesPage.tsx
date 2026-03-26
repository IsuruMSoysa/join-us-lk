import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { addInvitee, getInvitees, removeInvitee } from "../../lib/firestore/invitees";
import { getSiteById } from "../../lib/firestore/sites";
import { getAppBaseUrl } from "../../lib/urls";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { EmptyState } from "../../components/ui/empty-state";

type Invitee = { id: string; slug: string; displayName: string };

export function SiteInviteesPage() {
  const { siteId = "" } = useParams<{ siteId: string }>();
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [slug, setSlug] = useState("");
  const [siteSlug, setSiteSlug] = useState("");

  const baseUrl = getAppBaseUrl();

  const refresh = async () => {
    const list = await getInvitees(siteId);
    setInvitees(list as Invitee[]);
  };

  useEffect(() => {
    void refresh();
    void getSiteById(siteId).then((site) => setSiteSlug(site?.slug ?? ""));
  }, [siteId]);

  const inviteRows = useMemo(
    () =>
      invitees.map((i) => ({
        ...i,
        url: `${baseUrl}/${siteSlug}/${i.slug}`,
      })),
    [invitees, baseUrl, siteSlug],
  );

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Invitees</h1>

      <form
        className="grid md:grid-cols-3 gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await addInvitee(siteId, { displayName, slug });
          setDisplayName("");
          setSlug("");
          await refresh();
        }}
      >
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display name"
        />
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="invitee-slug"
        />
        <Button type="submit">Add Invitee</Button>
      </form>

      {inviteRows.length === 0 ? (
        <EmptyState title="No invitees yet" description="Add invitees to generate unique RSVP links." />
      ) : (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Invitee List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Invite URL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inviteRows.map((invitee) => (
                  <TableRow key={invitee.id}>
                    <TableCell className="font-medium">{invitee.displayName}</TableCell>
                    <TableCell>{invitee.slug}</TableCell>
                    <TableCell className="max-w-[260px] truncate text-text/70">{invitee.url}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(invitee.url)}>
                          Copy URL
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            await removeInvitee(siteId, invitee.id);
                            await refresh();
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
