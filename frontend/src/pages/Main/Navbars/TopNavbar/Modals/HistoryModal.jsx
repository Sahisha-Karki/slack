import React, { useState } from 'react';
import './HistoryModal.css';
import ConfirmationModal from './ConfirmationModal';

const HistoryModal = ({ isOpen, onClose }) => {
  const [isClearAllModalVisible, setClearAllModalVisible] = useState(false);
  const [isClearItemModalVisible, setClearItemModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!isOpen) return null;

  const historyItems = [
    { icon: '#', text: 'general' },
    { icon: '🔒', text: 'attendence' },
    { icon: 'J', text: 'John Doe', isProfile: true },
    { icon: '✈️', text: 'Drafts and sent' },
    { icon: '#', text: 'random' },
    { icon: '@', text: 'Mentions & Reactions' },
  ];

  const handleClearAll = () => {
    setClearAllModalVisible(false);
  };

  const handleClearItem = () => {
    console.log(`Cleared item: ${selectedItem.text}`);
    setClearItemModalVisible(false);
  };

  const showClearItemModal = (item) => {
    setSelectedItem(item);
    setClearItemModalVisible(true);
  };

  return (
    <div className="history-modal-overlay">
      <div className="history-modal">
        <div className="history-modal-header">
          <h2>History</h2>
          <div className="header-buttons">
            <button className="clear-all" onClick={() => setClearAllModalVisible(true)}>
              <img src="./images/HistoryModal/carbon_clean.png" alt="ClearIcon" />
              Clear all
            </button>
            <button className="history-modal-close" onClick={onClose}>×</button>
          </div>
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
                <button className="history-delete-button" onClick={() => showClearItemModal(item)}>
                  <img src="./images/HistoryModal/delete-outline.png" alt="DeleteIcon" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ConfirmationModal
  isVisible={isClearAllModalVisible}
  title="Clear all History?"
  message="Are you sure you want to clear all History? Once, it’s done it cannot be undone."
  onClose={() => setClearAllModalVisible(false)}
  onConfirm={handleClearAll}
  confirmButtonText="Clear All"
/>

<ConfirmationModal
  isVisible={isClearItemModalVisible}
  title="Clear History?"
  message="Are you sure you want to clear this from History? Once, it’s done it cannot be undone."
  onClose={() => setClearItemModalVisible(false)}
  onConfirm={handleClearItem}
  confirmButtonText="Clear"
/>

    </div>
  );
};

export default HistoryModal;
