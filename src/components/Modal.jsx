import React from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const handleConfirmModal = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button className="btn confirm-btn" onClick={handleConfirmModal}>
            Confirm
          </button>
          <button className="btn clear-btn" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
