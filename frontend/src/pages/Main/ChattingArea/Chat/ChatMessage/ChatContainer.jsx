import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ProfileSection from "./ProfileSection";
import "./ChatContainer.css";

const ChatContainer = ({ messages }) => {
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null); // State for selected user profile
  console.log(selectedUserProfile,"SELECTED USer profile")

  const handleHover = (messageId, isHovered) => {
    setHoveredMessageId(isHovered ? messageId : null);
  };

  const handleAvatarClick = (profile) => {
    setSelectedUserProfile(profile); // Set the clicked user's profile
  };

  return (
    <div className="chat-container">

      {messages.length === 0 ? (
        <div className="no-messages">No messages</div>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message._id} // Ensure _id is unique
            message={message}
            handleAvatarClick={handleAvatarClick} // Pass profile object
            isHovered={hoveredMessageId === message._id}
            onHover={(isHovered) => handleHover(message._id, isHovered)}
            setSelectedUserProfile={setSelectedUserProfile}
          />
        ))
      )}
    </div>
  );
};

export default ChatContainer;