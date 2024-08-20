import React, { useState, useEffect } from 'react';
import TopNav from '../Main/Navbars/TopNavbar/TopNav';
import VerticalNav from '../Main/Navbars/VerticalNavbar/VerticalNav';
import SideNav from '../Main/Navbars/SideNavbar/SideNav';
import MainChat from '../Main/ChattingArea/MainChat';
import ThreadsPage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/ThreadPage/Thread';
import DirectMessagesPage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/DirectMessagePage/DirectMessagePage';
import MentionsReactionsPage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/MentionPage/Mention';
import DraftsPage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/DraftPage/Draft';
import FilesPage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/FilesPage/Files';
import MorePage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/MorePage/More';
import SearchResults from '../Main/Navbars/TopNavbar/Search/SearchResults';

import './Main.css';

const Main = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [lastSelected, setLastSelected] = useState(null);

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    // Load last selected item from localStorage on component mount
    const savedSelection = JSON.parse(localStorage.getItem('lastSelected'));
    if (savedSelection) {
      setLastSelected(savedSelection);
      if (savedSelection.type === 'channel') {
        setSelectedChannel(savedSelection.id);
      } else if (savedSelection.type === 'user') {
        setSelectedUser(savedSelection.id);
      } else if (savedSelection.type === 'page') {
        setSelectedPage(savedSelection.id);
      }
    }
  }, []);

  useEffect(() => {
    // Save last selected item to localStorage whenever it changes
    if (lastSelected) {
      localStorage.setItem('lastSelected', JSON.stringify(lastSelected));
    }
  }, [lastSelected]);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setSelectedPage(null);
    setSelectedUser(null);
    setSearchQuery('');
    setLastSelected({ type: 'channel', id: channel });
  };

  const handleNavItemSelect = (page) => {
    setSelectedPage(page);
    setSelectedChannel(null);
    setSelectedUser(null);
    setSearchQuery('');
    setLastSelected({ type: 'page', id: page });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedChannel(null);
    setSelectedPage(null);
    setSelectedUser(null);
    setLastSelected(null); // Clear last selected when searching
  };

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    setSelectedChannel(null);
    setSelectedPage(null);
    setSearchQuery('');
    setLastSelected({ type: 'user', id: userId });
  };

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  const handleProfileVisibility = (visible) => {
    setIsProfileVisible(visible);
  };

  const getPageComponent = () => {
    if (searchQuery) {
      return <SearchResults query={searchQuery} />;
    }

    if (selectedChannel) {
      return <MainChat channel={selectedChannel} showProfile={showProfile} />;
    }

    if (selectedUser) {
      return <MainChat userId={selectedUser} showProfile={showProfile} />;
    }

    if (lastSelected) {
      switch (lastSelected.type) {
        case 'channel':
          return <MainChat channel={lastSelected.id} showProfile={showProfile} />;
        case 'user':
          return <MainChat userId={lastSelected.id} showProfile={showProfile} />;
        case 'page':
          switch (lastSelected.id) {
            case 'threads':
              return <ThreadsPage />;
            case 'direct-messages':
              return <DirectMessagesPage onSelectUser={handleSelectUser} />;
            case 'mentions-reactions':
              return <MentionsReactionsPage />;
            case 'drafts':
              return <DraftsPage />;
            case 'files':
              return <FilesPage />;
            case 'more':
              return <MorePage />;
            default:
              return <div className="default-message">Invalid page.</div>;
          }
        default:
          return <div className="default-message">Welcome back! Please select a page or channel.</div>;
      }
    }

    switch (selectedPage) {
      case 'threads':
        return <ThreadsPage />;
      case 'direct-messages':
        return <DirectMessagesPage onSelectUser={handleSelectUser} />;
      case 'mentions-reactions':
        return <MentionsReactionsPage />;
      case 'drafts':
        return <DraftsPage />;
      case 'files':
        return <FilesPage />;
      case 'more':
        return <MorePage />;
      default:
        return <div className="default-message">Welcome back! Please select a page or channel.</div>;
    }
  };

  return (
    <div className="main-container">
      <TopNav showContent={true} onSearch={handleSearch} onProfileToggle={handleProfileVisibility} />
      <div className="main-body">
        <VerticalNav showContent={true} />
        {!searchQuery && (
          <SideNav onNavItemSelect={handleNavItemSelect} onChannelSelect={handleChannelSelect} onSelectUser={handleSelectUser} />
        )}
        <div className={`main-chat-container ${showProfile ? 'profile-active' : ''}`}>
          {getPageComponent()}
        </div>
      </div>
    </div>
  );
};

export default Main;
