import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
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
import MessagePage from '../Main/Navbars/SideNavbar/NavbarItem/NavItemPages/Message/Message';
import SearchResults from '../Main/Navbars/TopNavbar/Search/SearchResults';
import BrowseChannels from '../Main/Navbars/SideNavbar/Channels/Context/BrowseChannels/BrowseChannels';
import NoInternetPage from '../../components/Others/NoInternetPage'; // Import the NoInternetPage component
import './Main.css';

const Main = () => {
  const location = useLocation();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [lastSelected, setLastSelected] = useState(null);
  const [workspace, setWorkspace] = useState(location.state?.workspace || null);
  const [loading, setLoading] = useState(!workspace);
  const [error, setError] = useState(null);
  const [showBrowseChannels, setShowBrowseChannels] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // State to track internet connectivity
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspace');

  useEffect(() => {
    // Monitor internet connection status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/workspaces/launch-workspace/${workspaceId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setWorkspace(response.data.workspace);
      } catch (error) {
        setError(error.message || 'Failed to fetch workspace');
      } finally {
        setLoading(false);
      }
    };

    if (!workspace) {
      fetchWorkspaceData();
    } else {
      setLoading(false);
    }
  }, [workspaceId, workspace]);

  useEffect(() => {
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
    setShowBrowseChannels(false);
  };

  const handleNavItemSelect = (page) => {
    setSelectedPage(page);
    setSelectedChannel(null);
    setSelectedUser(null);
    setSearchQuery('');
    setLastSelected({ type: 'page', id: page });
    setShowBrowseChannels(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedChannel(null);
    setSelectedPage(null);
    setSelectedUser(null);
    setLastSelected(null);
    setShowBrowseChannels(false);
  };

  const handleSelectUser = useCallback((userId, userEmail) => {
    setSelectedUser(userId);
    setSelectedUserEmail(userEmail);
    setSelectedChannel(null);
    setSelectedPage(null);
    setSearchQuery('');
    setLastSelected({ type: 'user', id: userId });
    setShowBrowseChannels(false);
  }, []);

  const toggleProfile = useCallback(() => {
    setShowProfile(prev => !prev);
  }, []);

  const toggleBrowseChannels = useCallback(() => {
    setShowBrowseChannels(prev => !prev);
    setSelectedChannel(null);
    setSelectedPage(null);
    setSelectedUser(null);
    setSearchQuery('');
    setLastSelected(null);
  }, []);

  const renderPageComponent = () => {
    if (showBrowseChannels) {
      return <BrowseChannels onBrowseChannels={toggleBrowseChannels} />;
    }

    if (searchQuery) {
      return <SearchResults query={searchQuery} />;
    }

    if (selectedChannel) {
      return <MainChat channel={selectedChannel} showProfile={showProfile} />;
    }

    if (selectedUser) {
      return <MainChat userId={selectedUser} userEmail={selectedUserEmail} showProfile={showProfile} />;
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
            case 'message':
              return <MessagePage />;
            default:
              return <MainChat showProfile={showProfile} />;
          }
        default:
          return <MainChat showProfile={showProfile} />;
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
      case 'message':
        return <MessagePage />;
      default:
        return <MainChat showProfile={showProfile} />;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render No Internet page if offline
  if (isOffline) return <NoInternetPage />;

  return (
    <div className="main-container">
      <TopNav showContent={true} onSearch={handleSearch} toggleProfile={toggleProfile} />
      <div className="main-body">
        <VerticalNav showContent={true} />
        {!searchQuery && workspace && !showBrowseChannels && (
          <SideNav
            onNavItemSelect={handleNavItemSelect}
            onChannelSelect={handleChannelSelect}
            onSelectUser={handleSelectUser}
            workspaceName={workspace.name}
            workspaceCreatorEmail={workspace.createdBy?.email}
            onBrowseChannels={toggleBrowseChannels}
          />
        )}
        <div className={`main-chat-container ${showProfile ? 'profile-active' : ''}`}>
          {renderPageComponent()}
        </div>
      </div>
    </div>
  );
};

export default Main;
