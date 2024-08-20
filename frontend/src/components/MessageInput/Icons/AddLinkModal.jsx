import React, { useState } from 'react';
import '../../../Styles/MessageInput/Icon/AddLinkModal.css';

const AddLinkModal = ({ isOpen, onClose, onSave }) => {
  const [modalLinkText, setModalLinkText] = useState('');
  const [modalLinkUrl, setModalLinkUrl] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(modalLinkText, modalLinkUrl);
    setModalLinkText('');
    setModalLinkUrl('');
  };

  return (
    <div className="add-link-modal-overlay">
      <div className="add-link-modal-content">
        <button className="add-link-modal-close" onClick={onClose}>&times;</button>
        <h3>Add Link</h3>
        <div className="add-link-modal-form">
          <label>
            Text Label:
            <input 
              type="text" 
              value={modalLinkText} 
              onChange={(e) => setModalLinkText(e.target.value)} 
            />
          </label>
          <label>
            Link URL:
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
