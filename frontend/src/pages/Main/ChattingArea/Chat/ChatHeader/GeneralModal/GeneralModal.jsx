import React, { useState } from "react";
import "./GeneralModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle, faUsers, faCog, faSearch, faUserPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const GeneralModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("about");

  // Array of dummy members
  const members = [
    { name: "You", id: "you1234" },
    { name: "John Doe", id: "johndoe1234" },
    { name: "John Doe", id: "johndoe1234" },
    { name: "John Doe", id: "johndoe1234" },
    { name: "John Doe", id: "johndoe1234" },
  ];

  if (!isOpen) return null;

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="general-modal-overlay">
      <div className="general-modal-content">
        <div className="general-modal-top-nav">
          <div className="general-modal-title-container">
            <div className="general-modal-title">
              <p># general</p>
            </div>
          </div>
          <div className="general-modal-buttons">
            <button className="direct-message-mute-modal" aria-label="mute conversation">
              <img src="./images/ci_bell.png" alt="Bell" />
              <span>Mute</span>
            </button>
            <button className="direct-message-dropdown-toggle">
              <img src="./images/ci_outline.png" alt="outline" />
            </button>
            <button
              className="general-modal-close-modal"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className="general-modal-body">
          <nav className="general-modal-nav">
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
          </nav>
          <div className="general-modal-content">
            {activeSection === "about" && (
              <div className="general-content-section">
                <div className="general-channel-section">
                  <div className="general-channel-section-header">
                    <span className="general-channel-section-title">Channel name</span>
                    <button className="general-channel-section-edit-button">Edit</button>
                  </div>
                  <div className="general-channel-section-body"># general</div>
                </div>
                <div className="general-channel-section1">
                  <div className="general-channel-section-header">
                    <span className="general-channel-section-title">Topic</span>
                    <button className="general-channel-section-edit-button">Edit</button>
                  </div>
                  <div className="general-channel-section-body">Add a topic</div>
                </div>
                <div className="general-channel-section1">
                  <div className="general-channel-section-header">
                    <span className="general-channel-section-title">Description</span>
                    <button className="general-channel-section-edit-button">Edit</button>
                  </div>
                  <div className="general-channel-section-body">Add a description</div>
                </div>
                <div className="general-channel-section1">
                  <div className="general-channel-section-header">
                    <span className="general-channel-section-title">Created by</span>
                  </div>
                  <div className="general-channel-section-body">Gaurav Dahal on July 30, 2024</div>
                </div>
                <div className="general-channel-section">
                  <button className="general-leave-channel-button">Leave channel</button>
                </div>
                <div className="general-channel-section">
                  <p style={{ fontWeight: 600 }}>Files</p>
                  <p>There aren’t any files to see right now.</p>
                </div>
              </div>
            )}
            {activeSection === "members" && (
              <div className="general-content-section">
                <div className="general-content-section-search-bar">
                  <FontAwesomeIcon icon={faSearch} className="general-content-section-search-icon" />
                  <input
                    type="text"
                    placeholder="Find a member"
                    className="general-content-section-search-input"
                  />
                </div>
                <div className="general-content-section-add-member-section">
                  <button className="general-content-section-add-member-button">
                    <FontAwesomeIcon icon={faUserPlus} className="general-content-section-add-member-icon" />
                    Add Member
                  </button>
                </div>
                <div className="general-content-section-members-list">
                  {members.map((member, index) => (
                    <div key={index} className="general-content-section-member-item">
                      <span className="general-content-section-member-name">{member.name}</span>
                      <span className="general-content-section-member-id">{member.id}</span>
                      <button className="general-content-section-remove-member-button">
                        <FontAwesomeIcon icon={faTimesCircle} />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeSection === "settings" && (
              <div className="general-content-section">
                <div className="general-channel-section">
                  <div className="general-channel-section-header">
                    <h3 className="general-channel-section-title">Channel Name</h3>
                    <button className="general-channel-section-edit-button">Edit</button>
                  </div>
                  <p className="general-channel-section-body"># general</p>
                </div>
                <div className="general-channel-section">
                  <div className="general-channel-section-header">
                    <h3 className="general-channel-section-title">Huddles</h3>
                  </div>
                  <p className="general-channel-section-body">Members can start and join huddles in this channel.</p>
                </div>
                <div className="general-channel-section">
                  <div className="general-channel-section-header">
                    <h3 className="general-channel-section-title">Change to a private channel</h3>
                    <button className="general-channel-section-edit-button">Edit</button>
                  </div>
                  <p className="general-channel-section-body">Only specific people only</p>
                </div>
                <div className="general-channel-section">
                  <button className="general-edit-button">Archive channel for everyone</button>
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
