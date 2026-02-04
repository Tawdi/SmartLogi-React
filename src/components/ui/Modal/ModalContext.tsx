import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ModalContextType {
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  isModalOpen: (modalId: string) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());

  const openModal = (modalId: string) => {
    setOpenModals(prev => new Set([...prev, modalId]));
  };

  const closeModal = (modalId: string) => {
    setOpenModals(prev => {
      const newSet = new Set(prev);
      newSet.delete(modalId);
      return newSet;
    });
  };

  const closeAllModals = () => {
    setOpenModals(new Set());
  };

  const isModalOpen = (modalId: string) => {
    return openModals.has(modalId);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        closeAllModals,
        isModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
