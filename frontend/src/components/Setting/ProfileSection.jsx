import React, { useState, useEffect } from 'react';
import '../../../src/Styles/Setting/ProfileSection.css';
import { FaChevronUp } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const authAxios = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const [profile, setProfile] = useState({
    title: '',
    fullname: '',
    displayname: '',
    email: '',
    phoneNumber: '',
    profilePicture: null
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAxios.get('users/get-profile');
      const userData = response.data;
      setProfile({
        title: userData.title,
        fullname: userData.fullName,
        displayname: userData.displayName,
        email: userData.email,
        phoneNumber: userData.phone,
        profilePicture: userData.profilePicture || null
      });
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
      alert('Failed to fetch user data. ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setHasChanges(true); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
        setHasChanges(true);
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleRemoveImage = () => {
    setProfile({ ...profile, profilePicture: null });
    setHasChanges(true); 
  };

  const handleSave = async () => {
    try {
      const updateData = {
        fullName: profile.fullname,
        displayName: profile.displayname,
        title: profile.title,
        phone: profile.phoneNumber,
        profilePicture: profile.profilePicture, // Include profilePicture
      };
      
      const response = await authAxios.put('users/update', updateData);
  
      setProfile(prevProfile => ({
        ...prevProfile,
        fullname: response.data.fullName,
        displayname: response.data.displayName,
        title: response.data.title,
        phoneNumber: response.data.phone,
        profilePicture: response.data.profilePicture, // Update profile picture from response
      }));
  
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleStartRecording = async () => {
    console.log('Start Recording clicked'); // Debugging statement
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted'); // Debugging statement
  
      const newMediaRecorder = new MediaRecorder(stream);
  
      newMediaRecorder.ondataavailable = (e) => {
        setAudioChunks((prev) => [...prev, e.data]);
      };
  
      newMediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioChunks([]); // Reset chunks
      };
  
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
      console.log('Recording started'); // Debugging statement
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Failed to access microphone. Please check permissions and device availability.');
    }
  };

  const handleStopRecording = () => {
    console.log('Stop Recording clicked'); // Debugging statement

    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      console.log('Recording stopped'); // Debugging statement
    } else {
      console.log('No active recorder'); // Debugging statement
    }
  };

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const renderProfilePicture = () => {
    if (profile.profilePicture) {
      return (
        <img
          src={profile.profilePicture}
          className="settings-profile-image"
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      );
    } else {
      const initials = profile.email.split(' ').map(name => name[0]).join('').toUpperCase();
      return (
        <div className="settings-profile-image-placeholder">
          {initials}
        </div>
      );
    }
  };

  return (
    <div className="settings-profile-section">
      <div className="settings-profile-header">
        <h2>Profile</h2>
        <button 
          className={`settings-profile-edit-button ${isEditing ? 'settings-profile-edit-button-hidden' : ''}`} 
          onClick={handleEdit}
        >
          {isEditing ? <FaChevronUp className="settings-profile-edit-icon rotate" /> : 'Edit'}
        </button>
      </div>
      {isEditing && (
        <div className="settings-profile-edit">
          <div className="settings-profile-image-container">
            {renderProfilePicture()}
            <div className="settings-profile-name-role">
              <h3>{profile.fullname}</h3>
              <p>{profile.title}</p>
            </div>

            <div className="act-img-btn">
              <input
                type="file"
                accept="image/*"
                id="profilePictureUpload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button className="add-btn" onClick={() => document.getElementById('profilePictureUpload').click()}>
                <FontAwesomeIcon icon={faPlus} />
                <span className="tooltip">Choose profile image</span>
              </button>
              <div className="divider"></div>
              <button className="delete-btn" onClick={handleRemoveImage}>
                <FontAwesomeIcon icon={faTrash} />
                <span className="tooltip">Remove profile image</span>
              </button>
            </div>
          </div>
          <div className="settings-profile-fields">
            <label>Username</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>
            <label>Email</label>
            <div className="settings-profile-input-container">
              <input
                type="email"
                name="email"
                value={profile.email}
                readOnly
                className="readonly-input"
                />
              <span className="settings-profile-edit-icon">✎</span>
            </div>
            <label>Display Name</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="displayname"
                value={profile.displayname}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>

            <label>Name recording</label>
            <div className="settings-profile-input-container">
              <button 
                className="recording-button" 
                onClick={handleVoiceButtonClick}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            </div>

            {audioUrl && (
              <div className="audio-player">
                <audio controls src={audioUrl}></audio>
              </div>
            )}

            <label>Title</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>
            <label>Phone</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>
          </div>
          <div className="settings-profile-actions">
            <button className="settings-profile-save-button" onClick={handleSave}>
              Save
            </button>
            <button className="settings-profile-cancel-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;