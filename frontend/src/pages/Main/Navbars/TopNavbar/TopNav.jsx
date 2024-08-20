import React, { useState } from "react";
import "./TopNav.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProfileModal from "../../../../components/Profile/SelfProfile/ProfileModal";
import CustomStatusModal from "./Modals/CustomStatusModal";
import SettingsModal from "../../../../components/Setting/SettingModal"; // Import the SettingsModal component

const TopNav = ({ showContent, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCustomStatusModalOpen, setIsCustomStatusModalOpen] = useState(false);
  const [isPauseNotificationSubdropdownOpen, setIsPauseNotificationSubdropdownOpen] = useState(false);
  const [isSetYourselfSubdropdownOpen, setIsSetYourselfSubdropdownOpen] = useState(false);

  // Add state for SettingsModal
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const openCustomStatusModal = () => {
    setIsCustomStatusModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeCustomStatusModal = () => {
    setIsCustomStatusModalOpen(false);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const togglePauseNotificationSubdropdown = () => {
    setIsPauseNotificationSubdropdownOpen(!isPauseNotificationSubdropdownOpen);
  };

  const toggleSetYourselfSubdropdown = () => {
    setIsSetYourselfSubdropdownOpen(!isSetYourselfSubdropdownOpen);
  };

  return (
    <div className="top-nav-header">
      {showContent && (
        <div className="top-nav-header-content">
          <div className="top-nav-header-logo">
            <a href="/main">
              <img src="/images/slack.svg.png" alt="Slack Logo" />
            </a>
          </div>
          <div className="top-nav-header-buttons">
            <button>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="top-nav-header-search">
            <div className="top-nav-search-container">
              <i
                className="fas fa-search top-nav-search-icon"
                onClick={handleSearchSubmit}
              ></i>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search ..."
              />
            </div>
          </div>

          <div className="top-nav-header-actions">
            <button>
              <img src="./images/btn1.png" alt="history" />
            </button>
            <button>
              <img src="./images/btn2.png" alt="download" />
            </button>
            <button>
              <img src="./images/btn3.png" alt="query" />
            </button>
            <button onClick={openSettingsModal}> {/* Open SettingsModal on click */}
              <img src="./images/btn4.png" alt="settings" />
            </button>
            <div className="top-nav-profile">
              <img
                className="top-nav-profile-pic"
                src="/images/profile.png"
                alt="Profile"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="top-nav-profile-dropdown">
                  <div className="top-nav-dropdown-header">
                    <img src="/images/profile.png" alt="Profile" />
                    <div className="user-info">
                      <span className="user-name">John Doe</span>
                      <span className="user-status">Active</span>
                    </div>
                  </div>
                  <button
                    className="custom-status-button"
                    onClick={openCustomStatusModal}
                  >
                    <span role="img" aria-label="Smiley">
                      <img src="./images/smiley.png" alt="Smiley" />
                    </span>{" "}
                    Set a custom status
                  </button>
                  <ul>
                    <li>
                      <button
                        className="custom-dropdown-item"
                        onClick={toggleSetYourselfSubdropdown}
                      >
                        <span>Set yourself as</span>
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                      {isSetYourselfSubdropdownOpen && (
                        <div className="set-yourself-subdropdown">
                          <button>Online 
                            <img src="./images/online.png" alt="" id="online" />
                          </button>
                          <button>Away 
                            <img src="./images/away.png" alt="" />
                          </button>
                          <button>Invisible 
                            <img src="./images/invisible.png" alt="" />
                          </button>
                        </div>
                      )}
                    </li>
                    <li>
                      <button
                        className="custom-dropdown-item"
                        onClick={togglePauseNotificationSubdropdown}
                      >
                        <span>Pause notifications</span>
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                      {isPauseNotificationSubdropdownOpen && (
                        <div className="pause-notifications-subdropdown">
                          <p>Pause notifications...</p>
                          <button>For 30 minutes</button>
                          <button>For 1 hour</button>
                          <button>For 2 hours</button>
                          <button>Until Tomorrow</button>
                          <button>Until next week</button>
                          <button>Custom</button>
                          <button>Set a notification schedule</button>
                        </div>
                      )}
                    </li>
                    <li>
                      <button
                        className="custom-dropdown-item"
                        onClick={openProfileModal}
                      >
                        <span>Profile</span>
                        <i className="fas fa-user"></i>
                      </button>
                    </li>
                    <li>
                      <button className="custom-dropdown-item">
                        <span>Settings</span>
                        <i className="fas fa-cog"></i>
                      </button>
                    </li>
                    <li className="signout-item">
                      <button className="custom-dropdown-item">
                        <span>Sign out</span>
                        <i className="fas fa-sign-out-alt"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
      <CustomStatusModal
        isOpen={isCustomStatusModalOpen}
        onClose={closeCustomStatusModal}
      />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} /> {/* Add SettingsModal here */}
    </div>
  );
};

export default TopNav;
