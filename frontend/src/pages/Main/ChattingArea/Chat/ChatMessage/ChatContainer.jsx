import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import "./ChatContainer.css";

const ChatContainer = ({ messages, handleAvatarClick }) => {
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  const handleHover = (messageId, isHovered) => {
    setHoveredMessageId(isHovered ? messageId : null);
  };

  return (
    <div className="chat-container">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          handleAvatarClick={handleAvatarClick}
          isHovered={hoveredMessageId === message.id}
          onHover={(isHovered) => handleHover(message.id, isHovered)}
        />
      ))}
    </div>
  );
};

export default ChatContainer;
