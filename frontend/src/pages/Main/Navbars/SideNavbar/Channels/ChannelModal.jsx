import React, { useState } from "react";
import axios from "axios";
import "./ChannelModal.css";

const ChannelModal = ({ closeModal, addChannel }) => {
  const [isChannelCreated, setChannelCreated] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState(""); // Updated to match backend
  const [visibility, setVisibility] = useState("public"); // Updated to match backend
  const [error, setError] = useState(null);

  const handleCreateChannel = async () => {
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
            "http://localhost:5000/api/workspaces/create-multiple",
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
            <h2>Create a New Channel</h2>
            <form>
              <label>
                Name
                <input
                  type="text"
                  placeholder=" # e.g. general"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </label>
              <p className="description">
                Channels are where conversations happen around topics. Use a name that is easy to find and understand.
              </p>
              <label>
                Visibility
                <div className="visibility-options">
                  <label>
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={visibility === "public"}
                      onChange={() => setVisibility("public")}
                    />
                    Public - Anyone in <span>Your Company</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={visibility === "private"}
                      onChange={() => setVisibility("private")}
                    />
                    Private - Only specific people
                    <p>Can only be viewed or joined by invitation</p>
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
          <div className="add-members-modal-overlay">
            <div className="add-members-modal">
              <button
                className="add-members-modal-close"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
              </button>
              <h2>Add Members To {channelName}</h2>
              <p>Enter a name or email</p>
              <input type="text" placeholder="Enter a name or email" />
              <div className="add-members-modal-actions">
                <button
                  type="button"
                  className="skip-button"
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