import React, { useState } from 'react';
import './CanvasModal.css';
import IconBar from '../../../../../../../components/Shared/IconBar'; 

const CanvasModal = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  return (
    <div className="canvas-modal-overlay" onClick={onClose}>
      <div className="canvas-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="canvas-modal-navbar">
          <span className="navbar-title">Notes</span>
          <div className="navbar-buttons">
            <button className="close-button" onClick={onClose}>✖</button>
          </div>
        </div>
        <textarea
          className="note-taking-area"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your thoughts or anything important"
        />
        <IconBar />
      </div>
    </div>
  );
};

export default CanvasModal;
