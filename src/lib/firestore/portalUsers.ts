import {
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";

export type PortalUser = {
  uid: string;
  email: string;
  displayName: string;
  approved: boolean;
  siteIds: string[];
  requestedAt?: unknown;
  approvedAt?: unknown;
};

export async function upsertPortalUserRequest(input: {
  uid: string;
  email: string;
  displayName: string;
}) {
  const ref = doc(db, "portalUsers", input.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as PortalUser;

  const payload: PortalUser = {
    uid: input.uid,
    email: input.email,
    displayName: input.displayName,
    approved: false,
    siteIds: [],
  };
  await setDoc(ref, {
    ...payload,
    requestedAt: serverTimestamp(),
  });
  return payload;
}

export async function getPortalUser(uid: string) {
  const snap = await getDoc(doc(db, "portalUsers", uid));
  if (!snap.exists()) return null;
  const data = snap.data() as Partial<PortalUser>;
  return {
    uid: data.uid || snap.id,
    email: data.email || "",
    displayName: data.displayName || data.email || snap.id,
    approved: Boolean(data.approved),
    siteIds: Array.isArray(data.siteIds) ? data.siteIds : [],
    requestedAt: data.requestedAt,
    approvedAt: data.approvedAt,
  } as PortalUser;
}

export async function listPortalUsers() {
  const snap = await getDocs(collection(db, "portalUsers"));
  return snap.docs.map((d) => {
    const data = d.data() as Partial<PortalUser>;
    return {
      uid: data.uid || d.id,
      email: data.email || "",
      displayName: data.displayName || data.email || d.id,
      approved: Boolean(data.approved),
      siteIds: Array.isArray(data.siteIds) ? data.siteIds : [],
      requestedAt: data.requestedAt,
      approvedAt: data.approvedAt,
    } as PortalUser;
  });
}

export async function approvePortalUser(uid: string, siteIds: string[]) {
  await updateDoc(doc(db, "portalUsers", uid), {
    approved: true,
    siteIds,
    approvedAt: serverTimestamp(),
  });
}

export async function revokePortalUser(uid: string) {
  await updateDoc(doc(db, "portalUsers", uid), {
    approved: false,
    siteIds: [],
  });
}
