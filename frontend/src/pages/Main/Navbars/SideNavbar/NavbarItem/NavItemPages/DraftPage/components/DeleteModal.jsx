import React from 'react';
import { FaTimes } from 'react-icons/fa';

const DeleteModal = ({ show, onClose, onDelete, itemCount }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <div className="delete-modal-header">
                    <h2>Delete {itemCount} drafts?</h2>
                    <button className="delete-close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="delete-modal-body">
                    <p>Are you sure you want to delete these drafts? Once deleted, they cannot be undone.</p>
                </div>
                <div className="delete-modal-footer">
                    <button className="delete-cancel-button" onClick={onClose}>Cancel</button>
                    <button className="delete-confirm-delete-button" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
