import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { type InviteeDocument } from "../../types/site";

export async function getInvitees(siteId: string) {
  const snap = await getDocs(collection(db, "sites", siteId, "invitees"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as InviteeDocument) }));
}

export async function addInvitee(siteId: string, payload: Omit<InviteeDocument, "createdAt">) {
  await addDoc(collection(db, "sites", siteId, "invitees"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function removeInvitee(siteId: string, inviteeId: string) {
  await deleteDoc(doc(db, "sites", siteId, "invitees", inviteeId));
}

export async function createInvitee(siteId: string, payload: Omit<InviteeDocument, "createdAt">) {
  await addInvitee(siteId, payload);
}

export async function updateInvitee(
  siteId: string,
  inviteeId: string,
  payload: Partial<Pick<InviteeDocument, "displayName" | "slug">>,
) {
  await updateDoc(doc(db, "sites", siteId, "invitees", inviteeId), payload);
}

export async function deleteInvitee(siteId: string, inviteeId: string) {
  await removeInvitee(siteId, inviteeId);
}

export async function isInviteeSlugTaken(
  siteId: string,
  slug: string,
  excludeInviteeId?: string,
) {
  const q = query(collection(db, "sites", siteId, "invitees"), where("slug", "==", slug));
  const snap = await getDocs(q);
  return snap.docs.some((entry) => entry.id !== excludeInviteeId);
}
