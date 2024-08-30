import React, { useState } from "react";
import "./EditComponent.css";

const EditTopic = ({ initialTopic, onSave, onClose }) => {
  const [topic, setTopic] = useState(initialTopic);

  const handleSave = () => {
    onSave(topic);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Edit Topic</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Add a topic"
            className="edit-modal-textarea"
          />
          <p>
            Let people know what this channel is focused on right now (ex. a
            project milestone). Topics are always visible in the header.
          </p>
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EditDescription = ({ initialDescription, onSave, onClose }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(description);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Edit Description</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            className="edit-modal-textarea"
          />
          <p>Let people know what this channel is for.</p>
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EditChannelName = ({ initialChannelName, onSave, onClose }) => {
  const [channelName, setChannelName] = useState(initialChannelName);

  const handleSave = () => {
    onSave(channelName);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Edit Channel Name</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter channel name"
            className="edit-modal-textarea"
          />
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EditChannelPrivacy = ({ isPrivate, onSave, onClose }) => {
  const [privacy, setPrivacy] = useState(isPrivate);

  const handleSave = () => {
    onSave(privacy);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Edit Channel Privacy</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <label>
            <input
              type="radio"
              value={true}
              checked={privacy === true}
              onChange={() => setPrivacy(true)}
            />
            Private
          </label>
          <label>
            <input
              type="radio"
              value={false}
              checked={privacy === false}
              onChange={() => setPrivacy(false)}
            />
            Public
          </label>
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const RemoveConfirmationModal = ({ isOpen, onConfirm, onClose, memberName }) => {
  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Remove Member</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <p>Are you sure you want to remove {memberName} from the channel?</p>
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="edit-modal-confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const LeaveChannelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Leave Channel</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <p>Are you sure you want to leave this channel?</p>
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="edit-modal-confirm-button" onClick={onConfirm}>
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

const ArchiveChannelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Archive Channel</h2>
          <button className="edit-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="edit-modal-body">
          <p>Are you sure you want to archive this channel? This action is permanent.</p>
        </div>
        <div className="edit-modal-footer">
          <button className="edit-modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="edit-modal-confirm-button" onClick={onConfirm}>
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditTopic, EditDescription, EditChannelName, EditChannelPrivacy, RemoveConfirmationModal, LeaveChannelModal, ArchiveChannelModal };
