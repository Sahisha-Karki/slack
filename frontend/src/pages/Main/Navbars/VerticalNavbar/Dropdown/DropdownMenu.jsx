import React, { useState } from 'react';
import './DropdownMenu.css';
import AddNewWorkspaceModal from '../AddWorkspaceModal';

const DropdownMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  return (
    <div className="dropdown-menu">
    <div className="dropdown-header">Create</div>
    <div className="dropdown-divider"></div>
    <div className="dropdown-section">
      <img src="./images/f8.png" alt="Add New Workspace Icon" className="dropdown-icon" />
      <div className="dropdown-text" onClick={showModal}>
        <div className="dropdown-title" >Add New Workspace</div>
        <p className="dropdown-description">Start a new Project with your teams</p>
      </div>
    </div>
      <div className="dropdown-section">
        <img src="./images/f1.png" alt="Message Icon" className="dropdown-icon" />
        <div className="dropdown-text">
          <div className="dropdown-title">Message</div>
          <p className="dropdown-description">Start a Conversation in a DM or channel</p>
        </div>
      </div>
      <div className="dropdown-section">
        <img src="./images/f5.png" alt="Channel Icon" className="dropdown-icon" />
        <div className="dropdown-text">
          <div className="dropdown-title">Channel</div>
          <p className="dropdown-description">Start a new channel</p>
        </div>
      </div>
      <div className="dropdown-section">
        <img src="./images/f6.png" alt="Session Icon" className="dropdown-icon" />
        <div className="dropdown-text">
          <div className="dropdown-title">Session</div>
          <p className="dropdown-description">Start a session in channels or DMs</p>
        </div>
      </div>
      <div className="dropdown-section">
        <img src="./images/f7.png" alt="Canvas Icon" className="dropdown-icon" />
        <div className="dropdown-text">
          <div className="dropdown-title">Canvas</div>
          <p className="dropdown-description">Start a new canvas</p>
        </div>
      </div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-footer">Invite people</div>
      {modalVisible && <AddNewWorkspaceModal onClose={hideModal} />}
    </div>
  );
};

export default DropdownMenu;
