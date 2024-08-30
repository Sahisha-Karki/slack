import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DirectMessages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import InviteModal from './InviteModal'; // Import the InviteModal component

const DirectMessages = ({ onSelectUser }) => {
  const [isMessageListVisible, setMessageListVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const workspaceId = localStorage.getItem('workspaceId'); // Retrieve workspaceId from localStorage
      console.log('Workspace ID:', workspaceId); // Ensure workspaceId is being retrieved
      if (!workspaceId) {
        console.error('Workspace ID not found in localStorage');
        setError('Workspace ID not found');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/workspaces/${workspaceId}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(Array.isArray(response.data.members) ? response.data.members : response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleMessageListVisibility = () => {
    setMessageListVisible(!isMessageListVisible);
  };

  const handleAddMembersClick = () => {
    setInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setInviteModalOpen(false);
  };

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
          ) : error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <ul className="direct-message-list">
  {Array.isArray(users) && users.map(user => (
    <li
      key={user._id}
      className="direct-message-item"
      onClick={() => onSelectUser(user._id, user.email)}
    >
      <span>{user.email.split('@')[0]}</span> {/* Display name before @ */}
    </li>
  ))}
</ul>
          )}
          <button className="add-member" onClick={handleAddMembersClick}>
            <img src="./images/add.png" alt="Add Members" /> Add Members
          </button>
        </>
      )}
      <InviteModal isOpen={isInviteModalOpen} onClose={handleCloseInviteModal} />
    </div>
  );
};

export default DirectMessages;
