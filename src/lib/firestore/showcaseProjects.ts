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
  type ShowcaseProjectDocument,
  type ShowcaseProjectWithId,
} from "../../types/showcaseProject";

const COLLECTION = "showcaseProjects";

export async function getPublishedShowcaseProjects(
  maxItems = 24,
): Promise<ShowcaseProjectWithId[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("sortOrder", "asc"),
    limit(maxItems),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as ShowcaseProjectDocument),
  }));
}

export async function listAllShowcaseProjectsAdmin(): Promise<ShowcaseProjectWithId[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  const items = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as ShowcaseProjectDocument),
  }));
  return items.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createShowcaseProject(payload: ShowcaseProjectDocument) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateShowcaseProject(
  id: string,
  payload: Partial<ShowcaseProjectDocument>,
) {
  await updateDoc(doc(db, COLLECTION, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteShowcaseProject(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
