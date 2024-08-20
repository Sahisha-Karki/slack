import React from 'react';
import './ProfileModal.css'; // Import your CSS for styling

const ProfileModal = ({ isOpen, onClose, status = "active" }) => {
  if (!isOpen) return null;

  // Ensure status is defined and convert to lower case safely
  const statusClass = status ? status.toLowerCase() : "default";

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-container">
          <div className="profile-header">
            <span className="close-icon" onClick={onClose}>×</span>
            <h2>Profile</h2>
          </div>
          <div className="profile-content">
            <div className="profile-image">
              {/* Replace with actual image path */}
              <img src="./images/profile.png" alt="Profile" />
            </div>
            <h3 className="profile-name">John Doe</h3>
            <p className="profile-title">Developer</p>
            <div className="profile-status">
              <span className={`status-dot ${statusClass}`}></span>
              <span className="status-text">{status}</span>
            </div>
            <div className="profile-actions">
              <button className="action-button">Edit Status</button>
              <button className="action-button">Edit Profile</button>
            </div>
            <div className="contact-info">
              <p>Contact Information</p>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <span className="value">johndoe@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="icon">📞</span>
                <span className="value">+977-9123456789</span>
              </div>
              <div className="contact-item">
                <span className="icon">⏰</span>
                <span className="value">4:26 PM Local Time</span>
              </div>
            </div>
            <div className="about-me">
              <p>About Me</p>
              <div className="about-item">
                <span className="label">Start Date:</span>
                <span className="value">Jul 10, 2024 (1 month ago)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
