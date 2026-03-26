import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { type RsvpDocument } from "../../types/site";

export async function submitRsvp(
  siteId: string,
  data: { inviteeSlug: string; name: string; attendance: "yes" | "no" },
) {
  await addDoc(collection(db, "sites", siteId, "rsvps"), {
    ...data,
    submittedAt: serverTimestamp(),
  });
}

export async function getRsvps(siteId: string) {
  const q = query(
    collection(db, "sites", siteId, "rsvps"),
    orderBy("submittedAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as RsvpDocument) }));
}
