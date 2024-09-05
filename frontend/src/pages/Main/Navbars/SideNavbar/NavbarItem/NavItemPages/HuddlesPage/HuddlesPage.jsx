import React, { useState } from 'react';
import Modal from './Modal';
import './HuddlesPage.css';

const HuddlesPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const recentHuddles = [
    { name: 'Gaurav Dahal', time: '23 hours ago', status: 'Missed huddle invite', profiles: [{ name: 'Alice', initial: 'A' }, { name: 'Bob', initial: 'B' }, { name: 'Charlie', initial: 'C' }] },
    { name: 'Jane Doe', time: '1 day ago', status: 'Completed huddle', profiles: [{ name: 'Dave', initial: 'D' }, { name: 'Eva', initial: 'E' }] },
    { name: 'John Smith', time: '2 days ago', status: 'Missed huddle invite', profiles: [{ name: 'Frank', initial: 'F' }, { name: 'Grace', initial: 'G' }, { name: 'Hannah', initial: 'H' }, { name: 'Ivy', initial: 'I' }] },
  ];

  const formatProfileNames = (profiles) => {
    if (profiles.length === 1) {
      return profiles[0].name;
    }
    return profiles.map(profile => profile.name).join(', ');
  };

  return (
    <div className="huddles-container">
      {/* Header Section */}
      <div className="huddles-header">
        <h2>Huddles</h2>
        <button className="new-huddle-btn" onClick={toggleModal}>
          + New Huddle
        </button>
      </div>

      {/* Modal Component */}
      <Modal isVisible={isModalVisible} onClose={toggleModal} />

      {/* Banner Section */}
      <div className="huddles-banner">
        <div className="banner-content">
          <h3>Instantly connect over audio or video</h3>
          <p>Talk it out in real time on a huddle, with screen-sharing, expressive reactions, and a message thread that automatically saves for later reference.</p>
          <button className="start-huddle-btn"  onClick={toggleModal}>Start a Huddle</button>
        </div>
        <div className="banner-image">
          <img src="./images/huddle-illustration.png" alt="Huddle Illustration" />
        </div>
      </div>

      {/* Recent Huddles Section */}
      <div className="recent-huddles">
        <h4>Recent huddles</h4>
        <ul className="huddles-list">
          {recentHuddles.map((huddle, index) => (
            <li key={index} className="huddle-item">
              <div className="huddle-info">
                <span className="huddle-icon">&#x1F3A7;</span> {/* Headphones icon */}
                <div className="huddle-details">
                  <span className="huddle-name">{formatProfileNames(huddle.profiles)}</span>
                  <span className="huddle-time">{huddle.time} · {huddle.status}</span>
                </div>
              </div>
              <div className="huddle-actions">
                <div className="profile-matrix">
                  {huddle.profiles.map((profile, i) => (
                    <span key={i} className="huddle-profile-icon" title={profile.name}>{profile.initial}</span>
                  ))}
                </div>
                <span className="more-options">&#x22EE;</span> {/* Vertical ellipsis icon */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HuddlesPage;
