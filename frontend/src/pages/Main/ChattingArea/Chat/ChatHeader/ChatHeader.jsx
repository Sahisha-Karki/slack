import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faLock, faHashtag } from "@fortawesome/free-solid-svg-icons";
import SessionModal from "./SessionModal/SessionModal";
import './ChatHeader.css';
import DirectMessageModal from "./DirectMessageModal/DirectMessageModal";



const ChannelHeader = ({ channelName, description, onDropdownClick, channelType }) => (
  <div className="chat-header-brand" onClick={onDropdownClick}>
    <div className="chat-header-channel-info">
      <span className="chat-header-channel-name">
        <FontAwesomeIcon icon={channelType === 'private' ? faLock : faHashtag} />
        {channelName}
        <FontAwesomeIcon icon={faChevronDown} className="chat-header-dropdown-icon" />
      </span>
      {description && <p className="chat-header-channel-description">{description}</p>}
    </div>
  </div>
);


const DirectMessageHeader = ({ userEmail, onDropdownClick }) => {
  const userName = userEmail ? userEmail.split('@')[0] : 'Unknown User';

  return (
    <div className="chat-header-brand" onClick={onDropdownClick}>
      <span className="chat-header-channel-name">
        {userName}
      </span>
      <FontAwesomeIcon icon={faChevronDown} className="chat-header-dropdown-icon" />
    </div>
  );
};

const ChatHeader = ({
  onDropdownClick,
  channelName,
  description,
  channelType,
  userEmail,
  onCanvasClick,
  onDirectMessageModalClick,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDirectMessageModalOpen, setDirectMessageModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openDirectMessageModal = () => setDirectMessageModalOpen(true);
  const closeDirectMessageModal = () => setDirectMessageModalOpen(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="chat-header">
        <nav className="chat-header-nav">
          {userEmail ? (
            <DirectMessageHeader 
              userEmail={userEmail} 
              onDropdownClick={openDirectMessageModal} 
            />
          ) : (
            <ChannelHeader 
              channelName={channelName} 
              description={description} 
              onDropdownClick={onDropdownClick} 
              channelType={channelType}
            />
          )}
          <div className="chat-header-nav-menu" ref={dropdownRef}>
            <div className="chat-header-nav-item">
              <div className="chat-header-nav-link" onClick={toggleDropdown}>
                <img src="./images/outline.png" alt="Session" />
                Sessions
                <FontAwesomeIcon icon={faChevronDown} className="chat-header-dropdown-arrow" />
              </div>
              {isDropdownOpen && (
                <div className="chat-header-dropdown-menu">
                  <div className="chat-header-dropdown-item" onClick={openModal}>
                    Start Session
                  </div>
                  <div className="chat-header-dropdown-item">Copy link</div>
                </div>
              )}
            </div>
            <div className="chat-header-nav-item" onClick={onCanvasClick}>
              <div className="chat-header-nav-link">
                <img src="./images/Canvas.png" alt="Canvas" />
                Canvases
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SessionModal isOpen={isModalOpen} onClose={closeModal} />
      <DirectMessageModal isOpen={isDirectMessageModalOpen} onClose={closeDirectMessageModal} userEmail={userEmail} />
    </>
  );
};


export default ChatHeader;