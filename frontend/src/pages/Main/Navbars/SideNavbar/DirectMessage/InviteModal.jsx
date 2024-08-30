import React, { useState } from 'react';
import './InviteModal.css'; // Ensure this file is created for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMagic, faPaperclip } from '@fortawesome/free-solid-svg-icons';

const InviteModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');

  if (!isOpen) return null;

  const handleSend = () => {
    // Add your send invitation logic here
    console.log('Sending invitation to:', email, 'as', role);
    onClose(); // Close the modal after sending the invitation
  };

  return (
    <div className="invite-modal-overlay">
      <div className="invite-modal">
        <div className="invite-modal-header">
          <h2>Invite people to your Workspace</h2>
          <button className="invite-modal-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="invite-modal-body">
          <label htmlFor="email">To:</label>
          <textarea
            id="email"
            value={email}
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="role">Invite as:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Guest">Guest</option>
          </select>
          <div className="button-group">
            <button className="copy-invite-link-button">
              <FontAwesomeIcon icon={faPaperclip} /> Copy invite link
            </button>
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
