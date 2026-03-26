import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getSites, setSiteStatus } from "../../lib/firestore/sites";
import { type SiteDocument } from "../../types/site";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Skeleton } from "../../components/ui/skeleton";
import { EmptyState } from "../../components/ui/empty-state";
import { DropdownMenu, DropdownMenuItem } from "../../components/ui/dropdown-menu";

type SiteWithId = SiteDocument & { id: string };

export function SitesListPage() {
  const [sites, setSites] = useState<SiteWithId[]>([]);
  const [busySiteId, setBusySiteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSites = async () => {
    setLoading(true);
    const data = await getSites();
    setSites(data);
    setLoading(false);
  };

  useEffect(() => {
    void refreshSites();
  }, []);

  const toggleStatus = async (site: SiteWithId) => {
    const nextStatus = site.status === "published" ? "draft" : "published";
    setBusySiteId(site.id);
    try {
      await setSiteStatus(site.id, nextStatus);
      await refreshSites();
      toast.success(
        nextStatus === "published"
          ? `Published site "${site.slug}".`
          : `Unpublished site "${site.slug}".`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update site status.");
    } finally {
      setBusySiteId(null);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Client Sites</h1>
        <Button>
          <Link to="/admin/sites/new">New Site</Link>
        </Button>
      </div>
      {loading ? (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Loading sites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ) : null}
      {!loading && sites.length === 0 ? (
        <EmptyState
          title="No sites yet"
          description="Create your first site to start inviting guests."
          actions={
            <Button>
              <Link to="/admin/sites/new">Create Site</Link>
            </Button>
          }
        />
      ) : null}
      {!loading && sites.length > 0 ? (
        <Card className="glass">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell className="font-medium">{site.slug}</TableCell>
                    <TableCell>{site.templateId}</TableCell>
                    <TableCell>
                      <Badge variant={site.status === "published" ? "success" : "outline"}>
                        {site.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu trigger={<span className="px-3 py-1 rounded border border-secondary/20">Actions</span>}>
                        <DropdownMenuItem onClick={() => void toggleStatus(site)}>
                          {busySiteId === site.id
                            ? "Updating..."
                            : site.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/admin/sites/${site.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/admin/sites/${site.id}/invitees`}>Invitees</Link>
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
