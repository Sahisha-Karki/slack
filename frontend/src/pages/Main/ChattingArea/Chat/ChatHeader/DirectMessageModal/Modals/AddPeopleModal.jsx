import React, { useState } from 'react';
import './AddPeopleModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IncludeConversationHistoryModal from './IncludeConversationHistoryModal';

const AddPeopleModal = ({ onClose }) => {
  const [showIncludeHistory, setShowIncludeHistory] = useState(false);

  const handleNext = () => {
    setShowIncludeHistory(true);
  };

  const handleBack = () => {
    setShowIncludeHistory(false);
  };

  const handleDone = () => {
    console.log('Done');
    onClose(); // Close the modal on Done
  };

  return (
    <>
      <div className="add-people-modal-overlay">
        <div className="add-people-modal-content">
          <div className="add-people-modal-header">
            <h3>Add people to this conversation</h3>
            <button
              className="add-people-modal-close"
              onClick={onClose}
              aria-label="close add people modal"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="add-people-modal-body">
            <input
              type="text"
              placeholder="E.g john or @johndoe"
              className="add-people-modal-input"
            />
            <p style={{ fontSize: '14px', margin: '0' }}>Dms can have up to 9 people (including you).</p>
          </div>
          <div className="add-people-modal-footer">
            <button className="add-people-modal-next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
      {showIncludeHistory && (
        <IncludeConversationHistoryModal
          onClose={onClose}
          onBack={handleBack}
          onDone={handleDone}
        />
      )}
    </>
  );
};

export default AddPeopleModal;
