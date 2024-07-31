import { createContext, useState, useContext } from "react";
import { Media } from "../types/types";

type ModalContextType = {
  openModal: (media: Media) => void;
  closeModal: () => void;
  modalContent: Media | null;
}

const ModalCtx = createContext<ModalContextType | undefined>(undefined);

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<Media | null>(null);

  function openModal(object: Media) {
    setModalContent(object);
  }

  function closeModal() {
    setModalContent(null);
  }

  const ctxValue = {
    openModal,
    closeModal,
    modalContent
  }

  return <ModalCtx.Provider value={ctxValue}> {children} </ModalCtx.Provider>
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalCtx);

  if (!context) {
    throw new Error('useModal must be used within a ModalContextProvider');
  }
  return context;
}