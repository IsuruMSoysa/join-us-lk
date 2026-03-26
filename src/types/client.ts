import { type Timestamp } from "firebase/firestore";

export type ClientDocument = {
  name: string;
  email: string;
  accessCode: string;
  siteIds: string[];
  createdAt?: Timestamp;
};
