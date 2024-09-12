import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../Styles/MessageInput/Icon/EmojiUploadModal.css'; // Import the CSS

const EmojiUploadModal = ({ isOpen, onClose, onEmojiUpload }) => {
  const [emojiName, setEmojiName] = useState('');
  const [emojiFile, setEmojiFile] = useState(null);
  const [emojis, setEmojis] = useState([]);
  const [showUploadFields, setShowUploadFields] = useState(false);

  // Fetch the emojis from the server when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchEmojis();
    }
  }, [isOpen]);

  const fetchEmojis = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/emojis');
      setEmojis(response.data); // Store the fetched emojis
    } catch (error) {
      console.error('Error fetching emojis:', error);
    }
  };

  const handleEmojiUploads = async () => {
    if (!emojiName || !emojiFile) {
      alert('Please provide both a name and a file for the emoji.');
      return;
    }

    const formData = new FormData();
    formData.append('emojiImage', emojiFile);
    formData.append('name', emojiName);

    try {
      const response = await axios.post('http://localhost:5000/api/emojis/upload', formData);
      console.log('Uploaded emoji:', response.data);

      // Pass the uploaded emoji data back to the parent
      onEmojiUpload({
        name: emojiName,
        imageUrl: response.data.imageUrl,
      });

      // Fetch the updated emoji list after upload
      fetchEmojis();

      // Reset input fields and hide upload fields
      setEmojiName('');
      setEmojiFile(null);
      setShowUploadFields(false);
    } catch (error) {
      console.error('Error uploading emoji:', error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    onEmojiUpload(emoji); // Pass the selected emoji back to the parent component
  };

  if (!isOpen) return null;

  return (
    <div className="emoji-upload-modal">
      <div className="emoji-upload-modal-overlay" onClick={onClose}></div>
      <div className="emoji-upload-modal-content">
        <button className="emoji-upload-close-button" onClick={onClose}>×</button>
        <h2>Emojis</h2>

        {/* Display emojis side by side */}
        <div className="emoji-display-container">
          {emojis.map((emoji) => (
            <div key={emoji._id} className="emoji-item" onClick={() => handleEmojiSelect(emoji)}>
              <img src={emoji.imageUrl} alt={emoji.name} className="emoji-image" />
              <p>{emoji.name}</p>
            </div>
          ))}
        </div>

        {!showUploadFields && (
          <button className="emoji-add-button" onClick={() => setShowUploadFields(true)}>
            <span className="emoji-add-icon">+</span> Add Emoji
          </button>
        )}

        {showUploadFields && (
          <>
            <input
              className="emoji-upload-input"
              type="text"
              placeholder="Emoji Name"
              value={emojiName}
              onChange={(e) => setEmojiName(e.target.value)}
            />
            <input
              className="emoji-upload-input-file"
              type="file"
              accept="image/*"
              onChange={(e) => setEmojiFile(e.target.files[0])}
            />
            <button className="emoji-upload-submit-button" onClick={handleEmojiUploads}>Upload Emoji</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmojiUploadModal;
