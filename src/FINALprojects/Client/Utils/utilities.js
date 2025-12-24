import {
  collection,
  query,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../Data";

// ===== LOAD =====
async function load(collectionName) {
  const q = query(collection(db, collectionName));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    //  Timestamp
    Object.keys(data).forEach((key) => {
      if (data[key]?.toDate) {
        data[key] = data[key].toDate().toISOString();
      }
    });

    return {
      id: docSnap.id,
      ...data,
    };
  });
}


// ===== ADD =====
async function add(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef; // מחזיר { id }
}

// ===== UPDATE =====
async function update(collectionName, id, data) {
  if (!id) throw new Error("Missing document id for update");
  const ref = doc(db, collectionName, id);
  return await setDoc(ref, data, { merge: true });
}

// ===== DELETE =====
async function delete_action(collectionName, id) {
  if (!id) throw new Error("Missing document id for delete");
  const ref = doc(db, collectionName, id);
  return await deleteDoc(ref);
}

export { load, add, update, delete_action };





