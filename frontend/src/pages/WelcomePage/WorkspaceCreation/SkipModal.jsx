import React from 'react';
import '../../../Styles/WelcomePage/SkipModal.css';

const SkipModal = ({ isOpen, onClose, onSkip }) => {
  if (!isOpen) return null;

  return (
    <div className="skip-modal-overlay">
      <div className="skip-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Skip without inviting?</h2>
        <p>To really get a feel for Slack - and to see all the ways it can simplify your team's work - you'll need a few coworkers here.</p>
        <div className="skip-modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="skip-button" onClick={onSkip}>Skip</button>
        </div>
      </div>
    </div>
  );
};


export default SkipModal;