import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, toZonedTime } from "date-fns-tz";
import EmojiReactions from "../../../../../components/ReactionEmojies/ReactionEmojies";
import "./ChatMessage.css";

const authAxios = axios.create({
  baseURL: 'http://localhost:5000/api/users',
  headers: {
    'Content-Type': 'application/json',
  }
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getEmailPrefix = (email) => {
  return email ? email.split('@')[0] : "Unknown User";
};

const ChatMessage = ({
  message,
  handleAvatarClick,
  isHovered,
  onHover,
  onEdit,
  isCurrentUser,
  isSelfMessage,
  userEmail,
  setSelectedUserProfile,
  setselectedChat,
}) => {
  const [reactions, setReactions] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [senderProfile, setSenderProfile] = useState({
    fullName: 'User',
    profilePicture: null,
    email: userEmail || ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!message.sender || !message.sender._id) return;

      try {
        const response = await authAxios.get(`/users/${message.sender._id}`);
        const userData = response.data;
        setSenderProfile({
          fullName: userData.fullName || getEmailPrefix(userEmail) || 'User',
          profilePicture: userData.profilePicture || null,
          email: userData.email || userEmail
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [message.sender?._id, userEmail]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty dateString

    const timeZone = "Asia/Kathmandu";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Handle invalid date
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "hh:mm a", { timeZone });
  };

  const handleReaction = (emoji) => {
    setReactions((prev) => {
      if (prev[message.id] && prev[message.id].src === emoji.src) {
        const updatedReactions = { ...prev };
        delete updatedReactions[message.id];
        return updatedReactions;
      } else {
        return {
          ...prev,
          [message.id]: emoji,
        };
      }
    });
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
        await axios.put(
          `http://localhost:5000/api/messages/edit/${message.id}`,
          { newContent: editContent }
        );
        onEdit(message.id, editContent); // Notify parent component
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const renderProfilePicture = () => {
    if (senderProfile.profilePicture) {
      return <img src={`http://localhost:5000${senderProfile.profilePicture}`} alt="Profile" />;
    } else {
      const emailInitial = getEmailPrefix(senderProfile.email).charAt(0).toUpperCase();
      return (
        <div className="profile-initial">
          {emailInitial}
        </div>
      );
    }
  };

  if (!message) {
    return null; // or some placeholder component
  }

  const renderContent = () => {
    // Properly handle emojis and content injection
    const content = message.content.replace(/(<img\s+[^>]*class=")(emoji)([^>]*>)/gi, '$1chat-emoji $2$3');

    return { __html: content };
  };
 
  return (
    <div
      className={`chat-message ${
        isCurrentUser ? "chat-message-sent" : "chat-message-received"
      } ${isSelfMessage ? "self-message" : ""}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="chat-message-avatar" onClick={() => handleAvatarClick(senderProfile)}>
        {renderProfilePicture()}
      </div>
      <div className="chat-message-text">
        <div className="chat-message-author-time">
          <span className="chat-message-author">
            {senderProfile.fullName}
          </span>
          <span className="chat-message-time">{formatDate(message.createdAt)}</span>
        </div>

        {isSelfMessage && (
          <span className="self-message-indicator">Note to self</span>
        )}

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
          <p dangerouslySetInnerHTML={renderContent()} />
        )}

        {reactions[message.id] && (
          <div className="chat-reaction-display">
            <img
              src={reactions[message.id].src}
              alt={reactions[message.id].alt}
              className="chat-emoji"
            />
          </div>
        )}
      </div>
      {isHovered && (
        <EmojiReactions
          onReact={handleReaction}
          onReply={() => {}}
          messageId={message.id}
          messageContent={message.content}
          onEdit={handleEditClick}
        />
      )}
    </div>
  );
};

export default ChatMessage;
