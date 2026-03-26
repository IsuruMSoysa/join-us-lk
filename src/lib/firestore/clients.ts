import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { type ClientDocument } from "../../types/client";

export async function verifyAccessCode(accessCode: string) {
  const q = query(
    collection(db, "clients"),
    where("accessCode", "==", accessCode.trim()),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const first = snap.docs[0];
  return { id: first.id, ...(first.data() as ClientDocument) };
}

export async function getClients() {
  const snap = await getDocs(collection(db, "clients"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ClientDocument) }));
}
