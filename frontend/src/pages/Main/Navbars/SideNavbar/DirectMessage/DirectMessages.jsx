import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DirectMessages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCircle,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faRegularCircle } from "@fortawesome/free-regular-svg-icons";
import InviteModal from "./InviteModal"; // Import the InviteModal component

const DirectMessages = ({ onSelectUser }) => {
  const [isMessageListVisible, setMessageListVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [userStatuses, setUserStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  const statusIconMap = {
    Online: (
      <FontAwesomeIcon
        icon={faCircle}
        style={{ color: "green", width: "14px", height: "14px" }}
      />
    ),
    Away: (
      <FontAwesomeIcon
        icon={faMoon}
        style={{ color: "orange", width: "14px", height: "14px" }}
      />
    ),
    Invisible: (
      <FontAwesomeIcon
        icon={faRegularCircle}
        style={{ color: "gray", width: "14px", height: "14px" }}
      />
    ),
  };

  const fetchUserProfileStatus = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/profile/${userId}/profile-status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.profileStatus;
    } catch {
      return "Online";
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const workspaceId = localStorage.getItem('workspaceId');
      if (!workspaceId) {
        setError('Workspace ID not found');
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`http://localhost:5000/api/workspaces/${workspaceId}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userList = Array.isArray(data.members) ? data.members : data;
        setUsers(userList);

        const statuses = {};
        await Promise.all(userList.map(async (user) => {
          statuses[user._id] = await fetchUserProfileStatus(user._id);
        }));
        setUserStatuses(statuses);
      } catch {
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

  const renderProfilePicture = (user) => {
    const status = userStatuses[user._id] || 'Online';
    return (
      <div className="profile-picture-container">
        {user.profilePicture ? (
          <>
            <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="profile-picture" />
          </>
        ) : (
          <div className="profile-initials">
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <div className="direct-status-indicator">{statusIconMap[status]}</div>
      </div>
    );
  };


  return (
    <div className="direct-messages">
      <div className="direct-message-header">
        <button
          className="toggle-message-list"
          onClick={toggleMessageListVisibility}
        >
          <FontAwesomeIcon
            icon={faCaretDown}
            className={`toggle-icon ${isMessageListVisible ? "" : "rotated"}`}
          />
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
              {Array.isArray(users) &&
                users.map((user) => (
                  <li
                    key={user._id}
                    className="direct-message-item"
                    onClick={() =>
                      onSelectUser(user._id, user.email, user.username)
                    }
                  >
                    <div className="direct-user-info">
                      {renderProfilePicture(user)}
                      <div className="user-details">
                        <span className="username">
                          {user.fullName ||
                            (user.email ? user.email.split("@")[0] : "Unknown")}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          <button className="add-member" onClick={handleAddMembersClick}>
            <img src="./images/add.png" alt="Add Members" /> Add Members
          </button>
        </>
      )}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
      />
    </div>
  );
};

export default DirectMessages;
