import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import MessageInputToolbar from './MessageToolbar';
import '../../Styles/MessageInput/MessageInput.css';
import debounce from 'lodash/debounce';

// Initialize socket connection
const socket = io('http://localhost:5000'); // Adjust the URL as needed

const MessageInput = ({ channelId, userId, editMessageId, editMessageContent, onCancelEdit, onSaveEdit, setMessages }) => {
  const [message, setMessage] = useState(editMessageContent || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const senderId = localStorage.getItem('userId');

  useEffect(() => {
    setMessage(editMessageContent || '');
  }, [editMessageContent]);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!channelId) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/drafts/${channelId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setMessage(response.data.content || '');
      } catch (error) {
        console.error('Error fetching draft:', error);
      }
    };

    fetchDraft();
  }, [channelId]);

  const saveDraft = async () => {
    if (!message.trim() || !channelId) return;

    try {
      const draftData = {
        content: message,
        channelId,
      };

      await axios.post('http://localhost:5000/api/drafts/drafts', draftData, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    const messageData = {
      content: message,
      senderId: senderId,
      tempId: Date.now(), // Temporary ID for immediate update
    };
  
    let endpoint = ''; // Determine the correct endpoint
    if (channelId) {
      messageData.channelId = channelId;
      endpoint = 'http://localhost:5000/api/channel-message/send'; // Adjust this URL based on your backend route
    } else {
      messageData.receiverId = userId;
      endpoint = 'http://localhost:5000/api/direct-message/send';
    }
  
    try {
      setIsLoading(true);
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, createdAt: new Date().toISOString() },
      ]);
  
      const response = await axios.post(endpoint, messageData, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
  
      socket.emit(channelId ? 'sendMessage' : 'sendDirectMessage', response.data.messageData);
  
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === messageData.tempId ? { ...response.data.messageData } : msg
        )
      );
  
      setMessage('');
      setError('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.tempId !== messageData.tempId));
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const debouncedSaveDraft = useCallback(debounce(saveDraft, 300), [message, channelId]);

  useEffect(() => {
    debouncedSaveDraft();
  }, [message, debouncedSaveDraft]);

  const debouncedSendMessage = useCallback(debounce(sendMessage, 300), [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isShiftPressed) {
        return;
      } else {
        e.preventDefault();
        debouncedSendMessage();
      }
    }
  };

  const handleKeyDownGlobal = (e) => {
    if (e.key === 'Shift') {
      setIsShiftPressed(true);
    }
  };

  const handleKeyUpGlobal = (e) => {
    if (e.key === 'Shift') {
      setIsShiftPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownGlobal);
    window.addEventListener('keyup', handleKeyUpGlobal);

    return () => {
      window.removeEventListener('keydown', handleKeyDownGlobal);
      window.removeEventListener('keyup', handleKeyUpGlobal);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // For Chrome
      saveDraft(); // Save draft when the user tries to leave the page
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveDraft(); // Save draft when the component unmounts
    };
  }, [message]);

  const handleEmojiSelect = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage(prevMessage => prevMessage + emojiObject.emoji);
    }
  };
  

  useEffect(() => {
    const handleReceiveDirectMessage = (message) => {
      if (message.receiverId === userId || message.senderId === userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on('receiveDirectMessage', handleReceiveDirectMessage);

    return () => {
      socket.off('receiveDirectMessage', handleReceiveDirectMessage);
    };
  }, [userId]);

  return (  
    <div className="message-input-container">
      <div className="message-input-wrapper">
        {editMessageId ? (
          <div className="edit-container">
            <textarea
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Edit your message..."
              disabled={isLoading}
            />
            <div className="edit-buttons">
              <button onClick={() => onCancelEdit()} disabled={isLoading}>Cancel</button>
              <button onClick={() => onSaveEdit(message)} disabled={isLoading}>Save</button>
            </div>
          </div>
        ) : (
          <textarea
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      <MessageInputToolbar
        handleSend={debouncedSendMessage}
        message={message}
        handleEmojiSelect={handleEmojiSelect}
        isEditing={!!editMessageId}
      />
    </div>
  );
};

export default MessageInput;