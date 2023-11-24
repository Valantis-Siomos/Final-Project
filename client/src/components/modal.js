import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this item?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default Modal;
