import React, { useState } from 'react';
import './HistoryModal.css';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import the new component

const HistoryModal = ({ onClose, onClearAll }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleClearAll = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    onClearAll();
    setShowDeleteConfirmation(false);
  };

  const historyItems = [
    { icon: '#', text: 'general' },
    { icon: '🔒', text: 'attendence' },
    { icon: 'J', text: 'John Doe', isProfile: true },
    { icon: '✈️', text: 'Drafts and sent' },
    { icon: '#', text: 'random' },
    { icon: '@', text: 'Mentions & Reactions' },
  ];

  return (
    <div className="history-modal-overlay">
      <div className="history-modal">
        <div className="history-modal-header">
          <h2>History</h2>
          <button className="clear-all" onClick={handleClearAll}>
            <i className="fas fa-broom"></i> Clear all
          </button>
          <button className="close" onClick={onClose}>×</button>
        </div>
        <div className="history-modal-content">
          <h3>Recent</h3>
          <ul className="history-list">
            {historyItems.map((item, index) => (
              <li key={index} className="history-item">
                <span className={`history-icon ${item.isProfile ? 'profile-icon' : ''}`}>
                  {item.icon}
                </span>
                <span className="history-text">{item.text}</span>
                <button className="delete-button">
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default HistoryModal;
