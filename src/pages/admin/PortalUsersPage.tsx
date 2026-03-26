import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { useAuthUser } from "../../lib/auth";
import { db } from "../../lib/firebase";
import { approvePortalUser, listPortalUsers, revokePortalUser, type PortalUser } from "../../lib/firestore/portalUsers";
import { getSites } from "../../lib/firestore/sites";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { EmptyState } from "../../components/ui/empty-state";
import { Skeleton } from "../../components/ui/skeleton";

type DraftSites = Record<string, string>;

export function PortalUsersPage() {
  const { user } = useAuthUser();
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [draftSites, setDraftSites] = useState<DraftSites>({});
  const [availableSiteIds, setAvailableSiteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveErrorByUser, setSaveErrorByUser] = useState<Record<string, string>>({});

  const refresh = async () => {
    setError("");
    setLoading(true);
    try {
      const [rows, sites] = await Promise.all([listPortalUsers(), getSites()]);
      const sorted = [...rows].sort((a, b) => Number(a.approved) - Number(b.approved));
      setUsers(sorted);
      setAvailableSiteIds(sites.map((s) => s.id));
      setDraftSites(
        Object.fromEntries(sorted.map((u) => [u.uid, (u.siteIds || []).join(",")])),
      );
    } catch (err) {
      if (err instanceof FirebaseError && err.code === "permission-denied" && user?.uid) {
        const adminSnap = await getDoc(doc(db, "admins", user.uid));
        if (!adminSnap.exists()) {
          setError(
            `Permission denied. Signed in as ${user.email || user.uid}, but admins/${user.uid} does not exist in Firestore.`,
          );
        } else {
          setError(
            `Permission denied for ${user.email || user.uid}. This account is not passing current admin rules.`,
          );
        }
      } else {
        setError("Could not load portal users. Ensure this account has admin access.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const toggleSite = (uid: string, siteId: string) => {
    const current = (draftSites[uid] || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    const next = current.includes(siteId)
      ? current.filter((id) => id !== siteId)
      : [...current, siteId];
    setDraftSites((prev) => ({ ...prev, [uid]: next.join(",") }));
  };

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Portal Users</h1>
      <p className="text-sm text-text/70">
        Approve Google users and assign allowed site IDs. Pending users appear first.
      </p>
      <p className="text-sm text-text/70">
        Users appear here after they sign in via the Client Portal at least once.
      </p>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {loading ? (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Loading portal users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ) : null}
      {!loading && !error && users.length === 0 ? (
        <EmptyState
          title="No portal users yet"
          description="Ask users to login through the client portal first, then refresh."
        />
      ) : null}
      {!loading && users.length > 0 ? (
        <Card className="glass">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Allowed site IDs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.uid}>
                    <TableCell>
                      <p className="font-semibold">{u.displayName}</p>
                      <p className="text-xs text-text/70">{u.email}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.approved ? "success" : "outline"}>
                        {u.approved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-y-2">
                      <Input
                        value={draftSites[u.uid] || ""}
                        onChange={(e) =>
                          setDraftSites((prev) => ({ ...prev, [u.uid]: e.target.value }))
                        }
                        placeholder="siteId1,siteId2"
                      />
                      {availableSiteIds.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {availableSiteIds.map((siteId) => {
                            const selected = (draftSites[u.uid] || "")
                              .split(",")
                              .map((x) => x.trim())
                              .filter(Boolean)
                              .includes(siteId);
                            return (
                              <Button
                                type="button"
                                key={`${u.uid}-${siteId}`}
                                size="sm"
                                variant={selected ? "default" : "outline"}
                                onClick={() => toggleSite(u.uid, siteId)}
                              >
                                {siteId}
                              </Button>
                            );
                          })}
                        </div>
                      ) : null}
                      {saveErrorByUser[u.uid] ? (
                        <p className="text-xs text-accent">{saveErrorByUser[u.uid]}</p>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={async () => {
                            setSaveErrorByUser((prev) => ({ ...prev, [u.uid]: "" }));
                            const siteIds = (draftSites[u.uid] || "")
                              .split(",")
                              .map((x) => x.trim())
                              .filter(Boolean);
                            const invalid = siteIds.filter((id) => !availableSiteIds.includes(id));
                            if (invalid.length > 0) {
                              setSaveErrorByUser((prev) => ({
                                ...prev,
                                [u.uid]: `Invalid site IDs: ${invalid.join(", ")}`,
                              }));
                              return;
                            }
                            try {
                              await approvePortalUser(u.uid, siteIds);
                              await refresh();
                              toast.success(`Approved ${u.displayName}.`);
                            } catch (err) {
                              const msg = err instanceof Error ? err.message : "Failed to approve portal user.";
                              setSaveErrorByUser((prev) => ({ ...prev, [u.uid]: msg }));
                              toast.error(msg);
                            }
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={async () => {
                            setSaveErrorByUser((prev) => ({ ...prev, [u.uid]: "" }));
                            try {
                              await revokePortalUser(u.uid);
                              await refresh();
                              toast.success(`Revoked approval for ${u.displayName}.`);
                            } catch (err) {
                              const msg = err instanceof Error ? err.message : "Failed to revoke portal user approval.";
                              setSaveErrorByUser((prev) => ({ ...prev, [u.uid]: msg }));
                              toast.error(msg);
                            }
                          }}
                        >
                          Revoke
                        </Button>
                      </div>
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
