import React, { useState, useEffect } from 'react';
import './DirectMessageModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUserPlus, faBell } from '@fortawesome/free-solid-svg-icons';
import AddPeopleModal from './Modals/AddPeopleModal';

const DirectMessageModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    if (isOpen) {
      updateTime(); // Set initial time
      const timer = setInterval(updateTime, 60000); // Update time every minute
      return () => clearInterval(timer); // Cleanup interval on component unmount or when isOpen changes
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowAddPeople(false); // Close 'Add People' view when changing sections
  };

  const handleMute = () => {
    console.log('Muted');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStartSession = () => {
    console.log('Start Session');
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const handleCopyLink = () => {
    console.log('Copy session link');
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const handleAddPeople = () => {
    setShowAddPeople(true);
  };

  const handleClose = () => {
    setShowAddPeople(false);
    onClose();
  };

  return (
    <>
      {showAddPeople ? (
        <AddPeopleModal onClose={() => setShowAddPeople(false)} />
      ) : (
        <div className="direct-message-modal-overlay">
          <div className="direct-message-modal-content">
            <div className="direct-message-modal-top-nav">
              <div className="direct-message-title-container">
                <div className="direct-message-title">
                  <p># general</p>
                </div>
              </div>
              <div className="direct-message-modal-buttons">
                <button
                  className="direct-message-mute-modal"
                  onClick={handleMute}
                  aria-label="mute conversation"
                >
                  <img src="./images/ci_bell.png" alt="Bell" />
                  <span>Mute</span>
                </button>
                <button
                  className="direct-message-dropdown-toggle"
                  onClick={toggleDropdown}
                >
                  <img src="./images/ci_outline.png" alt="outline" />
                </button>
                {dropdownOpen && (
                  <div className="direct-message-dropdown-menu">
                    <button onClick={handleStartSession}>Start Session</button>
                    <button onClick={handleCopyLink}>Copy session link</button>
                  </div>
                )}
                <button
                  className="direct-message-close-modal"
                  onClick={handleClose}
                  aria-label="close modal"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            <div className="direct-message-modal-body">
              <nav className="direct-message-modal-nav">
                <ul>
                  <li onClick={() => handleSectionChange('about')}>
                    <img src="./images/isymbol.png" alt="" /> About
                  </li>
                </ul>
              </nav>
              <div className="direct-message-modal-content">
                {activeSection === 'about' && (
                  <div className="direct-message-content-section">
                    <div className="direct-message-topic-section">
                      <h3>Topic</h3>
                      <button className="direct-message-edit-topic">Edit</button>
                    </div>
                    <div className="direct-message-info-section">
                      <p>{currentTime} local time</p>
                      <p>johndoe@gmail.com</p>
                      <a href="#" className='direct-message-view-profile'> View full Profile</a>
                    </div>
                    <div className="direct-message-add-people-section">
                      <FontAwesomeIcon icon={faUserPlus} /> 
                      <button className="direct-message-add-people" onClick={handleAddPeople}>Add people to this conversation</button>
                    </div>
                    <div className="direct-message-files-section">
                      <p style={{ fontWeight: 600 }}>Files</p>
                      <p>There aren’t any files to see right now.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DirectMessageModal;
