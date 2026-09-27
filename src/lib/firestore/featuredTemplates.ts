import {
  addDoc,
  collection,
  deleteDoc,
  type DocumentData,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryDocumentSnapshot,
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
  const items = snap.docs.map(toFeaturedTemplate);
  return items.sort(sortNewFirst);
}

export async function listAllFeaturedTemplatesAdmin(): Promise<FeaturedTemplateWithId[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  const items = snap.docs.map(toFeaturedTemplate);
  return items.sort(sortNewFirst);
}

// Pre-existing rows predate the `isNew` field, so default it rather than
// let it come back as `undefined` from Firestore.
function toFeaturedTemplate(
  d: QueryDocumentSnapshot<DocumentData>,
): FeaturedTemplateWithId {
  const data = d.data() as FeaturedTemplateDocument;
  return { id: d.id, ...data, isNew: data.isNew ?? false };
}

function sortNewFirst(a: FeaturedTemplateWithId, b: FeaturedTemplateWithId) {
  return Number(b.isNew) - Number(a.isNew) || a.sortOrder - b.sortOrder;
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
