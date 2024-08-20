// In IconBar.js
import React from "react";
import EmojiPicker from "emoji-picker-react"; 

const iconBarStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  borderTop: '1px solid #ddd',
  background: '#073458',
  position: 'absolute',
  bottom: '30px',
  width: 'calc(100% - 60px)',
  borderRadius: '50px',
  left: '20px',
};

const iconButtonStyles = {
  backgroundColor: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const addButtonStyles = {
  background: '#28BD20',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const IconBar = ({ showEmojiPicker, onEmojiClick, onEmojiSelect }) => {
  const handleAddClick = () => {
    alert('Add button clicked');
  };

  const handleFontClick = () => {
    alert('Font button clicked');
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
    <div style={iconBarStyles}>
      <button style={addButtonStyles} onClick={handleAddClick}>
        <img src='./images/canvas/add.png' alt="add" />
      </button>
      <button style={iconButtonStyles} onClick={handleFontClick}>
        <img src='./images/canvas/font.png' alt="font" />
      </button>
      <button style={iconButtonStyles} onClick={onEmojiClick}>
        <img src='./images/canvas/emoji.png' alt="emoji" />
      </button>
      <button style={iconButtonStyles} onClick={handleAttachmentClick}>
        <img src='./images/canvas/file.png' alt="attachment" />
      </button>
      <button style={iconButtonStyles} onClick={handleCheckboxClick}>
        <img src='./images/canvas/checkbox.png' alt="checkbox" />
      </button>
      <button style={iconButtonStyles} onClick={handleTableClick}>
        <img src='./images/canvas/table.png' alt="table" />
      </button>
    </div>
  );
};

export default IconBar;
