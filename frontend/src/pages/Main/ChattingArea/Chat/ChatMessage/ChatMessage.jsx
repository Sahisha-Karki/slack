import React, { useState } from "react";
import axios from 'axios';
import { format, toZonedTime } from 'date-fns-tz';
import EmojiReactions from "../../../../../components/ReactionEmojies/ReactionEmojies";
import "./ChatMessage.css";

const ChatMessage = ({
  message,
  handleAvatarClick,
  isHovered,
  onHover,
  onEdit, // Add this prop
}) => {
  const [reactions, setReactions] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle empty dateString
    const timeZone = 'Asia/Kathmandu'; // Replace with your time zone
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Handle invalid date
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'hh:mm a', { timeZone });
  };

  // Function to handle reactions
  const handleReaction = (emoji) => {
    setReactions((prev) => {
      if (prev[message.id] && prev[message.id].src === emoji.src) {
        const updatedReactions = { ...prev };
        delete updatedReactions[message.id];
        return updatedReactions;
      } else {
        return {
          ...prev,
          [message.id]: emoji
        };
      }
    });
  };

  // Function to convert newlines to <br> tags
  const formatMessageContent = (content) => {
    if (!content) return '';
    return content.split('\n').map((part, index) => (
      <React.Fragment key={index}>
        {part}
        <br />
      </React.Fragment>
    ));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(message.content); // Reset edit content
  };

  const handleSaveEdit = async () => {
    try {
      if (onEdit) {
        await axios.put(`http://localhost:5000/api/messages/edit/${message.id}`, { newContent: editContent });
        onEdit(message.id, editContent); // Notify parent component
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing message:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  return (
    <div
      className="chat-message"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="chat-message-avatar" onClick={handleAvatarClick}>
        <img src="https://via.placeholder.com/40" alt={message.user} />
      </div>
      <div className="chat-message-text">
        <div className="chat-message-author-time">
          <span className="chat-message-author">{message.user}</span>
          <span className="chat-message-time">{formatDate(message.createdAt)}</span>
        </div>
        {isEditing ? (
          <div className="chat-message-edit">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <>
            <p>{formatMessageContent(message.content)}</p>
            {reactions[message.id] && (
              <div className="chat-reaction-display">
                <img
                  src={reactions[message.id].src}
                  alt={reactions[message.id].alt}
                  className="chat-emoji"
                />
              </div>
            )}
          </>
        )}
      </div>
      {isHovered && (
        <EmojiReactions
          onReact={handleReaction}
          onReply={() => {}}
          messageId={message.id}
          messageContent={message.content}
          onEdit={onEdit} // Pass the edit handler
        />
      )}
    </div>
  );
};

export default ChatMessage;
