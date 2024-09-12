import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import io from 'socket.io-client';
import MessageInputToolbar from './MessageToolbar';
import '../../Styles/MessageInput/MessageInput.css';
import debounce from 'lodash/debounce';
import AddImage from './Icons/AddImage';
import AddLinkModal from './Icons/AddLinkModal';
import MentionDropdown from './Icons/MentionDropdown';
import EmojiUploadModal from './Icons/EmojiuploadModal'; // Import the EmojiUploadModal component

const socket = io('http://localhost:5000');

const MessageInput = ({ 
  channelId, 
  userId, 
  receiverId, 
  editMessageId, 
  editMessageContent, 
  onCancelEdit, 
  onSaveEdit, 
  setMessages 
}) => {
  const [message, setMessage] = useState(editMessageContent || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const contentEditableRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mentionDropdownVisible, setMentionDropdownVisible] = useState(false);
  const [mentionData, setMentionData] = useState([]);
  const [mentionSearch, setMentionSearch] = useState('');
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const openEmojiModal = () => setIsEmojiModalOpen(true);
  const closeEmojiModal = () => setIsEmojiModalOpen(false);
  const senderId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMentionData = async () => {
      const workspaceId = localStorage.getItem('workspaceId');
      try {
        const response = await axios.get(`http://localhost:5000/api/workspaces/${workspaceId}/members`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const members = response.data.members;
        if (Array.isArray(members)) {
          setMentionData(members);
        } else {
          console.error('Fetched mention data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching mention data:', error);
      }
    };
    fetchMentionData();
  }, []);

  useEffect(() => {
    if (audioBlob && contentEditableRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = document.createElement('audio');
      audioElement.controls = true;
      audioElement.src = audioUrl;
      contentEditableRef.current.appendChild(audioElement);
      setMessage(contentEditableRef.current.innerHTML);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (editMessageContent) {
      setMessage(editMessageContent);
    } else if (channelId) {
      const fetchDraft = async () => {
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
    }
  }, [editMessageContent, channelId]);

  const saveDraft = async () => {
    if (!message.trim() || !channelId) return;
    try {
      const draftData = { content: message, channelId };
      await axios.post('http://localhost:5000/api/drafts/drafts', draftData, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
      });
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const debouncedSaveDraft = useCallback(debounce(saveDraft, 300), [message, channelId]);

  useEffect(() => {
    debouncedSaveDraft();
  }, [message, debouncedSaveDraft]);

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    const messageData = {
      content: message,
      senderId: senderId,
      tempId: Date.now(),
      channelId,
      receiverId: !channelId ? userId : undefined,
      audio: audioBlob ? URL.createObjectURL(audioBlob) : undefined,
      video: videoBlob ? URL.createObjectURL(videoBlob) : undefined,
      image: selectedImage
    };

    let endpoint = '';
    if (channelId) {
      messageData.channelId = channelId;
      endpoint = 'http://localhost:5000/api/channel-message/send';
    } else {
      messageData.receiverId = userId;
      endpoint = 'http://localhost:5000/api/direct-message/send';
    }

    try {
      setIsLoading(true);
      if (!channelId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...messageData, createdAt: new Date().toISOString(), sent: false },
        ]);
      }

      const response = await axios.post(endpoint, messageData, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      socket.emit(channelId ? 'sendMessage' : 'sendDirectMessage', response.data.messageData);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === messageData.tempId
            ? { ...response.data.messageData, sent: true }
            : msg
        )
      );

      setMessage('');
      if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = '';
      }
      setError('');

    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');

      setMessages((prevMessages) => prevMessages.filter((msg) => msg.tempId !== messageData.tempId));
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSendMessage = useCallback(debounce(sendMessage, 300), [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isShiftPressed) {
        debouncedSendMessage();
      } else {
        const contentEditable = contentEditableRef.current;
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        if (contentEditable && selection) {
          const parentNode = range.startContainer.parentNode;
          if (parentNode.tagName === 'LI') {
            const newListItem = document.createElement('li');
            newListItem.innerHTML = '<br>';
            parentNode.parentNode.insertBefore(newListItem, parentNode.nextSibling);
            range.setStart(newListItem, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          } else {
            const br = document.createElement('br');
            range.insertNode(br);
            range.setStartAfter(br);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
    };

    const handleKeyUpGlobal = (e) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
    };

    window.addEventListener('keydown', handleKeyDownGlobal);
    window.addEventListener('keyup', handleKeyUpGlobal);

    return () => {
      window.removeEventListener('keydown', handleKeyDownGlobal);
      window.removeEventListener('keyup', handleKeyUpGlobal);
    };
  }, []);

  const handleInputChange = () => {
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerHTML;
      const atIndex = text.lastIndexOf('@');
      if (atIndex !== -1) {
        const query = text.slice(atIndex + 1).replace(/<\/?[^>]+(>|$)/g, "").trim();
        setMentionSearch(query);
        setMentionDropdownVisible(true);
      } else {
        setMentionDropdownVisible(false);
      }
      setMessage(text);
    }
  };

  const handleMentionSelect = (user) => {
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerHTML;
      const atIndex = text.lastIndexOf('@');
      const updatedText = text.slice(0, atIndex) + `@${user.name} `;
      contentEditableRef.current.innerHTML = updatedText;
      setMessage(updatedText);
      setMentionDropdownVisible(false);
    }
  };

  const applyFormatting = (command) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
  
    const range = selection.getRangeAt(0);
    const contentEditable = contentEditableRef.current;
  
    if (command === 'code') {
      const existingCodeBlock = contentEditable.querySelector('pre');
      if (existingCodeBlock) {
        const parent = existingCodeBlock.parentNode;
        const nodes = Array.from(existingCodeBlock.childNodes);
        nodes.forEach(node => parent.insertBefore(node, existingCodeBlock));
        parent.removeChild(existingCodeBlock);
      } else {
        const codeBlock = document.createElement('pre');
        const code = document.createElement('code');
        codeBlock.appendChild(code);
        range.surroundContents(codeBlock);
        range.setStartAfter(codeBlock);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      document.execCommand(command, false, null);
    }
  
    setMessage(contentEditable.innerHTML);
  };

  const removeImagePreview = () => {
    setSelectedImage(null);
  };

  const handleImageSelect = (imageUrl) => {
    if (contentEditableRef.current) {
      setSelectedImage(imageUrl);
    }
  };

  const formatUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      saveDraft();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveDraft();
    };
  }, [message]);

  const handleEmojiSelect = (emoji) => {
    if (emoji?.imageUrl && contentEditableRef.current) {
      const imgElement = document.createElement('img');
      imgElement.src = emoji.imageUrl;
      imgElement.alt = emoji.name;
      imgElement.classList.add('emoji');
      contentEditableRef.current.appendChild(imgElement);
      setMessage(contentEditableRef.current.innerHTML);
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
  }, [userId, setMessages]);

  const handleLinkInsert = () => {
    setLinkModalOpen(true);
  };

  const handleSaveLink = (title, url) => {
    if (contentEditableRef.current) {
      const formattedUrl = formatUrl(url);
      const link = document.createElement('a');
      link.href = formattedUrl;
      link.textContent = title;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      contentEditableRef.current.appendChild(link);
      setMessage(contentEditableRef.current.innerHTML);
    }
    setLinkModalOpen(false);
  };

  const handleCloseLinkModal = () => {
    setLinkModalOpen(false);
  };

  const isEmpty = !message.trim();

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <div
          ref={contentEditableRef}
          contentEditable="true"
          className="message-input"
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
          dir="ltr"
        >
          {selectedImage && (
            <div className="image-preview-container">
              <img
                src={selectedImage}
                alt="Selected"
                className="image-preview"
              />
              {/* <button className="close-preview-button" onClick={removeImagePreview}>
                <FontAwesomeIcon icon={faTimes} />
              </button> */}
            </div>
          )}
        </div>
        {mentionDropdownVisible && (
          <MentionDropdown
            visible={mentionDropdownVisible}
            data={Array.isArray(mentionData) ? mentionData.filter(user => user.name.toLowerCase().includes(mentionSearch.toLowerCase())) : []}
            onSelect={handleMentionSelect}
          />
        )}
        {isEmpty && <div className="placeholder">Type your message...</div>}
      </div>
      {error && <div className="error-message">{error}</div>}
      <MessageInputToolbar
        handleLinkInsert={handleLinkInsert}
        handleSend={debouncedSendMessage}
        message={message}
        handleEmojiSelect={handleEmojiSelect} // Correctly pass the emoji selection handler
        isEditing={!!editMessageId}
        applyFormatting={applyFormatting}
        handleImageSelect={handleImageSelect}
        setAudioBlob={setAudioBlob}
        setVideoBlob={setVideoBlob}
      />
      <AddImage onImageSelect={handleImageSelect} />
      <AddLinkModal 
        isOpen={isLinkModalOpen}
        onClose={handleCloseLinkModal}
        onSave={handleSaveLink}
      />
     <EmojiUploadModal
        isOpen={isEmojiModalOpen}
        onClose={closeEmojiModal}
        onEmojiUpload={handleEmojiSelect} // Handle emoji upload here
      />
    </div>
  );
};

export default MessageInput;
