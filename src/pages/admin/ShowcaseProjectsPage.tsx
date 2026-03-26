import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createShowcaseProject,
  deleteShowcaseProject,
  listAllShowcaseProjectsAdmin,
  updateShowcaseProject,
} from "../../lib/firestore/showcaseProjects";
import { type ShowcaseProjectWithId } from "../../types/showcaseProject";
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

const emptyForm = {
  title: "",
  subtitle: "",
  imageUrl: "",
  siteSlug: "",
  sortOrder: 0,
  published: false,
};

export function ShowcaseProjectsPage() {
  const [items, setItems] = useState<ShowcaseProjectWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listAllShowcaseProjectsAdmin();
      setItems(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load showcase items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const openCreate = () => {
    const nextOrder =
      items.length === 0 ? 0 : Math.max(...items.map((i) => i.sortOrder), 0) + 1;
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: nextOrder });
    setDialogOpen(true);
  };

  const openEdit = (row: ShowcaseProjectWithId) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      subtitle: row.subtitle,
      imageUrl: row.imageUrl,
      siteSlug: row.siteSlug ?? "",
      sortOrder: row.sortOrder,
      published: row.published,
    });
    setDialogOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim() || !form.imageUrl.trim()) {
      toast.error("Title and image URL are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        imageUrl: form.imageUrl.trim(),
        siteSlug: form.siteSlug.trim() || undefined,
        sortOrder: Number(form.sortOrder) || 0,
        published: form.published,
      };
      if (editingId) {
        await updateShowcaseProject(editingId, payload);
        toast.success("Showcase updated.");
      } else {
        await createShowcaseProject(payload);
        toast.success("Showcase created.");
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
    if (!confirm("Delete this showcase entry?")) return;
    try {
      await deleteShowcaseProject(id);
      toast.success("Deleted.");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed.");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Landing showcase</h1>
        <Button type="button" onClick={openCreate}>
          Add project
        </Button>
      </div>
      <p className="text-sm text-text/70 max-w-2xl">
        These entries appear in the public &quot;Already out in the wild&quot; section on the home page.
        Only rows with <strong>Published</strong> are visible to visitors.
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
              <p className="text-text/70 text-sm py-8 text-center">No showcase entries yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.sortOrder}</TableCell>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell className="text-text/70 text-sm">
                        {row.siteSlug ?? "—"}
                      </TableCell>
                      <TableCell>
                        {row.published ? (
                          <Badge variant="secondary">Published</Badge>
                        ) : (
                          <span className="text-xs text-text/60">Draft</span>
                        )}
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
            <DialogTitle>{editingId ? "Edit showcase" : "New showcase"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="showcase-title">Title</Label>
              <Input
                id="showcase-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Amaya & Rohan"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="showcase-sub">Subtitle</Label>
              <Input
                id="showcase-sub"
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                placeholder="e.g. Wedding · Wedding Classic"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="showcase-img">Image URL</Label>
              <Input
                id="showcase-img"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="https://…"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="showcase-slug">Live site slug (optional)</Label>
              <Input
                id="showcase-slug"
                value={form.siteSlug}
                onChange={(e) => setForm((f) => ({ ...f, siteSlug: e.target.value }))}
                placeholder="matches published site slug"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="showcase-order">Sort order</Label>
              <Input
                id="showcase-order"
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
