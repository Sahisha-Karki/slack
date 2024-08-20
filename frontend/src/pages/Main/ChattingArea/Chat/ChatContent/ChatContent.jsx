import React from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ProfileSection from "../../../../../components/Profile/UserProfile/ProfileSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ChatContent.css";

const ChatContent = ({
  showProfile,
  handleAvatarClick,
  handleCloseProfile,
  messages,
  hoveredMessageId,
  onHover,
  onEditMessage // Added prop
}) => {
  return (
    <div className={`chat-content ${showProfile ? 'user-active' : ''}`}>
      {messages.length > 0 ? (
        messages.map((message) => (
          <ChatMessage
            key={message._id}  // Ensure unique key for each message
            message={message}
            handleAvatarClick={handleAvatarClick}
            isHovered={hoveredMessageId === message._id}
            onHover={(isHovered) => onHover(message._id, isHovered)}
            onEdit={() => onEditMessage(message._id, message.content)} // Pass edit handler
          />
        ))
      ) : (
        <div className="no-messages">
          <p>No messages to display</p>
        </div>
      )}
      {showProfile && (
        <div className="profile-section">
          <ProfileSection />
          <button className="close-profile" onClick={handleCloseProfile}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
