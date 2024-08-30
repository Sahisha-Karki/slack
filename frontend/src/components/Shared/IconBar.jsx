import React, { useState } from "react";
import "../../Styles/Shared/IconBar.css"; // Import external CSS file

const IconBar = ({ showEmojiPicker, onEmojiClick, onEmojiSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const handleAddClick = () => {
    setShowAddDropdown(prev => !prev); // Toggle add-dropdown visibility
  };

  const handleFontClick = () => {
    setShowDropdown(prev => !prev); // Toggle font-dropdown visibility
  };

  const handleAttachmentClick = () => {
    alert('Attachment button clicked');
  };

  const handleCheckboxClick = () => {
    alert('Checkbox button clicked');
  };

  const handleTableClick = () => {
    alert('Table button clicked');
  };

  return (
    <div className="icon-bar">
      <button className="icon-button add-button" onClick={handleAddClick}>
        <img src='./images/canvas/add.png' alt="add" />
      </button>
      <button className="icon-button font-button" onClick={handleFontClick}>
        <img src='./images/canvas/font.png' alt="font" />
      </button>
      <button className="icon-button" onClick={onEmojiClick}>
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
            <li>Record Video Clip</li>
            <li>Record Audio Clip</li>
            <li>Divider</li>
            <li>Image</li>
            <li>File</li>
          </ul>
        </div>
      )}

      {/* Font Dropdown Menu */}
      {showDropdown && (
        <div className="font-dropdown-section">
          <div className="dropdown-section">
            <ul>
              <li>Blockquote</li>
              <li>Code Block</li>
            </ul>
          </div>
          <div className="dropdown-section">
            <ul>
              <li>Bulleted List</li>
              <li>Ordered List</li>
              <li>Checklist</li>
            </ul>
          </div>
          <div className="dropdown-section">
            <ul>
              <li>Small Heading</li>
              <li>Medium Heading</li>
              <li>Underline</li>
              <li>Big Heading</li>
              <li>Paragraph</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconBar;
