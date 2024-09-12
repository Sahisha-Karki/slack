import React from 'react';
import '../../Styles/ReactionEmojies/DeleteModal.css'; 

const DeleteConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onCancel}>&times;</button>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this message? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button className="delete-btn" onClick={onConfirm}>Yes, Delete</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;