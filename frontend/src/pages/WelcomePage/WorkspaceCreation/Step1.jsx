import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/WelcomePage/Step1.css';
import CustomFileInput from '../../../components/Shared/CustomFileInput';

const Step1CreateProfile = ({ onNext }) => {
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (file) => {
    setPhoto(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fullName) {
      setError('Full name is required.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }
  
      const formData = new FormData();
      formData.append('fullName', fullName);
      if (photo) formData.append('photo', photo);
  
      const response = await axios.post(
        'http://localhost:5000/api/workspaces/create-profile',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data', // Remove this line
          },
        }
      );
  
      setMessage(response.data.message);
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError('Failed to create profile.');
    }
  };
  

  return (
    <form className="step1-create-profile-form" onSubmit={handleSubmit}>
      <p className='step1-step'>Step 1 of 5</p>
      <h2>Create your Profile</h2>
      <label htmlFor="name" className='step1-name-label'>What’s your name?</label>
      <p>Adding your name and profile photo helps your teammates recognize and connect with you more easily.</p>
      <div className="step1-input-container">
        <input
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="E.g. John Doe"
          maxLength={70}
          className="step1-name-input"
        />
        <div className="step1-character-count">
          {70 - fullName.length}
        </div>
      </div>
      <div className="step1-file-upload-container">
        <label htmlFor="file-upload" className='step1-file-upload-label'>Your Profile Photo or Logo (optional)</label>
        <p>Help your teammates know they’re talking to the right person.</p>
        <div className="step1-file-preview-container">
          <div className="step1-file-preview">
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="File Preview" />
            ) : (
              <div className="step1-file-placeholder">J</div>
            )}
          </div>
          <CustomFileInput onFileChange={handleFileChange} />
        </div>
        <button type="submit" className="step1-next-button">Next</button>
      </div>
      {error && <div className="step1-error">{error}</div>}
      {message && <div className="step1-message">{message}</div>}
    </form>
  );
};

export default Step1CreateProfile;
