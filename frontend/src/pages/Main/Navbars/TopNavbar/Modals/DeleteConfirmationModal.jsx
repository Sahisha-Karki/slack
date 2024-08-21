import React from 'react';
import './DeleteConfirmationModal.css'; // Create this CSS file for styling

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation">
        <button className="delete-close" onClick={onClose}>×</button>
        <h3>Delete items?</h3>
        <p>Are you sure you want to delete all items? This action cannot be undone.</p>
        <div className="delete-confirmation-buttons">
          <button className="delete-confirmation-cancel" onClick={onClose}>Cancel</button>
          <button className="delete-confirmation-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
