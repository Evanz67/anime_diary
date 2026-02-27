import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCzhbevcrmT3QrIamyuXs8KbSBqYB_tbH8",
  authDomain: "anime-diary-40098.firebaseapp.com",
  projectId: "anime-diary-40098",
  storageBucket: "anime-diary-40098.firebasestorage.app",
  messagingSenderId: "689157072913",
  appId: "1:689157072913:web:709bf05c0e0ddee31f69b0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}