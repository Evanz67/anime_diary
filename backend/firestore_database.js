import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const addUser = async (userData) => {
  try {
    const docRef = doc(db, "users", userData.uid);
    await setDoc(docRef, userData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getUser = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

export const addSeries = async (user, series) => {
  try {
    const docRef = await addDoc(collection(db, "users", user.uid, "series"), {
      ...series,
      entries: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getSeries = async (user) => {
  if (user) {
    try {
      const seriesRef = collection(db, "users", user.uid, "series");
      const seriesData = await getDocs(seriesRef);
      return seriesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  } else {
    return [];
  }
};

export const updateSeries = async (user, seriesId, seriesNewName) => {
  try {
    const seriesRef = doc(db, "users", user.uid, "series", seriesId);
    await updateDoc(seriesRef, {
      name: seriesNewName,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteSeries = async (user, seriesId) => {
  try {
    const seriesRef = doc(db, "users", user.uid, "series", seriesId);
    const entriesRef = collection(seriesRef, "entries");
    const entriesSnapshot = await getDocs(entriesRef);
    await Promise.all(
      entriesSnapshot.docs.map((entry) => deleteDoc(entry.ref)),
    );
    await deleteDoc(seriesRef);
    return seriesId;
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const addEntry = async (user, seriesId, entry) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", user.uid, "series", seriesId, "entries"),
      entry,
    );
    const entriesRef = collection(
      db,
      "users",
      user.uid,
      "series",
      seriesId,
      "entries",
    );
    const entriesData = await getDocs(entriesRef);
    const seriesRef = doc(db, "users", user.uid, "series", seriesId);
    await updateDoc(seriesRef, {
      entries: entriesData.docs.length,
    });
    const entryRef = [
      docRef.id,
      { id: seriesRef.id, entries: entriesData.docs.length },
    ];
    return entryRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getEntries = async (user, seriesId) => {
  try {
    const entriesRef = collection(
      db,
      "users",
      user.uid,
      "series",
      seriesId,
      "entries",
    );
    const entriesData = await getDocs(entriesRef);
    if (entriesData.docs.length === 0) {
      return [];
    }
    return entriesData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export const updateEntries = async (user, seriesId, entryId, entryNewData) => {
  const dataKey = ["name", "episode", "type"];
  try {
    const entriesRef = doc(
      db,
      "users",
      user.uid,
      "series",
      seriesId,
      "entries",
      entryId,
    );
    const updatedData = {};
    dataKey.forEach((key) => {
      if (
        entryNewData[key] !== "" &&
        entryNewData[key] !== undefined &&
        entryNewData[key] !== null &&
        entryNewData[key] !== 0
      ) {
        updatedData[key] = entryNewData[key];
      }
    });
    await updateDoc(entriesRef, updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteEntries = async (user, seriesId, entryId) => {
  try {
    const entriesRef = doc(
      db,
      "users",
      user.uid,
      "series",
      seriesId,
      "entries",
      entryId,
    );
    const entriesRefCollection = collection(
      db,
      "users",
      user.uid,
      "series",
      seriesId,
      "entries",
    );
    const seriesRef = doc(db, "users", user.uid, "series", seriesId);
    await deleteDoc(entriesRef);
    const entriesData = await getDocs(entriesRefCollection);
    await updateDoc(seriesRef, {
      entries: entriesData.docs.length,
    });
    const data = [entryId, seriesId, entriesData.docs.length];
    return data;
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
