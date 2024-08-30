import React, { useState } from 'react';
import './NewMessagePopup.css'; // Add CSS styles for the popup

const NewMessagePopup = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Handle the send action here
    console.log('Sending message to:', recipient);
    console.log('Message:', message);
    // Clear fields and close popup after sending
    setRecipient('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="new-message-popup">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>X</button>
        <h2>New Message</h2>
        <div className="popup-field">
          <label htmlFor="recipient">To:</label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient's name"
          />
        </div>
        <div className="popup-field">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
          />
        </div>
        <button className="popup-send" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default NewMessagePopup;
