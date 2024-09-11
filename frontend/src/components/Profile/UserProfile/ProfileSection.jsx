import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

// Axios instance with token
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

const ProfileSection = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      try {
        const response = await authAxios.get(`/users/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null); // Ensure user is set to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div className="profile-user-profile">Loading...</div>;
  }

  if (!user) {
    return <div className="profile-user-profile">Select a user to view their profile.</div>;
  }

  const {
    profilePicture,
    fullName,
    title,
    profileStatus,
    email,
    phone,
    localTime,
  } = user;

  return (
    <div className="profile-user-profile">
      <h3>Profile</h3>
      <div className="profile-user-avatar">
        <img
          src={profilePicture ? `http://localhost:5000${profilePicture}` : "./images/profile.png"}
          alt="User Avatar"
        />
      </div>
      <div className="profile-user-info">
        <h3>{typeof fullName === 'string' ? fullName : 'Name not available'}</h3>
        <p>{typeof title === 'string' ? title : 'title not defined'}</p>
        <span className={`profile-user-status ${typeof profileStatus === 'string' ? profileStatus.toLowerCase() : ''}`}>
          {typeof profileStatus === 'string' ? profileStatus : 'Status not defined'}
        </span>
      </div>
      <div className="profile-user-actions">
        <div className="action-item">
          <button><FontAwesomeIcon icon={faPhone} /></button>
          <span>Call</span>
        </div>
        <div className="action-item">
          <button><FontAwesomeIcon icon={faVideo} /></button>
          <span>Video Call</span>
        </div>
        <div className="action-item">
          <button><FontAwesomeIcon icon={faEnvelope} /></button>
          <span>Email</span>
        </div>
      </div>

      <div className="profile-user-details">
        <h4>Details</h4>
        <ul>
          <li>
            <FontAwesomeIcon icon={faEnvelope} /> {typeof email === 'string' ? email : 'Email not available'}
          </li>
          <li>
            <FontAwesomeIcon icon={faPhone} /> {typeof phone === 'string' ? phone : 'Phone not defined'}
          </li>
          <li>
            <FontAwesomeIcon icon={faClock} /> {typeof localTime === 'string' ? localTime : 'Local Time not defined'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSection;
