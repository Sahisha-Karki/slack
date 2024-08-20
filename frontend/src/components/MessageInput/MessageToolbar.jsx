import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faVideo,
  faFont,
  faBold,
  faItalic,
  faListUl,
  faAt,
  faLink,
  faCode,
  faPaperPlane,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faListOl,
} from '@fortawesome/free-solid-svg-icons';
import '../../Styles/MessageInput/MessageInput.css';
import Tooltip from '@mui/material/Tooltip';
import AddFile from './Icons/AddFile';
import AddImage from './Icons/AddImage';
import EmojiPickerComponent from './Icons/EmojiPicker';

const MessageInputToolbar = ({ 
  handleEmojiSelect, 
  handleLinkInsert, 
  handleSend, 
  message = '', // Default to empty string if not provided
  isLoading
}) => {
  return (
    <div className="toolbar-icons">
      <div className="icon-section first-icon-section">
        <AddFile />
        <AddImage />
        <button title="Record Audio" aria-label="Record Audio">
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button title="Start Video Call" aria-label="Start Video Call">
          <FontAwesomeIcon icon={faVideo} />
        </button>
        <EmojiPickerComponent onSelect={handleEmojiSelect} />
      </div>

      <div className="icon-section second-icon-section">
        <button title="Change Font" aria-label="Change Font" disabled>
          <FontAwesomeIcon icon={faFont} />
        </button>
        <button title="Bold" aria-label="Bold" disabled>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button title="Italic" aria-label="Italic" disabled>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button title="Bullet Points" aria-label="Bullet Points" disabled>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button title="Numbered List" aria-label="Numbered List" disabled>
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>

      <div className="icon-section third-icon-section">
        <button title="Align Left" aria-label="Align Left" disabled>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button title="Align Center" aria-label="Align Center" disabled>
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button title="Align Right" aria-label="Align Right" disabled>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button title="Mention" aria-label="Mention" disabled>
          <FontAwesomeIcon icon={faAt} />
        </button>
        <button title="Insert Link" onClick={handleLinkInsert} aria-label="Insert Link">
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button title="Code" aria-label="Code" disabled>
          <FontAwesomeIcon icon={faCode} />
        </button>
      </div>

      <div className="icon-section forth-icon-section">
      <Tooltip title="Send Message" arrow>
  <button
    className="send-button"
    onClick={handleSend}
    disabled={isLoading || !message.trim()}
    aria-label="Send Message"
  >
    <FontAwesomeIcon icon={faPaperPlane} />
  </button>
</Tooltip>

      </div>
    </div>
  );
};

export default MessageInputToolbar;
