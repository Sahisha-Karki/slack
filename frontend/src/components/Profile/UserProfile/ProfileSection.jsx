import React, { useState } from 'react';
import './ProfileSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the faEdit icon

const dummyProfile = {
  name: "John Doe",
  role: "Developer",
  status: "Active",
  email: "johndoe@gmail.com",
  phone: "+977-9123456789",
  localTime: "4:26 PM Local Time",
};

const ProfileSection = () => {

  return (
    <div className="profile-user-profile">
      <h3>Profile</h3>
      <div className="profile-user-avatar">
        <img src="./images/profile.png" alt="User Avatar" />
      </div>
      <div className="profile-user-info">
        <h3>{dummyProfile.name}</h3>
        <p>{dummyProfile.role}</p>
        <span className="profile-user-status">{dummyProfile.status}</span>
      </div>
      <div className="profile-user-actions">
        <img src="./images/phone.png" alt="Phone" />
        <img src="./images/video.png" alt="Video" />
        <img src="./images/email.png" alt="Email" />
      </div>
      <div className="profile-user-details">
        <h4>Details</h4>
        <ul>
          <li>
            <img src="./images/email2.png" alt="Email" /> {dummyProfile.email}
          </li>
          <li>
            <img src="./images/phone2.png" alt="Phone" /> {dummyProfile.phone}
          </li>
          <li>
            <img src="./images/clock.png" alt="Clock" /> {dummyProfile.localTime}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSection;
