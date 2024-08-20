import React, { useState, useCallback, useEffect } from 'react';
import socket from '../../../socket';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import ChatContent from './Chat/ChatContent/ChatContent';
import MessageInput from '../../../components/MessageInput/MessageInput';
import GeneralModal from './Chat/ChatHeader/GeneralModal/GeneralModal';
import Notes from './Chat/ChatHeader/CanvasModal/Notes';  
import DirectMessageModal from './Chat/ChatHeader/DirectMessageModal/DirectMessageModal'; // Import DirectMessageModal
import axios from 'axios';
import './MainChat.css';

const MainChat = ({ channel, userId, showProfile }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);  // State for Notes
  const [isDirectMessageModalOpen, setIsDirectMessageModalOpen] = useState(false); // State for DirectMessageModal
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMessages, setNoMessages] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState('');

  // State to manage unsent messages for each channel or user
  const [drafts, setDrafts] = useState({});
  const [currentKey, setCurrentKey] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No authentication token found.');

      setLoading(true);

      try {
        let response;
        if (channel?._id) {
          response = await axios.get(`http://localhost:5000/api/messages/channel/${channel._id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
        } else if (userId) {
          if (userId === 'self') {
            response = await axios.get('http://localhost:5000/api/directMessages/sender', {
              headers: { 'Authorization': `Bearer ${token}` },
            });
          } else {
            response = await axios.get(`http://localhost:5000/api/directMessages/receiver/${userId}`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });
          }
        }
        const fetchedMessages = response.data.messages || [];
        setMessages(fetchedMessages);
        setNoMessages(fetchedMessages.length === 0);

        // Set current key for drafts
        const draftKey = channel?._id || userId;
        setCurrentKey(draftKey);
        setEditMessageContent(drafts[draftKey] || '');
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channel, userId]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleReceiveDirectMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleChannelCreated = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    if (userId) {
      socket.emit('joinUser', userId);
    }
    if (channel?._id) {
      socket.emit('joinChannel', channel._id);
    }

    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('receiveDirectMessage', handleReceiveDirectMessage);
    socket.on('channelCreated', handleChannelCreated);

    return () => {
      if (userId) {
        socket.emit('leaveUser', userId);
      }
      if (channel?._id) {
        socket.emit('leaveChannel', channel._id);
      }
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('receiveDirectMessage', handleReceiveDirectMessage);
      socket.off('channelCreated', handleChannelCreated);
    };
  }, [channel, userId]);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    // Toggle profile visibility and close notes if open
    setIsProfileVisible((prev) => {
      if (!prev) {
        setIsNotesVisible(false);  // Close notes if profile is opened
      }
      return !prev;
    });
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
  };

  const handleDropdownClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDirectMessageModalClick = () => {
    setIsDirectMessageModalOpen(true);
  };

  const handleCloseDirectMessageModal = () => {
    setIsDirectMessageModalOpen(false);
  };

  const handleHover = (messageId, isHovered) => {
    setHoveredMessageId(isHovered ? messageId : null);
  };
  
  const handleCloseNotes = () => {
    setIsNotesVisible(false);
  };

  const handleSendMessage = useCallback((messageContent) => {
    const token = localStorage.getItem('token');
    const messageData = channel
      ? { channelId: channel._id, content: messageContent }
      : { receiverId: userId, content: messageContent };

    socket.emit('sendMessage', { ...messageData, senderId: userId });

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, senderId: userId, content: messageContent },
    ]);

    if (!channel) {
      axios.post('http://localhost:5000/api/messages/send', messageData, {
        headers: { 'Authorization': `Bearer ${token}` },
      }).catch(error => console.error('Error sending message:', error));
    }

    // Clear draft for the current channel or user
    setDrafts((prevDrafts) => ({
      ...prevDrafts,
      [currentKey]: ''
    }));
  }, [channel, userId, currentKey]);

  const handleEditMessage = (messageId, messageContent) => {
    setEditMessageId(messageId);
    setEditMessageContent(messageContent);
  };

  const handleCancelEdit = () => {
    setEditMessageId(null);
    setEditMessageContent('');
  };

  const handleSaveEdit = (updatedContent) => {
    console.log('Saving edited message:', updatedContent);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === editMessageId ? { ...msg, content: updatedContent } : msg
      )
    );
    handleCancelEdit();
  };

  const handleNotesClick = () => {
    // Toggle notes visibility and close profile if open
    setIsNotesVisible((prev) => {
      if (!prev) {
        setIsProfileVisible(false);  // Close profile if notes is opened
      }
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
        onCanvasClick={handleNotesClick} // Add prop for Notes toggle
        onDirectMessageModalClick={handleDirectMessageModalClick} // Add prop for DirectMessageModal toggle
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
          drafts={drafts}
          setDrafts={setDrafts}
          setCurrentKey={setCurrentKey}
        />
      </div>
      <GeneralModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {isNotesVisible && <Notes onClose={handleCloseNotes} />}
      {isDirectMessageModalOpen && <DirectMessageModal onClose={handleCloseDirectMessageModal} />} {/* Add DirectMessageModal */}
    </div>
  );
};

export default MainChat;
