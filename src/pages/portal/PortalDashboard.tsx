import { useEffect, useMemo, useState } from "react";
import {
  createInvitee,
  deleteInvitee,
  getInvitees,
  isInviteeSlugTaken,
  updateInvitee,
} from "../../lib/firestore/invitees";
import { getRsvps } from "../../lib/firestore/rsvps";
import { getSiteById, getSiteBySlug } from "../../lib/firestore/sites";
import { useAuthUser } from "../../lib/auth";
import { getPortalUser } from "../../lib/firestore/portalUsers";
import { downloadExcel, readSpreadsheetRows } from "../../utils/excel";
import { slugify } from "../../utils/slug";
import { getAppBaseUrl } from "../../lib/urls";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { toast } from "sonner";

type InviteeRow = { id: string; displayName: string; slug: string };
type RsvpRow = {
  id: string;
  inviteeSlug: string;
  name: string;
  attendance: "yes" | "no";
  submittedAt?: { toDate?: () => Date };
};

export function PortalDashboard() {
  const { user } = useAuthUser();
  const [activeTab, setActiveTab] = useState("rsvps");
  const [siteId, setSiteId] = useState("");
  const [resolvedSiteId, setResolvedSiteId] = useState("");
  const [assignedSiteIds, setAssignedSiteIds] = useState<string[]>([]);
  const [siteSlug, setSiteSlug] = useState("");
  const [invitees, setInvitees] = useState<InviteeRow[]>([]);
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inviteeToDelete, setInviteeToDelete] = useState<InviteeRow | null>(null);
  const [addDisplayName, setAddDisplayName] = useState("");
  const [addSlug, setAddSlug] = useState("");
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editingInvitee, setEditingInvitee] = useState<InviteeRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const baseUrl = getAppBaseUrl();

  const normalizeSiteIds = (rawIds: unknown[]): string[] =>
    Array.from(
      new Set(
        rawIds.map((id) => String(id).trim()).filter((id) => id.length > 0),
      ),
    );

  useEffect(() => {
    let cancelled = false;

    const hydrateAssignedSites = async () => {
      const raw = sessionStorage.getItem("portalSiteIds");
      const parsed: unknown[] = raw ? (JSON.parse(raw) as unknown[]) : [];
      const sessionSiteIds = normalizeSiteIds(parsed);

      if (!cancelled) {
        setAssignedSiteIds(sessionSiteIds);
        setSiteId(sessionSiteIds[0] ?? "");
        if (sessionSiteIds.length === 0) {
          setError(
            "No assigned sites. Ask admin to approve at least one site ID.",
          );
        }
      }

      if (!user?.uid) return;
      const portalUser = await getPortalUser(user.uid);
      if (!portalUser) return;
      const latestSiteIds = normalizeSiteIds(portalUser.siteIds || []);

      if (cancelled) return;

      setAssignedSiteIds(latestSiteIds);
      setSiteId(latestSiteIds[0] ?? "");
      sessionStorage.setItem("portalSiteIds", JSON.stringify(latestSiteIds));
      if (latestSiteIds.length === 0) {
        setError(
          "No assigned sites. Ask admin to approve at least one site ID.",
        );
      } else {
        setError("");
      }
    };

    try {
      void hydrateAssignedSites();
    } catch {
      setAssignedSiteIds([]);
      setSiteId("");
      setError("Invalid site assignment data. Please log in again.");
    }
    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!siteId) return;
    let cancelled = false;

    const loadSiteData = async (targetSiteId = siteId) => {
      setLoading(true);
      setError("");
      const primarySiteId = assignedSiteIds[0] || targetSiteId;
      const candidates = primarySiteId ? [primarySiteId] : [];
      let lastError = "";

      for (const candidateSiteId of candidates) {
        try {
          const siteById = await getSiteById(candidateSiteId);
          const site = siteById ?? (await getSiteBySlug(candidateSiteId));

          if (!site) {
            throw new Error(`Site '${candidateSiteId}' not found.`);
          }

          const [inviteeData, rsvpData] = await Promise.all([
            getInvitees(site.id),
            getRsvps(site.id),
          ]);

          if (cancelled) return;

          if (candidateSiteId !== siteId) setSiteId(candidateSiteId);
          setResolvedSiteId(site.id);
          setSiteSlug(site.slug);
          setInvitees(inviteeData as InviteeRow[]);
          setRsvps(rsvpData as RsvpRow[]);
          setLoading(false);
          return;
        } catch (err) {
          if (cancelled) return;
          lastError = err instanceof Error ? err.message : "Unknown error";
        }
      }

      if (!cancelled) {
        setSiteSlug("");
        setResolvedSiteId("");
        setInvitees([]);
        setRsvps([]);
        setError(
          `Could not load data for assigned sites. ${lastError || "Check assigned site IDs and portal permissions."}`,
        );
        setLoading(false);
      }
    };

    void loadSiteData();
    return () => {
      cancelled = true;
    };
  }, [siteId, assignedSiteIds]);

  const refreshSiteData = async () => {
    if (!resolvedSiteId) return;
    const [inviteeData, rsvpData] = await Promise.all([
      getInvitees(resolvedSiteId),
      getRsvps(resolvedSiteId),
    ]);
    setInvitees(inviteeData as InviteeRow[]);
    setRsvps(rsvpData as RsvpRow[]);
  };

  const inviteeRows = useMemo(
    () =>
      invitees.map((invitee) => ({
        ...invitee,
        url: `${baseUrl}/${siteSlug}/${invitee.slug}`,
      })),
    [invitees, baseUrl, siteSlug],
  );

  const createUniqueSlug = (baseSlug: string, usedSlugs: Set<string>) => {
    const root = slugify(baseSlug) || "invitee";
    if (!usedSlugs.has(root)) {
      usedSlugs.add(root);
      return root;
    }

    let index = 2;
    while (usedSlugs.has(`${root}-${index}`)) index += 1;
    const candidate = `${root}-${index}`;
    usedSlugs.add(candidate);
    return candidate;
  };

  const handleAddInvitee = async () => {
    if (!resolvedSiteId) return;
    const displayName = addDisplayName.trim();
    if (!displayName) {
      toast.error("Display name is required.");
      return;
    }

    const inputSlug = addSlug.trim();
    const normalizedSlug = slugify(inputSlug || displayName);
    if (!normalizedSlug) {
      toast.error("A valid slug is required.");
      return;
    }

    setIsSaving(true);
    try {
      const slugTaken = await isInviteeSlugTaken(resolvedSiteId, normalizedSlug);
      if (slugTaken) {
        toast.error("Slug already exists. Use a different slug.");
        return;
      }
      await createInvitee(resolvedSiteId, { displayName, slug: normalizedSlug });
      await refreshSiteData();
      setAddDisplayName("");
      setAddSlug("");
      setIsAddOpen(false);
      toast.success("Invitee added.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add invitee.");
    } finally {
      setIsSaving(false);
    }
  };

  const openEditInvitee = (invitee: InviteeRow) => {
    setEditingInvitee(invitee);
    setEditDisplayName(invitee.displayName);
    setEditSlug(invitee.slug);
    setIsEditOpen(true);
  };

  const handleUpdateInvitee = async () => {
    if (!resolvedSiteId || !editingInvitee) return;
    const displayName = editDisplayName.trim();
    const normalizedSlug = slugify(editSlug.trim() || editDisplayName.trim());
    if (!displayName || !normalizedSlug) {
      toast.error("Display name and slug are required.");
      return;
    }

    setIsSaving(true);
    try {
      const slugTaken = await isInviteeSlugTaken(
        resolvedSiteId,
        normalizedSlug,
        editingInvitee.id,
      );
      if (slugTaken) {
        toast.error("Slug already exists. Use a different slug.");
        return;
      }
      await updateInvitee(resolvedSiteId, editingInvitee.id, {
        displayName,
        slug: normalizedSlug,
      });
      await refreshSiteData();
      setIsEditOpen(false);
      setEditingInvitee(null);
      toast.success("Invitee updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update invitee.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInvitee = async () => {
    if (!resolvedSiteId || !inviteeToDelete) return;
    setIsSaving(true);
    try {
      await deleteInvitee(resolvedSiteId, inviteeToDelete.id);
      await refreshSiteData();
      setInviteeToDelete(null);
      toast.success("Invitee deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete invitee.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkImport = async (file: File | null) => {
    if (!file || !resolvedSiteId) return;
    setIsImporting(true);
    try {
      const rows = await readSpreadsheetRows(file);
      if (rows.length === 0) {
        toast.error("No rows found in file.");
        return;
      }

      const existingSlugs = new Set<string>(
        invitees
          .map((item) => (typeof item.slug === "string" ? item.slug : ""))
          .filter((slug): slug is string => slug.length > 0),
      );
      let successCount = 0;
      let skippedCount = 0;

      for (const row of rows) {
        const normalizedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.toLowerCase().trim(), String(value).trim()]),
        );
        const displayName = String(normalizedRow.displayname || normalizedRow.name || "").trim();
        if (!displayName) {
          skippedCount += 1;
          continue;
        }

        const sourceSlug = String(normalizedRow.slug || displayName);
        const nextSlug = createUniqueSlug(sourceSlug, existingSlugs);
        await createInvitee(resolvedSiteId, { displayName, slug: nextSlug });
        successCount += 1;
      }

      await refreshSiteData();
      toast.success(`Import completed. Added ${successCount} invitees. Skipped ${skippedCount}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to import invitees.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
        </div>

        {assignedSiteIds.length === 0 ? (
          <section className="glass p-4 rounded-2xl">
            <p className="text-sm text-text/70">
              No site assigned yet. Ask admin to add at least one site ID.
            </p>
          </section>
        ) : null}

        {loading ? (
          <p className="text-sm text-text/70">Loading site data...</p>
        ) : null}
        {error ? <p className="text-sm text-accent">{error}</p> : null}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="rsvps">RSVP Responses</TabsTrigger>
            <TabsTrigger value="invitees">Invitees</TabsTrigger>
          </TabsList>

          <TabsContent value="rsvps">
            <Card className="overflow-auto">
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>RSVP Responses</CardTitle>
                <Button
                  disabled={rsvps.length === 0}
                  onClick={() =>
                    downloadExcel(
                      rsvps.map((r) => ({
                        name: r.name,
                        inviteeSlug: r.inviteeSlug,
                        attendance: r.attendance,
                        submittedAt: r.submittedAt?.toDate?.()?.toISOString?.() ?? "",
                      })),
                      `rsvp-${siteSlug || "export"}.xlsx`,
                    )
                  }
                >
                  Download RSVP Excel
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Invitee Slug</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rsvps.length > 0 ? (
                      rsvps.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>{r.name}</TableCell>
                          <TableCell>{r.inviteeSlug}</TableCell>
                          <TableCell className="uppercase">{r.attendance}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-text/70" colSpan={3}>
                          No RSVP responses yet for this site.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invitees">
            <Card>
              <CardHeader className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle>Invitees</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                      <Button>Add Invitee</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Invitee</DialogTitle>
                        <DialogDescription>Create a new invitee for this site.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="invitee-name">Display Name</Label>
                          <Input
                            id="invitee-name"
                            value={addDisplayName}
                            onChange={(event) => setAddDisplayName(event.target.value)}
                            placeholder="e.g. John and Family"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="invitee-slug">Slug</Label>
                          <Input
                            id="invitee-slug"
                            value={addSlug}
                            onChange={(event) => setAddSlug(event.target.value)}
                            placeholder="Optional. Auto-generated if empty."
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                          Cancel
                        </Button>
                        <Button disabled={isSaving} onClick={handleAddInvitee}>
                          Save Invitee
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="relative overflow-hidden p-0">
                    <label className="flex h-full w-full cursor-pointer items-center justify-center px-4 py-2">
                      {isImporting ? "Importing..." : "Bulk Import CSV/XLSX"}
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        className="hidden"
                        disabled={isImporting}
                        onChange={async (event) => {
                          const file = event.target.files?.[0] ?? null;
                          await handleBulkImport(file);
                          event.target.value = "";
                        }}
                      />
                    </label>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Invite Link</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inviteeRows.length > 0 ? (
                      inviteeRows.map((invitee) => (
                        <TableRow key={invitee.id}>
                          <TableCell>{invitee.displayName}</TableCell>
                          <TableCell>{invitee.slug}</TableCell>
                          <TableCell className="max-w-[320px] truncate text-text/70">
                            {invitee.url}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(invitee.url)}
                              >
                                Copy URL
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => openEditInvitee(invitee)}>
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setInviteeToDelete(invitee)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-text/70">
                          No invitees found for this site.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Invitee</DialogTitle>
              <DialogDescription>Update invitee details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="edit-invitee-name">Display Name</Label>
                <Input
                  id="edit-invitee-name"
                  value={editDisplayName}
                  onChange={(event) => setEditDisplayName(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-invitee-slug">Slug</Label>
                <Input
                  id="edit-invitee-slug"
                  value={editSlug}
                  onChange={(event) => setEditSlug(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button disabled={isSaving} onClick={handleUpdateInvitee}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={Boolean(inviteeToDelete)}
          onOpenChange={(open) => {
            if (!open) setInviteeToDelete(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete invitee?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove <strong>{inviteeToDelete?.displayName}</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setInviteeToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={isSaving} onClick={handleDeleteInvitee}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
