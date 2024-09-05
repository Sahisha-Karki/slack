import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./TopNav.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CustomStatusModal from "./Modals/CustomStatusModal";
import SettingsModal from "../../../../components/Setting/SettingModal";
import DownloadModal from './Modals/DownloadModal';
import HistoryModal from './Modals/HistoryModal';
import ProfileModal from "../../../../components/Profile/SelfProfile/ProfileModal";
import SignOutConfirmationModal from '../../../Main/Navbars/SideNavbar/Company/SignOutConfirmationModal'; 

const TopNav = ({ showContent, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomStatusModalOpen, setIsCustomStatusModalOpen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userStatus, setUserStatus] = useState('online');
  const [files, setFiles] = useState([
    { name: 'Proposal for Application.docx', icon: '/path/to/word-icon.png' },
    { name: 'Employee List.xlsx', icon: '/path/to/excel-icon.png' },
    { name: 'Awsdawd.docx', icon: '/path/to/word-icon.png' },
    { name: 'awdawwdaw.docx', icon: '/path/to/word-icon.png' },
  ]);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: localStorage.getItem('email') || "",
    profilePictureUrl: localStorage.getItem('profilePictureUrl') || "",
    username: localStorage.getItem('username') || "",
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    const profilePictureUrl = localStorage.getItem('profilePictureUrl');
    const username = localStorage.getItem('username');

    setUser({
      email: email || "",
      profilePictureUrl: profilePictureUrl || "",
      username: username || email?.split('@')[0] || "User",
    });
  }, []);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSearchSubmit = () => onSearch(searchQuery);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    setOpenDropdown(prev => prev ? null : 'main');
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openCustomStatusModal = () => {
    setIsCustomStatusModalOpen(true);
    setIsDropdownOpen(false);
    setOpenDropdown(null);
  };

  const closeCustomStatusModal = () => setIsCustomStatusModalOpen(false);

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsDropdownOpen(false);
    setOpenDropdown(null);
  };

  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  const togglePauseNotificationSubdropdown = () => setOpenDropdown(prev => prev === 'pause' ? null : 'pause');

  const toggleSetYourselfSubdropdown = () => setOpenDropdown(prev => prev === 'setYourself' ? null : 'setYourself');

  const handleStatusChange = (status) => {
    setUserStatus(status);
    setOpenDropdown(null);
    setIsDropdownOpen(false);
  };

  const handleVisitFolder = (file) => console.log('Visiting folder of', file.name);

  const handleRemove = (fileToRemove) => setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));

  const handleClearAll = () => setFiles([]);

  const statusIconMap = {
    online: "./images/online.png",
    away: "./images/away.png",
    invisible: "./images/invisible.png"
  };

  const statusLabelMap = {
    online: "Active",
    away: "Away",
    invisible: "Invisible"
  };

  const handleCustomStatusSave = (status) => {
    setUserStatus(status);
    closeCustomStatusModal();
  };

  const handleSignOut = () => {
    setIsSignOutModalOpen(true);
    setIsDropdownOpen(false);
  };

  const confirmSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const cancelSignOut = () => setIsSignOutModalOpen(false);

  const getInitial = (email) => email ? email.split('@')[0].charAt(0).toUpperCase() : "?";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="top-nav-header">
      {showContent && (
        <div className="top-nav-header-content">
          <div className="top-nav-header-logo">
            <a href="/main">
              <img src="/images/slack.svg.png" alt="Slack Logo" />
            </a>
            <label>Slack</label>
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
            <button onClick={() => setShowHistoryModal(true)}>
              <img src="./images/btn1.png" alt="history" />
            </button>
            <button onClick={() => setShowDownloadModal(true)}>
              <img src="./images/btn2.png" alt="download" />
            </button>
            <button>
              <img src="./images/btn3.png" alt="query" />
            </button>
            <button onClick={openSettingsModal}>
              <img src="./images/btn4.png" alt="settings" />
            </button>
            <div className="top-nav-profile">
              <div className="profile-pic-container" onClick={toggleDropdown}>
                {user.profilePictureUrl ? (
                  <img
                    className="top-nav-profile-pic"
                    src={user.profilePictureUrl}
                    alt="Profile"
                  />
                ) : (
                  <div className="top-nav-profile-initial">
                    {getInitial(user.username)}
                  </div>
                )}
                <div className={`status-indicator ${userStatus}`}></div>
              </div>
              {isDropdownOpen && (
                <div className="top-nav-profile-dropdown">
                  <div className="top-nav-dropdown-header">
                    {user.profilePictureUrl ? (
                      <img
                        src={user.profilePictureUrl}
                        alt="Profile"
                      />
                    ) : (
                      <div className="top-nav-profile-initial">
                        {getInitial(user.username)}
                      </div>
                    )}
                    <div className="user-info">
                      <span className="user-name">{user.username || "User"}</span>
                      <span className="user-status">
                        {statusLabelMap[userStatus]}
                      </span>
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
                      {openDropdown === 'setYourself' && (
                        <div className="set-yourself-subdropdown">
                          <button onClick={() => handleStatusChange('online')}>
                            Online
                            <img src="./images/online.png" alt="" id="online" />
                          </button>
                          <button onClick={() => handleStatusChange('away')}>
                            Away
                            <img src="./images/away.png" alt="" />
                          </button>
                          <button onClick={() => handleStatusChange('invisible')}>
                            Invisible
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
                      {openDropdown === 'pause' && (
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
                    <button className="custom-dropdown-item" onClick={openProfileModal}>
                        <span>Profile</span>
                        <i className="fas fa-user"></i>
                      </button>
                    </li>
                    <li>
                      <button className="custom-dropdown-item" onClick={openSettingsModal}>
                        <span>Settings</span>
                        <i className="fas fa-cog"></i>
                      </button>
                    </li>
                    <li className="signout-item">
                      <button className="custom-dropdown-item" onClick={handleSignOut}>
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
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        email={user.email}
        profilePictureUrl={user.profilePictureUrl}
        username={user.username}
      />
      <CustomStatusModal
        isOpen={isCustomStatusModalOpen}
        onClose={closeCustomStatusModal}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettingsModal}
      />
      {showDownloadModal && (
        <DownloadModal
          files={files}
          onClose={() => setShowDownloadModal(false)}
          onVisitFolder={handleVisitFolder}
          onRemove={handleRemove}
          onClearAll={handleClearAll}
        />
      )}
      {showHistoryModal && (
        <HistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
      {isSignOutModalOpen && (
        <SignOutConfirmationModal
          isOpen={isSignOutModalOpen}
          onClose={cancelSignOut}
          onConfirm={confirmSignOut}
        />
      )}
    </div>
  );
};

export default TopNav;