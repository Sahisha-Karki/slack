import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import "./ChannelModal.css";

const ChannelModal = ({ closeModal, addChannel, workspaceId }) => {
  const [isChannelCreated, setChannelCreated] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState(""); // Added state for description
  const [visibility, setVisibility] = useState("public"); // Updated to match backend
  const [error, setError] = useState(null);

  const handleCreateChannel = async () => {
    if (!channelName.trim()) {
      setError("Channel name cannot be empty.");
      return;
    }
  
    const workspaceId = localStorage.getItem("workspaceId");
    console.log('Workspace ID from localStorage:', workspaceId);
    if (!workspaceId) {
      setError("No workspace ID found.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      console.log('Workspace ID from localStorage:', workspaceId);

      if (!token) {
        setError("No authentication token found.");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/channels/${workspaceId}/create-multiple`, 
        {
          channels: [
            {
              name: channelName,
              description, // Include description in the request
              visibility
            }
          ] 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      if (response.status === 201) {
        setChannelCreated(true);
        addChannel(response.data.channels[0]); // Assuming the response contains the created channel
      }
    } catch (error) {
      console.error("Error creating channel:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to create channel. Please try again.");
    }
  }

  const handleCloseModal = () => {
    setChannelCreated(false);
    closeModal();
  };

  const handleInvite = () => {
    // Add your invite logic here, e.g., sending an invite request to the server
    console.log('Invite button clicked');
  };

  return (
    <div className="channel-modal-overlay">
      <div className="channel-modal">
        <button className="channel-modal-close" onClick={handleCloseModal}>
          <i className="fas fa-times"></i>
        </button>
        {!isChannelCreated ? (
          <>
            <h2 className="channel-modal-title">Create a New Channel</h2>
            <form>
              <label className="channel-modal-label">
                Name
                <input
                  type="text"
                  placeholder=" # e.g. general"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="channel-input-text"
                />
              </label>
              <label className="channel-modal-label">
                Description
                <textarea
                  placeholder="Optional: Add a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="channel-input-textarea"
                />
              </label>
              <p className="channel-description">
                Channels are where conversations happen around topics. Use a
                name that is easy to find and understand.
              </p>
              <label className="channel-modal-label">
                Visibility
                <div className="channel-visibility-options">
                  <label className="channel-visibility-option">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={visibility === "public"}
                      onChange={() => setVisibility("public")}
                    />
                    Public - Anyone in <span>Your Company</span>
                  </label>
                  <label className="channel-visibility-option">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={visibility === "private"}
                      onChange={() => setVisibility("private")}
                    />
                    Private - Only specific people
                    <p className="channel-visibility-description">
                      Can only be viewed or joined by invitation
                    </p>
                  </label>
                </div>
              </label>
              {error && <p className="channel-error-message">{error}</p>}
              <div className="channel-modal-actions">
                <button
                  type="button"
                  className="channel-create-button"
                  onClick={handleCreateChannel}
                >
                  Create
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="add-members-channel-modal-overlay">
          <div className="add-members-channel-modal">
            <button
              className="add-members-channel-modal-close"
              onClick={handleCloseModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="add-members-channel-modal-title">
Add Members To
<span className="channel-name-with-icon">
  <FontAwesomeIcon
    icon={visibility === "private" ? faLock : faHashtag}
    className="locks"
  />
  {channelName}
</span>
</h2>


            <input
              type="text"
              placeholder="Enter a name or email"
              className="add-members-channel-modal-input"
            />
            <div className="add-members-channel-modal-actions">
              <button
                type="button"
                className="add-members-channel-modal-skip-button"
                onClick={handleCloseModal}
              >
                Skip for now
              </button>
              <button
                type="button"
                className="add-members-channel-modal-invite-button"
                onClick={handleInvite}
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default ChannelModal;