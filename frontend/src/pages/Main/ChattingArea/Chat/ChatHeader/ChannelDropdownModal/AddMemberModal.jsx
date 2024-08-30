import React, { useState, useEffect } from "react";
import "./AddMemberModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faHashtag } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const AddMemberModal = ({ isOpen, onClose, channelName, isPrivate }) => {
  const [step, setStep] = useState(1);
  const [memberInput, setMemberInput] = useState("");
  const [channelId, setChannelId] = useState(null); // State to hold the channel ID
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    if (!isOpen) {
      setStep(1); // Reset to step 1 whenever the modal is closed
      setMemberInput(""); // Clear the input
      setSuccessMessage(null); // Clear success message
    }
    
    // Fetch channel ID from local storage if not provided as a prop
    const storedChannelId = localStorage.getItem('selectedChannelId');
    setChannelId(storedChannelId);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    setStep(2);
  };

  const handleInputChange = (event) => {
    setMemberInput(event.target.value);
  };

  const handleAddMembers = async () => {
    const token = localStorage.getItem('token');
    
    if (!channelId) {
      console.error("Channel ID is missing");
      return;
    }

    const members = memberInput.split(',').map(member => member.trim());

    try {
      await axios.post(`http://localhost:5000/api/channels/${channelId}/add-member`, {
        members
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      // Display success message
      setSuccessMessage('Member(s) added successfully!');
    } catch (error) {
      console.error("Failed to add members", error);
      setSuccessMessage('Failed to add members.');
    }
  };

  const handleCloseModal = () => {
    setSuccessMessage(null);
    onClose();
  };

  return (
    <div className="channel-dropdown-add-member-modal-overlay">
      <div className="channel-dropdown-add-member-modal-content">
        <div className="channel-dropdown-add-member-modal-header">
          <h2 className="channel-dropdown-add-member-modal-title">
            {successMessage ? 'Success!' : step === 1 ? 
              "Anyone you add will be able to see all of the channel's contents" : 
              `Add people to ${channelName}`}
          </h2>
          <button
            className="channel-dropdown-add-member-modal-close-button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {successMessage ? (
          <div className="channel-dropdown-add-member-modal-body">
            <p>{successMessage}</p>
            <button
              className="channel-dropdown-add-member-modal-continue-button"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        ) : step === 1 ? (
          <div className="channel-dropdown-add-member-modal-body">
            <p>
              New members will be able to see all of{" "}
              <span>{channelName}</span>'s history, including any files that
              have been shared in the channel. If you'd like, you can create a
              new channel instead.
            </p>
            <div className="channel-dropdown-add-member-modal-options">
              <label>
                <input type="radio" name="addOption" />
                Add to{" "}
                <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} />
                {` ${channelName}`}
              </label>
              <p>Add new members to the existing channel</p>
              <label>
                <input type="radio" name="addOption" />
                Create a new channel
              </label>
              <p>
                Slack will archive the existing channel and automatically invite
                all of its members to a new channel.
              </p>
            </div>
          </div>
        ) : (
          <div className="channel-dropdown-add-member-modal-body">
            <input
              type="text"
              className="channel-dropdown-add-member-modal-input"
              placeholder="ex. Nathalie, or james@acme.com"
              value={memberInput}
              onChange={handleInputChange}
            />
          </div>
        )}
        {!successMessage && (
          <div className="channel-dropdown-add-member-modal-footer">
            {step === 1 ? (
              <>
                <button
                  className="channel-dropdown-add-member-modal-cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="channel-dropdown-add-member-modal-continue-button"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </>
            ) : (
              <button
                className="channel-dropdown-add-member-modal-continue-button"
                onClick={handleAddMembers}
              >
                Add
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMemberModal;
