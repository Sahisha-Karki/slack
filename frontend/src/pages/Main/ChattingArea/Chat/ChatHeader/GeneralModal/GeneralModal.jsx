import React, { useState } from "react";
import "./GeneralModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faInfoCircle,
  faUsers,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const GeneralModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("about");

  if (!isOpen) return null;

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="general-modal-overlay">
      <div className="general-modal-content">
        <div className="modal-body">
          <nav className="modal-nav">
            <div className="general-modal-heading">
              <h2># general</h2>
              <button
                className="close-modal"
                onClick={onClose}
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="general-nav-content">
              <ul>
                <li onClick={() => handleSectionChange("about")}>
                  <FontAwesomeIcon icon={faInfoCircle} /> About
                </li>
                <li onClick={() => handleSectionChange("members")}>
                  <FontAwesomeIcon icon={faUsers} /> Members
                </li>
                <li onClick={() => handleSectionChange("settings")}>
                  <FontAwesomeIcon icon={faCog} /> Settings
                </li>
              </ul>
            </div>
          </nav>
          <div className="modal-content">
            {activeSection === "about" && (
              <div className="content-section">
                <div className="channel-content">
                  <div className="channel-section">
                    <div className="channel-section-header">
                      <span className="channel-section-title">
                        Channel name
                      </span>
                      <button className="channel-section-edit-button">
                        Edit
                      </button>
                    </div>
                    <div className="channel-section-body"># general</div>
                  </div>
                </div>
                <div className="channel-content">
                  <div className="channel-section">
                    <div className="channel-section-header">
                      <span className="channel-section-title">Topic</span>
                      <button className="channel-section-edit-button">Edit</button>
                    </div>
                    <div className="channel-section-body">Add a topic</div>
                  </div>
                </div>
                <div className="channel-content">
                  <div className="channel-section">
                    <div className="channel-section-header">
                      <span className="channel-section-title">Description</span>
                      <button className="channel-section-edit-button">Edit</button>
                    </div>
                    <div className="channel-section-body">Add a description</div>
                  </div>
                </div>
                <div className="channel-content">
                  <div className="channel-section">
                    <div className="channel-section-header">
                      <span className="channel-section-title">Created by</span>
                    </div>
                    <div className="channel-section-body">Gaurav Dahal on July 30, 2024</div>
                  </div>
                </div>
                <div className="channel-content">
                  <button className="leave-channel-button">Leave channel</button>
                </div>
              </div>
            )}

            {activeSection === "members" && (
              <div className="content-section">
                {/* Members section content */}
                <p>Content for Members will be added here.</p>
              </div>
            )}
            {activeSection === "settings" && (
              <div className="content-section">
                <div className="content-row">
                  <h3>Channel Name</h3>
                  <p># general</p>
                </div>
                <div className="content-row">
                  <h3>Huddles</h3>
                  <p>Members can start and join huddles in this channel.</p>
                </div>
                <div className="content-row">
                  <button className="edit-button">
                    Change to a private channel
                  </button>
                </div>
                <div className="content-row">
                  <h3>Permissions</h3>
                  <p>Only specific people only</p>
                </div>
                <div className="content-row">
                  <button className="edit-button">
                    Archive channel for everyone
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
