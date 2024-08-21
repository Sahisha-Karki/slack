import React, { useState } from "react";
import axios from "axios";
import "./ChannelModal.css";

const ChannelModal = ({ closeModal, addChannel }) => {
  const [isChannelCreated, setChannelCreated] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState(""); // Updated to match backend
  const [visibility, setVisibility] = useState("public"); // Updated to match backend
  const [error, setError] = useState(null);

  const 
  handleCreateChannel = async () => {
    if (!channelName.trim()) {
        setError("Channel name cannot be empty.");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found.");
            return;
        }

        const response = await axios.post(
            "http://localhost:5000/api/workspaces//create-multiple",
            {
                channelNames: [channelName],
                visibility, // Send visibility
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.status === 201) {
            setChannelCreated(true);
            addChannel(response.data.channels[0]);
        }
    } catch (error) {
        console.error("Error creating channel:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to create channel. Please try again.");
    }
};


  const handleCloseModal = () => {
    setChannelCreated(false);
    closeModal();
  };

  return (
    <div className="channel-modal-overlay">
  <div className="channel-modal">
    <button
      className="channel-modal-close"
      onClick={handleCloseModal}
    >
      <i className="fas fa-times"></i>
    </button>
    {!isChannelCreated ? (
      <>
        <h2 className="modal-title">Create a New Channel</h2>
        <form>

          
          <label className="modal-label">
            Name
            <input
              type="text"
              placeholder=" # e.g. general"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="input-text"
            />
          </label>
          <p className="description">
            Channels are where conversations happen around topics. Use a name that is easy to find and understand.
          </p>
          <label className="modal-label">
            Visibility
            <div className="visibility-options">
              <label className="visibility-option">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                />
                Public - Anyone in <span>Your Company</span>
              </label>
              <label className="visibility-option">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                />
                Private - Only specific people
                <p className="visibility-description">Can only be viewed or joined by invitation</p>
              </label>
            </div>
          </label>
          {error && <p className="error-message">{error}</p>}
          <div className="channel-modal-actions">
            <button
              type="button"
              className="create-button"
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
    <h2 className="add-members-channel-modal-title">Add Members To {channelName}</h2>
    <p className="add-members-channel-modal-description">Enter a name or email</p>
    <input type="text" placeholder="Enter a name or email" />
    <div className="add-members-channel-modal-actions">
      <button
        type="button"
        className="add-members-channel-modal-skip-button"
        onClick={handleCloseModal}
      >
        Skip for now
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