import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  type FeaturedTemplateDocument,
  type FeaturedTemplateWithId,
} from "../../types/featuredTemplate";

const COLLECTION = "featuredTemplates";

export async function getPublishedFeaturedTemplates(
  maxItems = 12,
): Promise<FeaturedTemplateWithId[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("sortOrder", "asc"),
    limit(maxItems),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as FeaturedTemplateDocument),
  }));
}

export async function listAllFeaturedTemplatesAdmin(): Promise<FeaturedTemplateWithId[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  const items = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as FeaturedTemplateDocument),
  }));
  return items.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createFeaturedTemplate(payload: FeaturedTemplateDocument) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateFeaturedTemplate(
  id: string,
  payload: Partial<FeaturedTemplateDocument>,
) {
  await updateDoc(doc(db, COLLECTION, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteFeaturedTemplate(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
