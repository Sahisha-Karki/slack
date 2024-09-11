import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const AddImage = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelect(imageUrl); // Pass the image URL to the parent
    }
  };

  return (
    <div className="add-image-container">
      <label htmlFor="image-upload" className="upload-button">
        <FontAwesomeIcon
          icon={faImage}
          style={{ fontSize: '18px', color: 'white' }}
        />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="upload-image"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AddImage;
