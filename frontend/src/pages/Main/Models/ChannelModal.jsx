import React from 'react';

const ChannelModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="channel-modal-overlay">
      <div className="channel-modal-content">
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
        <h2>Channel Modal</h2>
        {/* Add content specific to the channel modal here */}
      </div>
    </div>
  );
};

export default ChannelModal;
