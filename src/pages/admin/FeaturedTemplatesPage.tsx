import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createFeaturedTemplate,
  deleteFeaturedTemplate,
  listAllFeaturedTemplatesAdmin,
  updateFeaturedTemplate,
} from "../../lib/firestore/featuredTemplates";
import { getSites } from "../../lib/firestore/sites";
import { getInvitees } from "../../lib/firestore/invitees";
import { type FeaturedTemplateWithId } from "../../types/featuredTemplate";
import { type SiteDocument } from "../../types/site";
import { templateRegistry } from "../../templates/registry";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";

type SiteWithId = SiteDocument & { id: string };
type InviteeOption = { id: string; slug: string; displayName: string };

const emptyForm = {
  siteId: "",
  siteSlug: "",
  sampleInviteeSlug: "",
  label: "",
  blurb: "",
  sortOrder: 0,
  published: false,
  isNew: false,
};

export function FeaturedTemplatesPage() {
  const [items, setItems] = useState<FeaturedTemplateWithId[]>([]);
  const [sites, setSites] = useState<SiteWithId[]>([]);
  const [invitees, setInvitees] = useState<InviteeOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const refresh = async () => {
    setLoading(true);
    try {
      const [templates, siteList] = await Promise.all([
        listAllFeaturedTemplatesAdmin(),
        getSites(),
      ]);
      setItems(templates);
      // Only published sites are publicly readable, so only those can be
      // safely linked from the public Templates section.
      setSites(siteList.filter((site) => site.status === "published"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load featured templates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const loadInvitees = async (siteId: string) => {
    if (!siteId) {
      setInvitees([]);
      return;
    }
    try {
      const list = await getInvitees(siteId);
      setInvitees(list);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load invitees.");
      setInvitees([]);
    }
  };

  const openCreate = () => {
    const nextOrder =
      items.length === 0 ? 0 : Math.max(...items.map((i) => i.sortOrder), 0) + 1;
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: nextOrder });
    setInvitees([]);
    setDialogOpen(true);
  };

  const openEdit = (row: FeaturedTemplateWithId) => {
    setEditingId(row.id);
    setForm({
      siteId: row.siteId,
      siteSlug: row.siteSlug,
      sampleInviteeSlug: row.sampleInviteeSlug,
      label: row.label,
      blurb: row.blurb,
      sortOrder: row.sortOrder,
      published: row.published,
      isNew: row.isNew,
    });
    void loadInvitees(row.siteId);
    setDialogOpen(true);
  };

  const onSiteChange = (siteId: string) => {
    const site = sites.find((s) => s.id === siteId);
    const template = site ? templateRegistry[site.templateId] : undefined;
    setForm((f) => ({
      ...f,
      siteId,
      siteSlug: site?.slug ?? "",
      sampleInviteeSlug: "",
      label: f.label || template?.name || "",
      blurb: f.blurb || template?.description || "",
    }));
    void loadInvitees(siteId);
  };

  const submit = async () => {
    if (!form.siteId || !form.siteSlug.trim()) {
      toast.error("Please select a site.");
      return;
    }
    if (!form.sampleInviteeSlug.trim()) {
      toast.error("A sample invitee slug is required for the RSVP preview link.");
      return;
    }
    if (!form.label.trim()) {
      toast.error("Label is required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        siteId: form.siteId,
        siteSlug: form.siteSlug.trim(),
        sampleInviteeSlug: form.sampleInviteeSlug.trim(),
        label: form.label.trim(),
        blurb: form.blurb.trim(),
        sortOrder: Number(form.sortOrder) || 0,
        published: form.published,
        isNew: form.isNew,
      };
      if (editingId) {
        await updateFeaturedTemplate(editingId, payload);
        toast.success("Featured template updated.");
      } else {
        await createFeaturedTemplate(payload);
        toast.success("Featured template created.");
      }
      setDialogOpen(false);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this featured template entry?")) return;
    try {
      await deleteFeaturedTemplate(id);
      toast.success("Deleted.");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed.");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Featured templates</h1>
        <Button type="button" onClick={openCreate}>
          Add template
        </Button>
      </div>
      <p className="text-sm text-text/70 max-w-2xl">
        These entries appear in the public &quot;Templates&quot; section on the home page, each
        linking to a real, working RSVP invite. Only rows with <strong>Published</strong> are
        visible to visitors.
      </p>

      {loading ? (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Loading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardContent className="pt-6">
            {items.length === 0 ? (
              <p className="text-text/70 text-sm py-8 text-center">
                No featured templates yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Sample RSVP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.sortOrder}</TableCell>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      <TableCell className="text-text/70 text-sm">{row.siteSlug}</TableCell>
                      <TableCell className="text-text/70 text-sm">
                        /{row.siteSlug}/{row.sampleInviteeSlug}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {row.published ? (
                            <Badge variant="secondary">Published</Badge>
                          ) : (
                            <span className="text-xs text-text/60">Draft</span>
                          )}
                          {row.isNew && <Badge variant="success">New</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => openEdit(row)}>
                          Edit
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => remove(row.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit featured template" : "New featured template"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="ft-site">Site</Label>
              <select
                id="ft-site"
                value={form.siteId}
                onChange={(e) => onSiteChange(e.target.value)}
                className="w-full h-10 rounded-md border border-secondary/30 bg-transparent px-3 text-sm"
              >
                <option value="">Select a published site…</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.slug} ({templateRegistry[site.templateId]?.name ?? site.templateId})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="ft-invitee">Sample invitee slug</Label>
              {invitees.length > 0 ? (
                <select
                  id="ft-invitee"
                  value={form.sampleInviteeSlug}
                  onChange={(e) => setForm((f) => ({ ...f, sampleInviteeSlug: e.target.value }))}
                  className="w-full h-10 rounded-md border border-secondary/30 bg-transparent px-3 text-sm"
                >
                  <option value="">Select an invitee…</option>
                  {invitees.map((invitee) => (
                    <option key={invitee.id} value={invitee.slug}>
                      {invitee.displayName} ({invitee.slug})
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id="ft-invitee"
                  value={form.sampleInviteeSlug}
                  onChange={(e) => setForm((f) => ({ ...f, sampleInviteeSlug: e.target.value }))}
                  placeholder={
                    form.siteId
                      ? "Site has no invitees yet — add one first"
                      : "Select a site first"
                  }
                />
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="ft-label">Label</Label>
              <Input
                id="ft-label"
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="e.g. Classic"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ft-blurb">Blurb</Label>
              <Input
                id="ft-blurb"
                value={form.blurb}
                onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
                placeholder="One line description shown under the preview"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ft-order">Sort order</Label>
              <Input
                id="ft-order"
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="h-4 w-4 rounded border-secondary/40"
              />
              Published (visible on landing page)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))}
                className="h-4 w-4 rounded border-secondary/40"
              />
              New (shown first with a &quot;New&quot; tag)
            </label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void submit()} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
