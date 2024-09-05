import React, { useState, useEffect } from 'react';
import './ProfileSection.css';

const ProfileSection = ({ userId }) => { // Expect userId as a prop
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          return;
        }

        if (response.status === 404) {
          setError('User not found');
          return;
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="profile-user-profile">
      <h3>Profile</h3>
      <div className="profile-user-avatar">
        <img src={profile.profilePicture || './images/profile.png'} alt="User Avatar" />
      </div>
      <div className="profile-user-info">
        <h3>{profile.name}</h3>
        <p>{profile.role}</p>
        <span className="profile-user-status">{profile.status && profile.status.type}</span>
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
            <img src="./images/email2.png" alt="Email" /> {profile.email}
          </li>
          <li>
            <img src="./images/phone2.png" alt="Phone" /> {profile.phone}
          </li>
          <li>
            <img src="./images/clock.png" alt="Clock" /> {profile.localTime}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSection;
