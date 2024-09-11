import React, { useState, useEffect } from 'react';
import './ProfileModal.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faClock, faPhone, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

const ProfileModal = ({ isOpen, onClose, status = "active", customStatus }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    timeZone: '',
    joinedDate: '',
    profilePicture: '',
    nameRecordingUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (isOpen) {
        try {
          const response = await authAxios.get('http://localhost:5000/api/users/profile');
          console.log('Profile data:', response.data); // Add this line
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error.response?.data || error.message);
          alert('Failed to fetch profile data. ' + (error.response?.data?.message || error.message));
        }
      }
    };
    

    fetchProfile();
  }, [isOpen]);

  if (!isOpen) return null;

  const statusClass = status ? status.toUpperCase() : "default";

  const renderStatus = () => {
    if (customStatus && customStatus.text && customStatus.emoji) {
      return (
        <div className="custom-status">
          <span className="status-emoji" role="img" aria-label="Custom Status Emoji">
            {customStatus.emoji}
          </span>
          <span className="status-text">{customStatus.text}</span>
        </div>
      );
    } else {
      return (
        <div className="profile-status">
          <span className={`status-dot ${statusClass}`}></span>
          <span className="status-text">{status}</span>
        </div>
      );
    }
  };

  const renderProfilePicture = () => {
    const baseURL = 'http://localhost:5000'; // Adjust if needed
    const profilePicUrl = `${baseURL}${profile.profilePicture}`;
    
    console.log('Profile picture URL:', profilePicUrl); // Verify the URL
  
    return (
      <img 
        src={profilePicUrl} 
        alt="Profile" 
        onError={(e) => e.target.src = 'path/to/fallback-image.png'} 
      />
    );
  };
  

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-container">
          <div className="profile-header">
            <span className="close-icon" onClick={onClose}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
            <h2>Profile</h2>
          </div>
          <div className="profile-content">
            <div className="profile-image">
              {renderProfilePicture()}
            </div>
            <h3 className="profile-name">{profile.fullName}</h3>      
            <p className="profile-title">{profile.title}</p>
            {renderStatus()}
            <div className="profile-actions">
              <button className="action-button">Edit Status</button>
              <button className="action-button">Edit Profile</button>
            </div>
            <div className="contact-info">
              <p>Contact Information</p>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <span className="value">{profile.email}</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <span className="value">{profile.phone}</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <span className="value">
                  {new Intl.DateTimeFormat('en-US', {
                    timeZone: userTimeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }).format(new Date())}
                </span>
              </div>
            </div>
            <div className="about-me">
              <p>About Me</p>
              <div className="about-item">
                <span className="label">Start Date:</span>
                <span className="value">
                  {new Date(profile.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="name-recording">
              {profile.nameRecordingUrl ? (
                <div>
                  <p>Name Recording</p>
                  <audio controls>
                    <source src={profile.nameRecordingUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <p>No name recording available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;