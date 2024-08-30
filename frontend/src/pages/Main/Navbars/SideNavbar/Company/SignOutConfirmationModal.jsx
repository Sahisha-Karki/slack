// SignOutConfirmationModal.js
import React from 'react';
import './SignOutConfirmationModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SignOutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="signout-confirmation-overlay">
      <div className="signout-confirmation-content">
        <button className="signout-confirmation-close" onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Ready to Say Goodbye?</h2>
        <p>We’ll be sad to see you go! Are you sure you want to sign out?</p>
        <div className="signout-confirmation-buttons">
          <button onClick={onConfirm} className="signout-confirmation-confirm">Yes, Sign Out</button>
          <button onClick={onClose} className="signout-confirmation-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmationModal;
