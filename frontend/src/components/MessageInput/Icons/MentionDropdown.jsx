import React from 'react';

const MentionDropdown = ({ visible, data, onSelect }) => {
  if (!visible) return null;

  return (
    <div className="mention-dropdown">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((user) => (
          <div
            key={user.id}
            className="mention-item"
            onClick={() => onSelect(user)}
          >
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.email}
                className="mention-item-img"
              />
            )}
            <div className="user-email">{user.email}</div>
          </div>
        ))
      ) : (
        <div className="mention-item">No users found</div>
      )}
    </div>
  );
};

export default MentionDropdown;
