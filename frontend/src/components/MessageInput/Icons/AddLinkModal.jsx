import React, { useState } from 'react';
import '../../../Styles/MessageInput/Icon/AddLinkModal.css';

const AddLinkModal = ({ isOpen, onClose, onSave }) => {
  const [modalLinkText, setModalLinkText] = useState('');
  const [modalLinkUrl, setModalLinkUrl] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (modalLinkText && modalLinkUrl) {
      onSave(modalLinkText, modalLinkUrl);
      setModalLinkText('');
      setModalLinkUrl('');
    } else {
      alert('Please provide both title and URL.');
    }
  };

  return (
    <div className="add-link-modal-overlay">
      <div className="add-link-modal-content">
        <h3>Add Link</h3>
        <div className="add-link-modal-form">
          <label>
            Title:
            <input 
              type="text" 
              value={modalLinkText} 
              onChange={(e) => setModalLinkText(e.target.value)} 
            />
          </label>
          <label>
            URL:
            <input 
              type="text" 
              value={modalLinkUrl} 
              onChange={(e) => setModalLinkUrl(e.target.value)} 
            />
          </label>
          <div className="add-link-modal-form-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;
