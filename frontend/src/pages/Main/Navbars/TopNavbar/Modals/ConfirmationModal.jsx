import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isVisible, title, message, onClose, onConfirm, confirmButtonText }) => {
  if (!isVisible) return null;

  return (
    <div className="Confirmation-modal-overlay">
      <div className="Confirmation-modal">
        <button className="Confirmation-modal-close-button" onClick={onClose}>×</button>
        <h2 className="Confirmation-modal-title">{title}</h2>
        <p className="Confirmation-modal-message">{message}</p>
        <div className="Confirmation-modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>{confirmButtonText || "Confirm"}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
