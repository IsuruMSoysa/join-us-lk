import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { type SiteDocument, type SiteStatus } from "../../types/site";

export async function getSiteBySlug(slug: string) {
  const q = query(
    collection(db, "sites"),
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const first = snap.docs[0];
  return { id: first.id, ...(first.data() as SiteDocument) };
}

export async function getSites() {
  const snap = await getDocs(collection(db, "sites"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as SiteDocument) }));
}

export async function getSiteById(siteId: string) {
  const snap = await getDoc(doc(db, "sites", siteId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as SiteDocument) };
}

export async function createSite(payload: SiteDocument) {
  const docRef = await addDoc(collection(db, "sites"), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateSite(siteId: string, payload: Partial<SiteDocument>) {
  await updateDoc(doc(db, "sites", siteId), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function setSiteStatus(siteId: string, status: SiteStatus) {
  await updateDoc(doc(db, "sites", siteId), {
    status,
    updatedAt: serverTimestamp(),
  });
}
