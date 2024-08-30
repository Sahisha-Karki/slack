import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./GeneralModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faInfoCircle,
  faUsers,
  faCog,
  faSearch,
  faUserPlus,
  faTimesCircle,
  faLock,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "./AddMemberModal";
import { EditTopic, EditDescription, EditChannelName, EditChannelPrivacy, RemoveConfirmationModal, LeaveChannelModal, ArchiveChannelModal } from "./EditComponents";

const GeneralModal = ({ isOpen, onClose, channelName, description, isPrivate }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingChannelName, setIsEditingChannelName] = useState(false);
  const [isEditingChannelPrivacy, setIsEditingChannelPrivacy] = useState(false);
  const [isLeavingChannel, setIsLeavingChannel] = useState(false);
  const [isArchivingChannel, setIsArchivingChannel] = useState(false);
  const [isRemoveConfirmationOpen, setRemoveConfirmationOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [topic, setTopic] = useState("Add a topic");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (activeSection === "members") {
      const fetchMembers = async () => {
        try {
          const channelId = localStorage.getItem('selectedChannelId');
          const token = localStorage.getItem('token');
  
          if (!channelId || !token) {
            console.error("Channel ID or token is missing from local storage.");
            return;
          }
  
          const response = await axios.post(
            `http://localhost:5000/api/channels/${channelId}/members`, 
            {}, 
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
  
          if (response.data && response.data.members) {
            setMembers(response.data.members);
          } else {
            console.error("Invalid response format:", response.data);
          }
        } catch (error) {
          console.error("Failed to fetch channel members:", error);
        }
      };
  
      fetchMembers();
    }
  }, [activeSection]);
  

  if (!isOpen) return null;

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleOpenAddMemberModal = () => {
    setAddMemberModalOpen(true);
  };

  const handleCloseAddMemberModal = () => {
    setAddMemberModalOpen(false);
  };

  const handleSaveTopic = (newTopic) => {
    setTopic(newTopic);
  };

  const handleSaveDescription = (newDescription) => {
    // You might want to handle saving description via a callback or similar method here
    console.log("New description:", newDescription);
  };

  const handleSaveChannelName = (newChannelName) => {
    // Implement save logic for channel name
  };

  const handleSaveChannelPrivacy = (newPrivacy) => {
    // Implement save logic for channel privacy
  };

  const handleConfirmLeave = async () => {
    try {
      const channelId = localStorage.getItem('selectedChannelId');
      const token = localStorage.getItem('token');
  
      if (!channelId || !token) {
        console.error("Channel ID or token is missing from local storage.");
        return;
      }
  
      await axios.post(
        `http://localhost:5000/api/channels/${channelId}/leave`, 
        {}, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
  
      // Perform any additional actions after leaving the channel
      setIsLeavingChannel(false);
    } catch (error) {
      console.error("Failed to leave channel:", error);
    }
  };
  
  
  const handleConfirmArchive = () => {
    // Implement archive channel logic
    setIsArchivingChannel(false);
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const channelId = localStorage.getItem('selectedChannelId');
      const token = localStorage.getItem('token');
  
      if (!channelId || !token) {
        console.error("Channel ID or token is missing from local storage.");
        return;
      }
  
      await axios.delete(
        `http://localhost:5000/api/channels/${channelId}/remove-member`, 
        { 
          headers: { 'Authorization': `Bearer ${token}` },
          data: { userId: memberId }
        }
      );
  
      setMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberId));
    } catch (error) {
      console.error("Failed to remove member:", error);
    }
  };

  const handleOpenRemoveConfirmation = (member) => {
    setSelectedMember(member);
    setRemoveConfirmationOpen(true);
  };

  const handleCloseRemoveConfirmation = () => {
    setRemoveConfirmationOpen(false);
  };

  const handleMemberAdded = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };
  
  
  return (
    <>
      <div className="general-modal-overlay">
        <div className="general-modal-content">
          <div className="general-modal-top-nav">
            <div className="general-modal-title-container">
              <div className="general-modal-title">
                <p>
                  <FontAwesomeIcon icon={isPrivate ? faLock : faHashtag} />
                  {` ${channelName}`}
                </p>
              </div>
            </div>
            <div className="general-modal-buttons">
              <button
                className="direct-message-mute-modal"
                aria-label="mute conversation"
              >
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
                      <span className="general-channel-section-title">
                        Channel name
                      </span>
                      <button
                        className="general-channel-section-edit-button"
                        onClick={() => setIsEditingChannelName(true)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="general-channel-section-body">
                      {" "}
                      <FontAwesomeIcon
                        icon={isPrivate ? faLock : faHashtag}
                      />
                      {` ${channelName}`}
                    </div>
                  </div>
                  <div className="general-channel-section1">
                    <div className="general-channel-section-header">
                      <span className="general-channel-section-title">
                        Topic
                      </span>
                      <button
                        className="general-channel-section-edit-button"
                        onClick={() => setIsEditingTopic(true)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="general-channel-section-body">{topic}</div>
                  </div>
                  <div className="general-channel-section1">
                    <div className="general-channel-section-header">
                      <span className="general-channel-section-title">
                        Description
                      </span>
                      <button
                        className="general-channel-section-edit-button"
                        onClick={() => setIsEditingDescription(true)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="general-channel-section-body">
                      {description}
                    </div>
                  </div>
                  <div className="general-channel-section1">
                    <div className="general-channel-section-header">
                      <span className="general-channel-section-title">
                        Created by
                      </span>
                    </div>
                    <div className="general-channel-section-body">
                      Gaurav Dahal on July 30, 2024
                    </div>
                  </div>
                  <div className="general-channel-section">
                    <button
                      className="general-leave-channel-button"
                      onClick={() => setIsLeavingChannel(true)}
                    >
                      Leave channel
                    </button>
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
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="general-content-section-search-icon"
                    />
                    <input
                      type="text"
                      placeholder="Find a member"
                      className="general-content-section-search-input"
                    />
                  </div>
                  <div className="general-content-section-add-member-section">
                    <button
                      className="general-content-section-add-member-button"
                      onClick={handleOpenAddMemberModal}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="general-content-section-add-member-icon"
                      />
                      Add Member
                    </button>
                  </div>
                  <div className="general-content-section-members-list">
                  {members.map((member) => (
                    <div key={member._id} className="general-content-section-member-item">
                      <span className="general-content-section-member-name">
                        {member.email}
                      </span>
                      <button
                        className="general-content-section-remove-member-button"
                        onClick={() => handleOpenRemoveConfirmation(member)}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} /> Remove
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
                      <h3 className="general-channel-section-title">
                        Channel Name
                      </h3>
                      <button
                        className="general-channel-section-edit-button"
                        onClick={() => setIsEditingChannelName(true)}
                      >
                        Edit
                      </button>
                    </div>
                    <p className="general-channel-section-body"># general</p>
                  </div>
                  <div className="general-channel-section">
                    <div className="general-channel-section-header">
                      <h3 className="general-channel-section-title">Huddles</h3>
                    </div>
                    <p className="general-channel-section-body">
                      Members can start and join huddles in this channel.
                    </p>
                  </div>
                  <div className="general-channel-section">
                    <div className="general-channel-section-header">
                      <h3 className="general-channel-section-title">
                        Change to a private channel
                      </h3>
                      <button
                        className="general-channel-section-edit-button"
                        onClick={() => setIsEditingChannelPrivacy(true)}
                      >
                        Edit
                      </button>
                    </div>
                    <p className="general-channel-section-body">
                      Only specific people only
                    </p>
                  </div>
                  <div className="general-channel-section">
                    <button
                      className="general-edit-button"
                      onClick={() => setIsArchivingChannel(true)}
                    >
                      Archive channel for everyone
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isEditingTopic && (
        <EditTopic
          initialTopic={topic}
          onSave={handleSaveTopic}
          onClose={() => setIsEditingTopic(false)}
        />
      )}
      {isEditingDescription && (
        <EditDescription
          initialDescription={description}
          onSave={handleSaveDescription}
          onClose={() => setIsEditingDescription(false)}
        />
      )}
      {isEditingChannelName && (
        <EditChannelName
          initialChannelName={channelName}
          onSave={handleSaveChannelName}
          onClose={() => setIsEditingChannelName(false)}
        />
      )}
      {isEditingChannelPrivacy && (
        <EditChannelPrivacy
          isPrivate={isPrivate}
          onSave={handleSaveChannelPrivacy}
          onClose={() => setIsEditingChannelPrivacy(false)}
        />
      )}
      <AddMemberModal
  isOpen={isAddMemberModalOpen}
  onClose={handleCloseAddMemberModal}
  channelName={channelName}
  isPrivate={isPrivate}
  onMemberAdded={handleMemberAdded}
/>
<LeaveChannelModal
  isOpen={isLeavingChannel}
  onClose={() => setIsLeavingChannel(false)}
  onConfirm={handleConfirmLeave}
/>

      <ArchiveChannelModal
        isOpen={isArchivingChannel}
        onClose={() => setIsArchivingChannel(false)}
        onConfirm={handleConfirmArchive}
      />
        <RemoveConfirmationModal
        isOpen={isRemoveConfirmationOpen}
        onConfirm={handleRemoveMember}
        onClose={handleCloseRemoveConfirmation}
        memberName={selectedMember?.email || ""}
      />
    </>
  );
};

export default GeneralModal;
