import React, { useState, useRef } from 'react';
import '../../Styles/ReactionEmojies/ReactionEmojies.css';
import DeleteConfirmationModal from './DeleteModal'; // Import the modal component

const emojis = [
  { src: './images/Emojies/tick.png', alt: 'Green Tick', type: 'react', name: 'Green Tick' },
  { src: './images/Emojies/eyes.png', alt: 'Side Eye', type: 'react', name: 'Side Eye' },
  { src: './images/Emojies/hands.png', alt: 'Hands Up', type: 'react', name: 'Hands Up' },
  { src: './images/Emojies/emojies.png', alt: 'Emoji Package', type: 'action', name: 'reaction' },
  { src: './images/Emojies/comment.png', alt: 'Connect', type: 'action', name: 'Connect' },
  { src: './images/Emojies/share.png', alt: 'Share', type: 'action', name: 'reply as thread' },
  { src: './images/Emojies/save.png', alt: 'Save', type: 'action', name: 'Save' },
  { src: './images/Emojies/more.png', alt: 'More', type: 'more', name: 'More' },
];

const EmojiReactions = ({ onReact, onEdit, messageId, messageContent }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const emojiReactionsRef = useRef(null);

  const handleClick = (emoji) => {
    if (emoji.type === 'react') {
      if (onReact) {
        onReact(emoji);
      }
    } else if (emoji.type === 'more') {
      setShowDropdown(prev => !prev);
    } else {
      console.log(`Perform action for ${emoji.alt}`);
    }
  };

  const handleDropdownAction = (action) => {
    if (action === 'Edit message' && onEdit) {
      onEdit(messageId, messageContent);
    } else if (action === 'Delete') {
      setShowModal(true); // Show the modal for confirmation
    }
    console.log(`Selected action: ${action}`);
    setShowDropdown(false); // Close dropdown after action
  };

  const handleConfirmDelete = () => {
    // Handle delete confirmation logic here
    console.log('Message deleted');
    setShowModal(false); // Close the modal
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="emoji-reactions-wrapper" ref={emojiReactionsRef}>
      <div className="emoji-reactions">
        {emojis.map((emoji, index) => (
          <div className="emoji-wrapper" key={index}>
            <img
              src={emoji.src}
              alt={emoji.alt}
              className={`emoji ${emoji.type}`}
              onClick={() => handleClick(emoji)}
            />
            {emoji.type === 'action' && (
              <span className="emoji-name">{emoji.name}</span>
            )}
            {emoji.type === 'more' && showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleDropdownAction('Copy text')}>Copy text</li>
                  <li onClick={() => handleDropdownAction('Reply')}>Reply</li>
                  <li onClick={() => handleDropdownAction('Edit message')}>Edit message</li>
                  <li onClick={() => handleDropdownAction('Mentions')}>Mentions</li>
                  <li onClick={() => handleDropdownAction('Copy Message Link')}>Copy Message Link</li>
                  <li onClick={() => handleDropdownAction('Report')}>Report</li>
                  <li onClick={() => handleDropdownAction('Delete')}>Delete</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <DeleteConfirmationModal
        isVisible={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default EmojiReactions;
