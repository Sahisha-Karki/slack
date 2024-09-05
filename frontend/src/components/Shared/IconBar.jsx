import React, { useState } from "react";
import "../../Styles/Shared/IconBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faCode, faUnderline, faListUl, faListOl, faCheckSquare, faHeading, faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FaVideo, FaMusic, FaMinus, FaImage, FaFile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react'; // Import the emoji picker library

const IconBar = ({ onEmojiClick, onInsertContent, onFontOptionClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddClick = () => {
    setShowAddDropdown(prev => !prev);
  };

  const handleFontClick = () => {
    setShowDropdown(prev => !prev);
  };

  const handleAttachmentClick = () => {
    onInsertContent("attachment");
  };

  const handleCheckboxClick = () => {
    onInsertContent("checkbox");
  };

  const handleTableClick = () => {
    onInsertContent("table");
  };

  const handleAddOptionClick = (option) => {
    onInsertContent(option);
    setShowAddDropdown(false);
  };

  const handleFontOptionClick = (option) => {
    onFontOptionClick(option);
    setShowDropdown(false);
  };

  const handleEmojiClick = (emoji) => {
    if (onEmojiClick) {
      onEmojiClick(emoji);
    }
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };

  return (
    <div className="icon-bar">
      <button className="icon-button add-button" onClick={handleAddClick}>
        <img src='./images/canvas/add.png' alt="add" />
      </button>
      <button className="icon-button font-button" onClick={handleFontClick}>
        <img src='./images/canvas/font.png' alt="font" />
      </button>
      <button className="icon-button" onClick={() => setShowEmojiPicker(prev => !prev)}>
        <img src='./images/canvas/emoji.png' alt="emoji" />
      </button>
      <button className="icon-button" onClick={handleAttachmentClick}>
        <img src='./images/canvas/file.png' alt="attachment" />
      </button>
      <button className="icon-button" onClick={handleCheckboxClick}>
        <img src='./images/canvas/checkbox.png' alt="checkbox" />
      </button>
      <button className="icon-button" onClick={handleTableClick}>
        <img src='./images/canvas/table.png' alt="table" />
      </button>

      {/* Add Dropdown Menu */}
      {showAddDropdown && (
        <div className="add-dropdown-section">
          <ul>
            <li onClick={() => handleAddOptionClick("video")}>
              <FaVideo /> Record Video Clip
            </li>
            <li onClick={() => handleAddOptionClick("audio")}>
              <FaMusic /> Record Audio Clip
            </li>
            <li onClick={() => handleAddOptionClick("divider")}>
              <FaMinus /> Divider
            </li>
            <li onClick={() => handleAddOptionClick("image")}>
              <FaImage /> Image
            </li>
            <li onClick={() => handleAddOptionClick("file")}>
              <FaFile /> File
            </li>
          </ul>
        </div>
      )}

      {/* Font Dropdown Menu */}
      {showDropdown && (
        <div className="font-dropdown-section">
          <div className="dropdown-section">
            <ul>
              <li onClick={() => handleFontOptionClick("blockquote")}>
                <FontAwesomeIcon icon={faQuoteLeft} /> Blockquote
              </li>
              <li onClick={() => handleFontOptionClick("code")}>
                <FontAwesomeIcon icon={faCode} /> Code Block
              </li>
            </ul>
          </div>
          <div className="dropdown-section">
            <ul>
              <li onClick={() => handleFontOptionClick("bulletedList")}>
                <FontAwesomeIcon icon={faListUl} /> Bulleted List
              </li>
              <li onClick={() => handleFontOptionClick("orderedList")}>
                <FontAwesomeIcon icon={faListOl} /> Ordered List
              </li>
              <li onClick={() => handleFontOptionClick("checklist")}>
                <FontAwesomeIcon icon={faCheckSquare} /> Checklist
              </li>
            </ul>
          </div>
          <div className="dropdown-section">
            <ul>
              <li onClick={() => handleFontOptionClick("smallHeading")}>
                <FontAwesomeIcon icon={faHeading} /> Small Heading
              </li>
              <li onClick={() => handleFontOptionClick("mediumHeading")}>
                <FontAwesomeIcon icon={faHeading} /> Medium Heading
              </li>
              <li onClick={() => handleFontOptionClick("bigHeading")}>
                <FontAwesomeIcon icon={faHeading} /> Big Heading
              </li>
              <li onClick={() => handleFontOptionClick("underline")}>
                <FontAwesomeIcon icon={faUnderline} /> Underline
              </li>
              <li onClick={() => handleFontOptionClick("paragraph")}>
                <FontAwesomeIcon icon={faParagraph} /> Paragraph
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="emoji-picker3">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default IconBar;