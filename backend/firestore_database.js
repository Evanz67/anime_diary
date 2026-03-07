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
    const docRef = await addDoc(collection(db, "users", user.uid, "series"), series)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const getSeries = async (user) => {
  if (user) {
    try {
      const seriesRef = collection(db, "users", user.uid, "series")
      const seriesData = await getDocs(seriesRef)
    return seriesData.docs.map(doc => 
      ({ 
        id: doc.id,
        ...doc.data() 
      }))
    } catch (error) {
      console.error("Error getting documents: ", error)
    } 
  } else {
    return []
  }
} 

export const addEntry = async (user, seriesId, entry) => {
  try {
    const docRef = await addDoc(collection(db, "users", user.uid, "series", seriesId, "entries"), entry)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const getEntries = async (user, seriesId) => {
  try {
    const entriesRef = collection(db, "users", user.uid, "series", seriesId, "entries")
    const entriesData = await getDocs(entriesRef)
    if (entriesData.docs.length === 0) {
      return []
    }
    return entriesData.docs.map(doc => 
      ({ 
        id: doc.id,
        ...doc.data() 
      }))
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
}

