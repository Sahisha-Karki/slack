import React from 'react';
import './SideNav.css';
import CompanyHeading from './Company/Company';
import NavItems from './NavbarItem/NavItem';
import DirectMessages from './DirectMessage/DirectMessages';
import ChannelSection from './Channels/ChannelSection';

const SideNav = ({ onNavItemSelect, onChannelSelect, onSelectUser }) => {
  const handleNavItemClick = (page) => {
    onNavItemSelect(page);
  };

  const handleChannelSelect = (channel) => {
    onChannelSelect(channel);
  };

  return (
    <div className="side-nav">
      <CompanyHeading />
      <NavItems onNavItemClick={handleNavItemClick} />
      <ChannelSection onChannelSelect={handleChannelSelect} />
      <DirectMessages onSelectUser={onSelectUser} />
    </div>
  );
};

export default SideNav;
