// NotificationModal.js
import React, { useState } from "react";
import './NotificationModal.css'; // Create CSS for styling the modal

const NotificationModal = ({ isOpen, onClose }) => {
  const [notificationType, setNotificationType] = useState("all");
  const [notifyThreads, setNotifyThreads] = useState(false);
  const [muteChannel, setMuteChannel] = useState(false);

  const handleSaveChanges = () => {
    // Implement save functionality
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="notification-modal">
      <div className="notification-modal-content">
        <button className="notification-modal-close-button" onClick={onClose}>✖</button>
        <h3>Notifications</h3>
        <div className="notification-options">
          <p>Send notification for:</p>
          <div>
            <label>
              <input
                type="radio"
                value="all"
                checked={notificationType === "all"}
                onChange={() => setNotificationType("all")}
              />
              All new messages
            </label>
            <label>
              <input
                type="radio"
                value="mentions"
                checked={notificationType === "mentions"}
                onChange={() => setNotificationType("mentions")}
              />
              Mentions
            </label>
            <label>
              <input
                type="radio"
                value="nothing"
                checked={notificationType === "nothing"}
                onChange={() => setNotificationType("nothing")}
              />
              Nothing
            </label>
          </div>
        </div>
        <div className="notification-checkbox">
          <label>
            <input
              type="checkbox"
              checked={notifyThreads}
              onChange={() => setNotifyThreads(!notifyThreads)}
            />
            Get notified about all threads replies in this channel
          </label>
        </div>
        <div className="mute-channel">
          <label>
            <input
              type="checkbox"
              checked={muteChannel}
              onChange={() => setMuteChannel(!muteChannel)}
            />
            Mute Channel
          </label>
          <p>Muted channels are greyed out at the bottom of your channel list.</p>
        </div>
        <div className="note">
          <p> <span className="note-note">
          Note:
            </span> You can set notification keywords in your <a href="#">Preferences</a></p>
        </div>
        <div className="notification-modal-buttons">
          <button onClick={onClose} className="notification-cancel-btn">Cancel</button>
          <button onClick={handleSaveChanges} className="notification-save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
