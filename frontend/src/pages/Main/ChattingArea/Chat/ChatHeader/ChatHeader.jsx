// ChatHeader.js
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faLock, faHashtag } from "@fortawesome/free-solid-svg-icons";
import SessionModal from "./SessionModal/SessionModal";
import './ChatHeader.css';
import DirectMessageModal from "./DirectMessageModal/DirectMessageModal"; // Import DirectMessageModal

const ChannelHeader = ({ channelName, onDropdownClick }) => (
  <div className="chat-header-brand" onClick={onDropdownClick}>
    <span className="chat-header-channel-name">
      <FontAwesomeIcon icon={faHashtag} /> {channelName}
    </span>
    <FontAwesomeIcon icon={faChevronDown} className="chat-header-dropdown-icon" />
  </div>
);

const DirectMessageHeader = ({ userId, onDropdownClick }) => (
  <div className="chat-header-brand" onClick={onDropdownClick}>
    <span className="chat-header-channel-name">
      {userId}
    </span>
    <FontAwesomeIcon icon={faChevronDown} className="chat-header-dropdown-icon" />
  </div>
);

const ChatHeader = ({ onDropdownClick, channelName, channelType, userId, onCanvasClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDirectMessageModalOpen, setDirectMessageModalOpen] = useState(false); // State for Direct Message Modal
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openDirectMessageModal = () => setDirectMessageModalOpen(true); // Open Direct Message Modal
  const closeDirectMessageModal = () => setDirectMessageModalOpen(false); // Close Direct Message Modal

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="chat-header">
        <nav className="chat-header-nav">
          {channelType === "private" ? (
            <DirectMessageHeader userId={userId} onDropdownClick={openDirectMessageModal} />
          ) : (
            <ChannelHeader channelName={channelName} onDropdownClick={onDropdownClick} />
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
            <div className="chat-header-nav-icons">
              <div className="chat-header-nav-item">
                <div className="chat-header-nav-link">
                  <img src="./images/bell.png" alt="Bell" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SessionModal isOpen={isModalOpen} onClose={closeModal} />
      <DirectMessageModal isOpen={isDirectMessageModalOpen} onClose={closeDirectMessageModal} /> {/* Include DirectMessageModal */}
    </>
  );
};

export default ChatHeader;
