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

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMoon} from '@fortawesome/free-solid-svg-icons'; // Replace these with suitable icons if necessary
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';

const authAxios = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const TopNav = ({ showContent, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomStatusModalOpen, setIsCustomStatusModalOpen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false); 
  const [isSetYourselfSubdropdownOpen, setIsSetYourselfSubdropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userStatus, setUserStatus] = useState(localStorage.getItem('profileStatus') || 'online');  // Default to 'online' or stored status
  const [files, setFiles] = useState([
    { name: 'Proposal for Application.docx', icon: '/path/to/word-icon.png' },
    { name: 'Employee List.xlsx', icon: '/path/to/excel-icon.png' },
    { name: 'Awsdawd.docx', icon: '/path/to/word-icon.png' },
    { name: 'awdawwdaw.docx', icon: '/path/to/word-icon.png' },
  ]);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    profilePicture: '',
    fullname: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authAxios.get('users/get-profile');
        const userData = response.data;

        setUser({
          email: userData.email,
          fullname: userData.fullName,
          profilePicture: userData.profilePicture || null
        });

        const savedStatus = localStorage.getItem('profileStatus');
        setUserStatus(savedStatus || 'invisible');
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        alert('Failed to fetch user data. ' + (error.response?.data?.message || error.message));
      }
    };

    const fetchUserStatus = async () => {
      try {
        const response = await authAxios.get('/users/profile-status');
        const status = response.data.profileStatus || 'invisible';
        
        setUserStatus(status);
        localStorage.setItem('profileStatus', status);
      } catch (error) {
        console.error('Error fetching user status:', error.response?.data || error.message);
        setUserStatus('invisible');
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
      fetchUserStatus();
    } else {
      setUserStatus('invisible');
    }

    const handleOnline = () => {
      const savedStatus = localStorage.getItem('profileStatus');
      if (savedStatus === 'online') {
        setUserStatus('online');
      }
    };

    const handleOffline = () => {
      const savedStatus = localStorage.getItem('profileStatus');
      if (savedStatus === 'online') {
        setUserStatus('invisible');
        localStorage.setItem('profileStatus', 'invisible');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  const renderProfilePicture = () => {
    if (user.profilePicture) {
      const profileImageUrl = `http://localhost:5000${user.profilePicture}`;
      return (
        <img
          src={profileImageUrl}
          alt="Profile"
          className="profile-picture"
        />
      );
    } else {
      const emailInitial = user.email ? user.email.charAt(0).toUpperCase() : "?";
      return (
        <div className="profile-initial">
          {emailInitial}
        </div>
      );
    }
  };

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

  const handleStatusChange = async (status) => {
    try {
      await authAxios.post('/users/profile-status', { status });
      setUserStatus(status);
      localStorage.setItem('profileStatus', status);  // Update localStorage with the new status
      setIsSetYourselfSubdropdownOpen(false);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error updating status:', error.response?.data || error.message);
      alert('Failed to update status. ' + (error.response?.data?.message || error.message));
    }
  };
  const handleVisitFolder = (file) => console.log('Visiting folder of', file.name);

  const handleRemove = (fileToRemove) => setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));

  const handleClearAll = () => setFiles([]);

  // Map of status icons
  const statusIconMap = {
    Online: <FontAwesomeIcon icon={faCircle} style={{ color: 'green', width: '14px', height: '14px' }} />,
    Away: <FontAwesomeIcon icon={faMoon} style={{ color: 'orange', width: '14px', height: '14px' }} />,
    Invisible: <FontAwesomeIcon icon={faRegularCircle} style={{ color: 'white', width: '14px', height: '14px' }} /> 
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
    localStorage.removeItem('workspaceId');
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
              {renderProfilePicture()}
                <div className={`status-indicator`}>   {statusIconMap[userStatus]} </div>
              </div>
              {isDropdownOpen && (
                <div className="top-nav-profile-dropdown">
                  <div className="top-nav-dropdown-header">
                  {renderProfilePicture()}
                    <div className="user-info">
                      <span className="user-name">{user.fullname || "User"}</span>
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
                         <button onClick={() => handleStatusChange('Online')}>
                           Online
                          
                           <i className="fa-solid fa-circle" style={{ color: 'green', marginLeft: '8px' }}></i>
                         </button>
                         <button onClick={() => handleStatusChange('Away')}>
                           Away
                           <i className="fa-solid fa-moon" style={{ color: 'orange', marginLeft: '8px' }}></i>
                         </button>
                         <button onClick={() => handleStatusChange('Invisible')}>
                           Invisible
                           <i className="fa-regular fa-circle" style={{ color: 'white', marginLeft: '8px'}}></i>
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
        onSave={handleCustomStatusSave} // Pass the callback to update status
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