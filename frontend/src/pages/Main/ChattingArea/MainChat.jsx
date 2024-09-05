import React, { useState, useCallback, useEffect } from 'react';
import socket from '../../../socket';
import ChatHeader from './Chat/ChatHeader/ChatHeader';
import ChatContent from './Chat/ChatContent/ChatContent';
import MessageInput from '../../../components/MessageInput/MessageInput';
import GeneralModal from '../ChattingArea/Chat/ChatHeader/ChannelDropdownModal/GeneralModal';
import Notes from './Chat/ChatHeader/CanvasModal/Notes';  
import DirectMessageModal from './Chat/ChatHeader/DirectMessageModal/DirectMessageModal'; // Import DirectMessageModal
import axios from 'axios';
import './MainChat.css';

const MainChat = ({ channel, userId, userEmail, receiverId, showProfile }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);  // State for Notes
  const [isDirectMessageModalOpen, setIsDirectMessageModalOpen] = useState(false); // State for DirectMessageModal
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput,setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [noMessages, setNoMessages] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState('');

  // State to manage unsent messages for each channel or user
  const [drafts, setDrafts] = useState({});
  const [currentKey, setCurrentKey] = useState(null);
  useEffect(() => {
    socket.on("receiveDirectMessage", (data) => {
      console.log("Received direct message data:", data); // Debugging line
      
      // Ensure the message is for the current user or is a self-message
      if (data.receiverId === userId || data.senderId === userId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            _id: data._id, // Ensure this is included
            content: data.content,
            sender: data.senderId,
            receiver: data.receiverId,
            createdAt: data.createdAt || new Date().toISOString(), // Ensure timestamp is set
          },
        ]);
      } else {
        console.error("Received direct message not intended for this user:", data);
      }
    });
  
    return () => {
      socket.off("receiveDirectMessage");
    };
  }, [userId]);
  

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No authentication token found.');
  
      setLoading(true);
  
      try {
        let response;
        if (channel?._id) {
          response = await axios.get(`http://localhost:5000/api/channel-message/channel/${channel._id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
        } else if (userId) {
          response = await axios.get(`http://localhost:5000/api/direct-message/messages/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
        }
        const fetchedMessages = response.data.messages || [];
        console.log('Fetched messages:', fetchedMessages); // Add this line

        setMessages(fetchedMessages);
        setNoMessages(fetchedMessages.length === 0);
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
      if (message.channelId === channel?._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
  
    const handleReceiveDirectMessage = (message) => {
      if (message.receiver === userId || message.sender === userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
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
      // socket.off('receiveDirectMessage', handleReceiveDirectMessage);
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
    console.log("Current User ID:", userId);
    console.log("Receiver ID:", receiverId);
    console.log("Message Content:", messageContent);
    const token = localStorage.getItem('token');
  
    const isSelfMessage = !channel && userId === receiverId;
    const messageData = channel
      ? { channelId: channel._id, content: messageContent, senderId: userId }
      : { receiverId, content: messageContent, senderId: userId };
  
    console.log("Sending message:", messageData);
  
    // Emit the correct event based on the type of message
    if (isSelfMessage) {
      handleSelfMessage(messageContent);
    } else if (channel) {
      socket.emit('sendMessage', messageData);
    } else {
      socket.emit('sendDirectMessage', messageData);
  
      // Post to the backend for direct messages
      axios.post('http://localhost:5000/api/direct-message/send', messageData, {
        headers: { 'Authorization': `Bearer ${token}` },
      }).catch(error => console.error('Error sending direct message:', error));
    }
  
    // Add the message to the UI
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, createdAt: new Date().toISOString() },
    ]);
  
    // Clear draft for the current user/channel
    setDrafts((prevDrafts) => ({
      ...prevDrafts,
      [currentKey]: ''
    }));
  }, [channel, userId, receiverId, currentKey]);
  
  

  const handleEditMessage = (messageId, messageContent) => {
    setEditMessageId(messageId);
    setEditMessageContent(messageContent);
  };

 // Add this new function to handle self-messages
const handleSelfMessage = (messageContent) => {
  const selfMessage = {
    _id: Date.now(), // Generate a temporary ID
    sender: userId,
    receiver: userId,
    content: messageContent,
    createdAt: new Date().toISOString(),
    isSelfMessage: true
  };

  setMessages((prevMessages) => [...prevMessages, selfMessage]);

  // You might want to save this to a local storage or send to a backend endpoint
  // that handles self-messages differently
  axios.post('http://localhost:5000/api/self-messages/send', selfMessage, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  }).catch(error => console.error('Error saving self-message:', error));
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
          drafts={drafts}
          setDrafts={setDrafts}
          setCurrentKey={setCurrentKey}
          messageInput={messageInput}
          setMessages={setMessages}
        />
      </div>
      <GeneralModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        channelName={channel ? channel.name : ''}
        channelType={channel ? channel.visibility : 'private'}
      />

      {isNotesVisible && <Notes onClose={handleCloseNotes} />}
      {isDirectMessageModalOpen && <DirectMessageModal
        isOpen={isDirectMessageModalOpen}
        onClose={handleCloseDirectMessageModal}
        userEmail={userEmail}
      />
      }
    </div>
  );
};

export default MainChat;