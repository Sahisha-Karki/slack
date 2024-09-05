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
  onEditMessage,
  userId,
  userEmail, 
  currentUserId 
}) => {
  return (
    <div className={`chat-contenttttttttt ${showProfile ? 'user-active' : ''}`}>
      {messages.length > 0 ? (
        messages.map((message) => (
          <ChatMessage
            key={message._id || message.id} // Use _id or id, whichever is available
            message={message}
            handleAvatarClick={handleAvatarClick}
            isHovered={hoveredMessageId === (message._id || message.id)}
            onHover={(isHovered) => onHover(message._id || message.id, isHovered)}
            onEdit={() => onEditMessage(message._id || message.id, message.content)}
            userEmail={userEmail}
            isSelfMessage={message.isSelfMessage}
            isCurrentUser={message.sender === currentUserId} // Add this prop
          />
        ))
      ) : (
        <div className="no-messages">
          <p>No messages to display</p>
        </div>
      )}
      {showProfile && (
        <div className="profile-section">
          <ProfileSection userId={userId} />
          <button className="close-profile" onClick={handleCloseProfile}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatContent;