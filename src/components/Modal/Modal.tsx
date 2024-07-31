import { useEffect, useRef } from "react";
import { useModal } from "../../store/ModalContext";

const Modal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const { closeModal, modalContent } = useModal()

  useEffect(() => {
    if (modalContent) {
      modalRef.current?.showModal();
    }
  }, [modalContent]);

  function closeHandle() {
    closeModal();
    modalRef.current?.close();
  }

  return (
    <dialog className="modal" ref={modalRef}>
      <h2>{modalContent?.title}</h2>
      <button onClick={closeHandle}>Close Modal</button>
    </dialog>
  )
}

export default Modal;