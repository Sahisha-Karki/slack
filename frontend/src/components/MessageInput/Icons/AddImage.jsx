import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      console.log('Selected file:', file);
    }
  };

  return (
    <div className="add-image-container">
      <label htmlFor="image-upload" className="upload-button">
        <FontAwesomeIcon
          icon={faImage}
          style={{ fontSize: '18px', color: 'white' }} // Adjust icon size and color here
        />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="upload-image" // Ensure this class is correctly used
        style={{ display: 'none' }}
      />
      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default AddImage;
