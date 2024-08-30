import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, toZonedTime } from 'date-fns-tz';
import EmojiReactions from "../../../../../components/ReactionEmojies/ReactionEmojies";
import "./ChatMessage.css";

const ChatMessage = ({
  message,
  handleAvatarClick,
  isHovered,
  onHover,
  onEdit,
}) => {
  const [reactions, setReactions] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message?.content || '');

  useEffect(() => {
  }, [message]);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const timeZone = 'Asia/Kathmandu';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'hh:mm a', { timeZone });
  };

  // Function to handle reactions
  const handleReaction = (emoji) => {
    setReactions((prev) => {
      if (prev[message._id] && prev[message._id].src === emoji.src) {
        const updatedReactions = { ...prev };
        delete updatedReactions[message._id];
        return updatedReactions;
      } else {
        return {
          ...prev,
          [message._id]: emoji
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
    setEditContent(message.content || '');
  };

  const handleSaveEdit = async () => {
    try {
      if (onEdit && message._id) {
        await axios.put(`http://localhost:5000/api/messages/edit/${message._id}`, { newContent: editContent });
        onEdit(message._id, editContent);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  // Function to show only the part before '@'
  const sliceEmail = (email) => {
    return email ? email.split('@')[0] : 'Unknown User';
  };

  if (!message) {
    return null; // or some placeholder component
  }

  return (
    <div
      className="chat-message"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="chat-message-avatar" onClick={handleAvatarClick}>
        <img 
          src={message.sender?.avatar || "https://via.placeholder.com/40"} 
          alt={message.sender?.email || "Unknown User"} 
        />
      </div>
      <div className="chat-message-text">
        <div className="chat-message-author-time">
          <span className="chat-message-author">
            {sliceEmail(message.sender?.email)}
          </span>
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
            {reactions[message._id] && (
              <div className="chat-reaction-display">
                <img
                  src={reactions[message._id].src}
                  alt={reactions[message._id].alt}
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
          messageId={message._id}
          messageContent={message.content}
          onEdit={handleEditClick}
        />
      )}
    </div>
  );
};

export default ChatMessage;