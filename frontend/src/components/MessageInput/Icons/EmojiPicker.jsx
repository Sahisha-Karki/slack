import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react'; 
import '../../../Styles/MessageInput/Icon/EmojiPicker.css'; 

const EmojiPickerComponent = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleEmojiSelect = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      onSelect(emojiObject);
      setShowPicker(false);
    } else {
      console.error('Emoji object or emoji property is undefined:', emojiObject);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="emoji-picker-container">
      <button
        title="Emojis"
        onClick={() => setShowPicker(!showPicker)}
        className="emoji-button"
      >
        <FontAwesomeIcon icon={faSmile} />
      </button>
      {showPicker && (
        <div className="emoji-picker" ref={pickerRef}>
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
