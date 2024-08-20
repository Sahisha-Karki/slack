import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DirectMessages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const DirectMessages = ({ onSelectUser }) => {
  const [isMessageListVisible, setMessageListVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/users/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleMessageListVisibility = () => {
    setMessageListVisible(!isMessageListVisible);
  };

  if (typeof onSelectUser !== 'function') {
    console.error('onSelectUser prop is not a function');
  }

  return (
    <div className="direct-messages">
      <div className="direct-message-header">
        <button className="toggle-message-list" onClick={toggleMessageListVisibility}>
          <FontAwesomeIcon icon={faCaretDown} className={`toggle-icon ${isMessageListVisible ? '' : 'rotated'}`} />
        </button>
        <h3>Direct Messages</h3>
      </div>
      {isMessageListVisible && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="direct-message-list">
              {users.map(user => (
                <li
                  key={user._id}
                  className="direct-message-item"
                  onClick={() => onSelectUser(user._id)} // Handle user selection
                >
                  <span>{user.email}</span>
                </li>
              ))}
            </ul>
          )}
          <button className="add-member">
            <img src="./images/add.png" alt="Add Members" /> Add Members
          </button>
        </>
      )}
    </div>
  );
};

export default DirectMessages;
