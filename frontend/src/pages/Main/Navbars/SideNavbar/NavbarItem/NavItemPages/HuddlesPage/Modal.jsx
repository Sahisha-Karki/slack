import React from 'react';
import './Modal.css'; 

const people = [
  { name: 'Jesish Khadka', status: 'active-green-dot', profilePic: './images/profile1.jpg' },
  { name: 'Niraj Kha', status: 'active-green-dot', profilePic: './images/profile2.jpg' },
  { name: 'Gaurav Dahal', status: 'active-green-dot', profilePic: './images/profile1.jpg' },
];

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleCancel = () => {
    onClose();
  };

  const handleStartHuddle = () => {
    alert('Huddle started!');
  };

  return (
    <div className="huddle-modal-overlay">
      <div className="huddle-modal-container">
        <div className="huddle-modal-header">
          <h3>Start a Huddle</h3>
          <button className="huddle-modal-close-btn" onClick={handleCancel}>
            &times;
          </button>
        </div>
        <div className="huddle-modal-content">
          <p>Find a person or channel to huddle with</p>
          <input
            type="text"
            placeholder="Search by name"
            className="huddle-modal-search-input"
          />
          <div className="huddle-modal-info">
            <p>Huddles with more than two people is a paid feature, available with your free trial through September 7th.</p>
          </div>
          <div className="huddle-modal-people">
            {people.map((person, index) => (
              <div key={index} className="huddle-profile">
              <img src={person.profilePic} alt={`${person.name}'s profile`} className="profile-pic" />
              <div className="profile-name-container">
                <span className="profile-name">{person.name}</span>
                <div className={`profile-status ${person.status}`}></div>
              </div>
            </div>
            
            ))}
          </div>
          <div className="huddle-modal-buttons">
            <button className="huddle-modal-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="huddle-modal-start-btn" onClick={handleStartHuddle}>
              Start Huddle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
