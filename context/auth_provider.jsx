'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  sendEmailVerification,
} from '@/backend/firebase';
import { deleteUserData } from '@/backend/firestore_database';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        user
          .reload()
          .then(() => {
            if (!user.emailVerified) {
              alert('Please verify your email before logging in. Check spam folder if you cannot find the email.');
              return signOut(auth);
            }
          })
          .then(() => {
            if (user.emailVerified) {
              setUser(user);
            }
          })
          .finally(() => setLoading(false));
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signUp = async (email, password) => {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    alert(`User "${email}" signed up successfully!`);
    await sendEmailVerification(userInfo.user);
    await signOut(auth);
    return userInfo;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const changePassword = async (oldPassword, newPassword) => {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    return updatePassword(auth.currentUser, newPassword);
  };

  const deleteAccount = async (password) => {
    const userBeingDeleted = auth.currentUser;
    if (!userBeingDeleted) {
      throw new Error('No user is currently logged in');
    }
    const credential = EmailAuthProvider.credential(
      userBeingDeleted.email,
      password,
    );
    {
      /* I want to make sure that the data from user is deleted first. And if it fails, it will
      abort the whole process. This is to make sure that if for some reason the data deletion fails, and the user account succeeds, then
      we won't have to worry about the reference to that data being lost. */
    }
    try {
      // If the user enters the wrong password, then nothing will happen and skips the whole process
      await reauthenticateWithCredential(userBeingDeleted, credential);
    } catch (error) {
      throw new Error('Wrong password. Account deletion aborted.');
    }
    // If this fails, it will throw an error and skip the deletion process
    await deleteUserData(userBeingDeleted);
    await deleteUser(userBeingDeleted);
  };

  const value = {
    user,
    signUp,
    login,
    logout,
    resetPassword,
    changePassword,
    deleteAccount,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
