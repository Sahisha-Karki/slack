import React from 'react';
import './SideNav.css';
import CompanyHeading from './Company/Company';
import NavItems from './NavbarItem/NavItem';
import DirectMessages from './DirectMessage/DirectMessages';
import ChannelSection from './Channels/ChannelSection';

const SideNav = ({ onNavItemSelect, onChannelSelect, onSelectUser, workspaceName, workspaceCreatorEmail, onBrowseChannels }) => {
  const handleNavItemClick = (page) => {
    onNavItemSelect(page);
  };

  const handleChannelSelect = (channel) => {
    localStorage.setItem('selectedChannelId', channel._id); // Store channel ID in local storage
    onChannelSelect(channel);
  };

  return (
    <div className="side-nav">
      <CompanyHeading workspaceName={workspaceName} />
      <div className="creator-email">{workspaceCreatorEmail}</div> {/* Display the creator's email */}
      <NavItems onNavItemClick={handleNavItemClick} />
      <ChannelSection 
        onChannelSelect={handleChannelSelect} 
        onBrowseChannels={onBrowseChannels} 
      />
<DirectMessages onSelectUser={(userId, userEmail) => onSelectUser(userId, userEmail)} />
    </div>
  );
};

export default SideNav;
