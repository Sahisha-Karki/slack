import React, { useState, useCallback } from 'react';
import axios from 'axios';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import ChatContent from './Chat/ChatContent/ChatContent';
import MessageInput from '../../../components/MessageInput/MessageInput';
import GeneralModal from '../ChattingArea/Chat/ChatHeader/ChannelDropdownModal/GeneralModal';
import Notes from './Chat/ChatHeader/CanvasModal/Notes';  
import DirectMessageModal from './Chat/ChatHeader/DirectMessageModal/DirectMessageModal'; 
import useSocket from '../../../hooks/useSocket';
import useMessages from '../../../hooks/useMessages';
import './MainChat.css';
import socket from '../../../socket';

const MainChat = ({ channel, userId, userEmail, receiverId }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);
  const [isDirectMessageModalOpen, setIsDirectMessageModalOpen] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [currentKey, setCurrentKey] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState('');

  const token = localStorage.getItem('token');
  const { messages, noMessages, setMessages } = useMessages(channel, userId, receiverId);

  useSocket(channel, userId, setMessages);

  const handleSendMessage = useCallback((messageContent) => {
    const isSelfMessage = !channel && userId === receiverId;
    const messageData = channel
      ? { channelId: channel._id, content: messageContent, senderId: userId }
      : { receiverId, content: messageContent, senderId: userId };

    if (isSelfMessage) {
      handleSelfMessage(messageContent);
    } else if (channel) {
      socket.emit('sendMessage', messageData);
    } else {
      socket.emit('sendDirectMessage', messageData);
      axios.post('http://localhost:5000/api/direct-message/send', messageData, {
        headers: { 'Authorization': `Bearer ${token}` },
      }).catch(error => console.error('Error sending direct message:', error));
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, createdAt: new Date().toISOString() },
    ]);

    setDrafts((prevDrafts) => ({
      ...prevDrafts,
      [currentKey]: ''
    }));
  }, [channel, userId, receiverId, currentKey, token, setMessages]);

  const handleSelfMessage = (messageContent) => {
    const selfMessage = {
      _id: Date.now(),
      sender: userId,
      receiver: userId,
      content: messageContent,
      createdAt: new Date().toISOString(),
      isSelfMessage: true
    };

    setMessages((prevMessages) => [...prevMessages, selfMessage]);

    axios.post('http://localhost:5000/api/self-messages/send', selfMessage, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).catch(error => console.error('Error saving self-message:', error));
  };

  const handleEditMessage = (messageId, messageContent) => {
    setEditMessageId(messageId);
    setEditMessageContent(messageContent);
  };

  const handleCancelEdit = () => {
    setEditMessageId(null);
    setEditMessageContent('');
  };

  const handleSaveEdit = (updatedContent) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === editMessageId ? { ...msg, content: updatedContent } : msg
      )
    );
    handleCancelEdit();
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setIsProfileVisible((prev) => {
      if (!prev) setIsNotesVisible(false);
      return !prev;
    });
  };

  const handleCloseProfile = () => setIsProfileVisible(false);

  const handleDropdownClick = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleDirectMessageModalClick = () => setIsDirectMessageModalOpen(true);

  const handleCloseDirectMessageModal = () => setIsDirectMessageModalOpen(false);

  const handleHover = (messageId, isHovered) => setHoveredMessageId(isHovered ? messageId : null);

  const handleCloseNotes = () => setIsNotesVisible(false);

  const handleNotesClick = () => {
    setIsNotesVisible((prev) => {
      if (!prev) setIsProfileVisible(false);
      return !prev;
    });
  };

  if (!channel && !userId) return null;

  return (
    <div className={`main-chat-container ${isProfileVisible ? 'profile-active' : ''} ${isNotesVisible ? 'notes-active' : ''}`}>
      <ChatHeader
        channelName={channel ? channel.name : 'Direct Message'}
        onDropdownClick={handleDropdownClick}
        channelType={channel ? channel.visibility : 'private'}
        userId={userId}
        userEmail={userEmail}
        onCanvasClick={handleNotesClick}
        onDirectMessageModalClick={handleDirectMessageModalClick}
      />
      <div className="chat-content">
        <ChatContent
          messages={messages}
          showProfile={isProfileVisible}
          handleAvatarClick={handleAvatarClick}
          handleCloseProfile={handleCloseProfile}
          hoveredMessageId={hoveredMessageId}
          onHover={handleHover}
          noMessages={noMessages}
          onEditMessage={handleEditMessage}
          userEmail={userEmail}
        />
      </div>
      <div className="message-input-wrapper">
        <MessageInput
          channelId={channel?._id}
          userId={userId}
          onSendMessage={handleSendMessage}
          editMessageId={editMessageId}
          editMessageContent={editMessageContent}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
        />
      </div>
      <GeneralModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        channelName={channel ? channel.name : ''}
        channelType={channel ? channel.visibility : 'private'}
      />
      <DirectMessageModal
        isOpen={isDirectMessageModalOpen}
        onClose={handleCloseDirectMessageModal}
        userEmail={userEmail}
      />
      {isNotesVisible && <Notes onClose={handleCloseNotes} />}
    </div>
  );
};


export default MainChat;
