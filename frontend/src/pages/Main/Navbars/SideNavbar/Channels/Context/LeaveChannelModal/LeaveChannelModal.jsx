import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import './LeaveChannelModal.css'; // Create CSS for styling the modal

const LeaveChannelModal = ({ channelName, channelType, isOpen, onClose, onLeave }) => {
  if (!isOpen) return null;

  const getChannelTypeIcon = (type) => {
    switch (type) {
      case 'private':
        return <FontAwesomeIcon icon={faLock} />;
      case 'public':
        return <FontAwesomeIcon icon={faHashtag} />;
      default:
        return null;
    }
  };

  return (
    <div className="leave-channel-modal">
      <div className="leave-channel-modal-content">
        <button className="leave-channel-close-button" onClick={onClose}>✖</button>
        <h3>
          Leave {getChannelTypeIcon(channelType)} {channelName}
        </h3>
        <p>
          When you leave the channel, you’ll no longer be able to see any of its messages. 
          To rejoin this channel later, you’ll need to be invited.
        </p>
        <div className="modal-buttons">
          <button onClick={onClose} className='cancel-leave-channel-btn'>Cancel</button>
          <button onClick={onLeave} className='leave-channel-btn'>Leave Channel</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveChannelModal;
