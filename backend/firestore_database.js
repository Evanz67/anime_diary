import { 
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from './firebase'
import { useAuth } from "@/backend/auth_provider"

export const addUser = async (userData) => {
  try {
    const docRef = doc(db, "users", userData.uid)
    await setDoc(docRef, userData)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const getUser = async (uid) => {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error getting document: ", error)
  }
}

export const addSeries = async (series) => {
  try {
    const { user } = useAuth()
    const docRef = doc(db, "anime", user.uid, "series", series)
    await setDoc(docRef, series)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const getSeries = async (uid) => {
  try {
    const seriesRef = collection(db, "anime")
    const q = query(seriesRef, where("uid", "==", uid))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
} 

export const addEntry = async (entryData) => {
  try {
    const docRef = await addDoc(collection(db, "entries"), entryData)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const getEntries = async (uid) => {
  try {
    const entriesRef = collection(db, "entries")
    const q = query(entriesRef, where("uid", "==", uid))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
}

