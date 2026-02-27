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

export const addSeries = async (user, series) => {
  try {
    const docRef = doc(db, "anime", user.uid, "series", series.name)
    await setDoc(docRef, series)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const getSeries = async (user) => {
  if (user) {
    try {
      const seriesRef = collection(db, "anime", user.uid, "series")
      const seriesData = await getDocs(seriesRef)
    return seriesData.docs.map(doc => 
      ({ 
        ...doc.data() 
      }))
    } catch (error) {
      console.error("Error getting documents: ", error)
    } 
  } else {
    return []
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

