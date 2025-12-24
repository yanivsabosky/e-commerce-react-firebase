import { db } from "../Data"
import {
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

//Creating Order
export async function addOrder(total, items, uid) {
  const order = {
    userId: uid,
    total,
    items,
    createdAt: serverTimestamp()
  };

  const colRef = await addDoc(collection(db, "orders"), order);
  return colRef.id;
}

// Get Orders From Logged User
export async function getUserOrders(uid) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
