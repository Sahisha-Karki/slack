import React, { useState } from 'react';
import Sidebar from './sidebar'; // Adjust the import path if necessary
import SettingsContent from './settingsContent'; // Adjust the import path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import '../../../src/Styles/Setting/settingModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('Account');

  if (!isOpen) return null; // Don't render anything if not open

  const handleClose = () => {
    if (onClose) onClose(); // Call the onClose handler passed from TopNav
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2> <FontAwesomeIcon icon={faCog} /> Settings</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="modal-body">
          <Sidebar onSectionChange={setSelectedSection} />
          <SettingsContent section={selectedSection} />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
