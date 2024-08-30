import React, { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import "./CustomStatusModal.css";

import calendarIcon from "../../../../../asset/i1.png";
import sickIcon from "../../../../../asset/i2.png";
import commutingIcon from "../../../../../asset/i3.png";
import vacationIcon from "../../../../../asset/i4.png";
import remoteIcon from "../../../../../asset/i5.png";

const CustomStatusModal = ({ isOpen, onClose, onSave }) => {
  const [statusText, setStatusText] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [clearInput, setClearInput] = useState("Don't Clear");
  const [notification, setNotification] = useState("Off");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSave = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else {
      onSave(statusText, selectedIcon);
      onClose();
    }
  };

  const handleIconClick = (icon, label) => {
    setSelectedIcon({ icon, label });
    setStatusText(label);
    setCurrentPage(2);
  };

  const handleClearIcon = () => {
    setSelectedIcon(null);
    setStatusText("");
    setCurrentPage(1);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedIcon({ icon: emoji.emoji, label: statusText || "Custom Status" });
    setShowEmojiPicker(false);
  };

  if (!isOpen) return null;

  return (
    <div className="custom-status-modal-overlay">
      <div className="custom-status-modal">
        <div className="custom-status-modal-header">
          <h2>Set a Status</h2>
          <button className="custom-status-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {currentPage === 1 && (
          <div>
            <div className="custom-status-input">
              <span
                role="img"
                aria-label="Smiley"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {selectedIcon ? selectedIcon.icon : "😊"}
              </span>
              <input
                type="text"
                placeholder="Set custom status here, what's cooking?"
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
              />
            </div>
            {showEmojiPicker && (
              <div className="emoji-picker-container2">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
            <p className="workspace-name">For Workspace name</p>
            <ul className="preset-statuses">
              <li onClick={() => handleIconClick(calendarIcon, "In a meeting")}>
                <img src={calendarIcon} alt="In a meeting" /> In a meeting
              </li>
              <li onClick={() => handleIconClick(sickIcon, "Sick")}>
                <img src={sickIcon} alt="Sick" /> Sick
              </li>
              <li onClick={() => handleIconClick(commutingIcon, "Commuting")}>
                <img src={commutingIcon} alt="Commuting" /> Commuting
              </li>
              <li onClick={() => handleIconClick(vacationIcon, "On Vacation")}>
                <img src={vacationIcon} alt="On Vacation" /> On Vacation
              </li>
              <li onClick={() => handleIconClick(remoteIcon, "Remotely Working")}>
                <img src={remoteIcon} alt="Remotely Working" /> Remotely Working
              </li>
            </ul>
          </div>
        )}

        {currentPage === 2 && (
          <div className="status-icon-modal-body">
            <div className="input-container">
              <div className="input-icon-wrapper">
                <span className="input-icon" role="img" aria-label="Icon">
                  {selectedIcon?.icon ? (
                    selectedIcon.icon.startsWith("data:image/") ? (
                      <img src={selectedIcon.icon} alt={selectedIcon.label} />
                    ) : (
                      <span>{selectedIcon.icon}</span>
                    )
                  ) : (
                    "😊"
                  )}
                </span>
                <input
                  type="text"
                  placeholder="Set custom status"
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                />
                <button className="clear-icon-button" onClick={handleClearIcon}>
                  ×
                </button>
              </div>
            </div>

            <div className="clear-option">
              <label htmlFor="clear-input">Clear after:</label>
              <select
                id="clear-input"
                value={clearInput}
                onChange={(e) => setClearInput(e.target.value)}
              >
                <option>Don't Clear</option>
                <option>In 30 minutes</option>
                <option>In 1 hour</option>
                <option>In 4 hours</option>
                <option>Today</option>
                <option>This week</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="notification-option">
              <label htmlFor="notification">Notification:</label>
              <select
                id="notification"
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
              >
                <option>Off</option>
                <option>On</option>
              </select>
            </div>
          </div>
        )}

        <div className="custom-status-modal-footer">
          <button
            className="custom-status-cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="custom-status-save-button" onClick={handleSave}>
            {currentPage === 1 ? "Next" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomStatusModal;