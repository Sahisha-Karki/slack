import React, { useState } from 'react';
import './AddPeopleModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddPeopleModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className="add-people-modal-overlay" onClick={onClose}>
      <div className="add-people-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="add-people-modal-header">
          <h2>Add people to this conversation</h2>
          <button className="add-people-modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <input type="text"
          className="add-people-textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="E.g john or @johndoe "
        />
        <p className="add-people-info">
          DMs can have up to 9 people (including you).
        </p>
        <div className="add-people-modal-footer">
          <button className="add-people-button" onClick={() => {/* Handle "Next" functionality */}}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddPeopleModal;
