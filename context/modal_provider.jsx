'use client';

import { useState, createContext, useContext } from 'react';

const modalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState([]);

  const openModal = (name) => {
    setModalState(prev => [...prev, name]);
  };

  const closeModal = () => {
    setModalState(prev => prev.slice(0, -1));
  };

  const value = {
    openModal,
    closeModal,
    modalState,
  };

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
}

export const useModal = () => useContext(modalContext);
