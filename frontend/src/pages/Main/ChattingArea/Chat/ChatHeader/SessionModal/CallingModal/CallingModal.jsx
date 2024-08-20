import React from 'react';
import './CallingModal.css'; // Create and style this CSS file accordingly

const CallingModal = ({ isOpen, onClose, onJoin }) => {
  if (!isOpen) return null;

  return (
    <div className="calling-modal-overlay" onClick={onClose}>
      <div className="calling-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Invite to Session</h2>
        <p className="invitation-message">
          John Doe invited you to join the session in <span className="session-name">#general</span>
        </p>
        <div className="calling-modal-buttons">
          <button className="reject-button" onClick={onClose}>Reject</button>
          <button className="join-button" onClick={onJoin}>Join</button>
        </div>
      </div>
    </div>
  );
};

export default CallingModal;
