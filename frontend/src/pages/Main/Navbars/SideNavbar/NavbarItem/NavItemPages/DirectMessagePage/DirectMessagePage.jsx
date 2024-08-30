import React, { useState } from 'react';
import { FaSearch, FaPen } from 'react-icons/fa';
import MessageComposer from '../Message/Message'; // Adjust path as necessary
import './DirectMessagePage.css';

// Sample data array with profile images
const sampleData = [
  { id: 1, name: 'Gaurav Dahal', message: 'You: // In SessionModal component\'s return statement…', time: '2 mins', isUnread: true, profileImage: 'path_to_image/gaurav.jpg' },
  { id: 2, name: 'Niraj Kha', message: 'You: const express = require(\'express\');…', time: '45 mins', isUnread: false, profileImage: 'path_to_image/niraj.jpg' },
  { id: 3, name: 'Gaurav Dahal', message: 'Mention.jsx', time: '9:08 AM', isUnread: false, profileImage: 'path_to_image/gaurav.jpg' },
  { id: 4, name: 'Jesish Khadka', message: 'You: package-lock.json', time: 'Yesterday', isUnread: false, profileImage: 'path_to_image/jesish.jpg' },
  { id: 5, name: 'Deepak Shrestha', message: 'You: Excuse me sir. Yo heriso ta yo hjur le hijo vaney aunsar garna khojiraithy yo vako ho ki hoina?', time: 'Wednesday', isUnread: false, profileImage: 'path_to_image/deepak.jpg' },
  { id: 6, name: 'Aditya Thapa Magar', message: 'Brahmabytelab32 joined Slack — take a second to say hello.', time: 'August 11th', isUnread: false, profileImage: 'path_to_image/aditya.jpg' },
];

const DirectMessagePage = () => {
  const [showUnread, setShowUnread] = useState(false);
  const [showComposer, setShowComposer] = useState(false);

  const toggleUnread = () => setShowUnread(prev => !prev);
  const toggleComposer = () => setShowComposer(prev => !prev);

  const filteredData = showUnread ? sampleData.filter(msg => msg.isUnread) : sampleData;

  return (
    <div className="direct-message-page">
      <div className="dm-container">
        <div className="dm-list-container">
          <header className="dm-header">
            <h2 className="dm-title">Direct messages</h2>
            <div className="header-actions">
              <button className="toggle-unread" onClick={toggleUnread}>
                {showUnread ? 'Show All' : 'Show Unread'}
              </button>
              <FaPen className="write-icon" onClick={toggleComposer} />
            </div>
          </header>
          <div className="dm-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Find a DM" className="search-input" />
          </div>
          <div className="dm-list">
            {filteredData.map(({ id, name, message, time, profileImage }) => (
              <div key={id} className="dm-item">
                <div className="dm-profile-icon">
                  <img src={profileImage} alt={name} />
                </div>
                <div className="dm-content">
                  <div className="dm-name-message">
                    <span className="dm-name">{name}</span>
                    <span className="dm-message">{message}</span>
                  </div>
                  <span className="dm-time">{time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showComposer && (
          <div className="extra-content">
            <MessageComposer />
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessagePage;