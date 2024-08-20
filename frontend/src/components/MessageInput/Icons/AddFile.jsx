import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../Styles/MessageInput/Icon/AddFile.css';

const AddFile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to track upload status
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('channelId', 'your-channel-id'); // Add channelId or directMessageId
  
    setIsUploading(true); // Start upload process
  
    try {
      const response = await fetch('http://localhost:5000/api/files/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.text(); // or response.json()
        throw new Error(`File upload failed: ${response.status} - ${errorResponse}`);
      }
  
      const data = await response.json();
      alert('File uploaded successfully');
      console.log(data);
      setSelectedFile(null); // Clear file input
      setIsOpen(false); // Close dropdown after upload
    } catch (error) {
      console.error('Error:', error);
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setIsUploading(false); // Stop upload process
    }
  };
  
  // Close the dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="file-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {isOpen && (
        <div className="file-dropdown-menu">
          <div className="file-dropdown-item">
            <img src="./images/bx_file.png" alt="file" className='file-dropdown-icon'/>
            Recent files
          </div>
          <div 
            className="file-dropdown-item" 
            onClick={() => document.getElementById('file-input').click()}
          >
            <img src="./images/ph_upload.png" alt="upload" className='file-dropdown-icon'/>
            Upload from computer
          </div>
          <input
            id="file-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {isUploading && (
            <div className="uploading-spinner">
              {/* Add your spinner or animation here */}
              <p>Uploading...</p>
              <div className="spinner"></div> {/* Example spinner */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFile;
