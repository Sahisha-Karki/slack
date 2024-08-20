import React, { useState } from "react";
import "./CustomStatusModal.css";

import calendarIcon from "../../../../../asset/i1.png";
import sickIcon from "../../../../../asset/i2.png";
import commutingIcon from "../../../../../asset/i3.png";
import vacationIcon from "../../../../../asset/i4.png";
import remoteIcon from "../../../../../asset/i5.png";

const CustomStatusModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState("");
  const [isIconSelection, setIsIconSelection] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState("😊");
  const [iconLabel, setIconLabel] = useState("Smiley");
  const [statusText, setStatusText] = useState(status);
  const [clearInput, setClearInput] = useState("Don’t Clear");
  const [notification, setNotification] = useState("Off");

  const handleSave = () => {
    console.log("Custom status:", status);
    onClose();
  };

  const handleIconClick = (icon, label) => {
    setSelectedIcon(icon);
    setIconLabel(label);
    setIsIconSelection(false);
  };

  const handleIconModalSave = () => {
    console.log("Icon modal status:", statusText);
    console.log("Clear option:", clearInput);
    console.log("Notification:", notification);
    setStatus(statusText);
    setIsIconSelection(true);
  };

  if (!isOpen) return null;

  return (
    <div className="custom-status-modal-overlay">
      <div className="custom-status-modal">
        <div className="custom-status-modal-header">
          <h2>{isIconSelection ? "Set a Status" : "Edit Status"}</h2>
          <button className="custom-status-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        {isIconSelection ? (
          <div>
            <div className="custom-status-input">
              <span role="img" aria-label={iconLabel}>
                <img src="./images/smiley.png" alt="Smiley" />
              </span>
              <input
                type="text"
                placeholder={`Set custom status here, what’s cooking?`}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
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
              <li
                onClick={() => handleIconClick(remoteIcon, "Remotely Working")}
              >
                <img src={remoteIcon} alt="Remotely Working" /> Remotely working
              </li>
            </ul>
          </div>
        ) : (
          <div className="status-icon-modal-body">
            <div className="input-container">
              <div className="input-icon-wrapper">
                <span className="input-icon" role="img" aria-label="Icon">
                  <img src={selectedIcon} alt="Icon" />
                </span>

                <input
                  type="text"
                  placeholder="Set custom status"
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                />
              </div>
            </div>

            <div className="clear-option">
              <label htmlFor="clear-input">Clear:</label>
              <select
                id="clear-input"
                value={clearInput}
                onChange={(e) => setClearInput(e.target.value)}
              >
                <option>Don’t Clear</option>
                <option>Clear</option>
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
          {isIconSelection ? (
            <>
              <button className="custom-status-cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button
                className="custom-status-save-button"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                className="status-icon-cancel-button"
                onClick={() => setIsIconSelection(true)}
              >
                Back
              </button>
              <button
                className="status-icon-save-button"
                onClick={handleIconModalSave}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomStatusModal;
