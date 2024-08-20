import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import ChannelModal from './ChannelModal';
import LeaveChannelModal from './Context/LeaveChannelModal/LeaveChannelModal'; 
import ContextMenu from './Context/ContextMenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faLock, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import './Channel.css';

const ChannelSection = ({ onChannelSelect }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLeaveChannelModalOpen, setLeaveChannelModalOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, channel: null });
  const [isChannelListVisible, setChannelListVisible] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef(null);
  const addChannelButtonRef = useRef(null);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found.');

        const response = await axios.get('http://localhost:5000/api/workspaces/channels', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      const buttonRect = addChannelButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX
      });
    }
    setDropdownOpen(prev => !prev);
  };

  const toggleChannelList = () => {
    setChannelListVisible(prev => !prev);
  };

  const openModal = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddChannel = (channel) => {
    setChannels(prevChannels => [...prevChannels, channel]);
    onChannelSelect(channel);
  };

  const handleContextMenu = (event, channel) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      channel
    });
  };

  const openLeaveChannelModal = () => {
    setLeaveChannelModalOpen(true);
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  const closeLeaveChannelModal = () => {
    setLeaveChannelModalOpen(false);
  };

  const handleLeaveChannel = () => {
    closeLeaveChannelModal();
    // Additional logic for leaving the channel can be added here
  };

  return (
    <div className="channels">
      <div className="channel-header">
        <button className="toggle-channel-list" onClick={toggleChannelList}>
          <FontAwesomeIcon icon={faCaretDown} className={`toggle-icon ${isChannelListVisible ? '' : 'rotated'}`} />
        </button>
        <h3>Channels</h3>
      </div>

      {isChannelListVisible && (
        <>
          <ul className="channel-list">
            {channels.map((channel) => (
              <li 
              key={channel._id} 
              className="channel-item" 
              onClick={() => onChannelSelect(channel)}
              onContextMenu={(event) => handleContextMenu(event, channel)}
            >
              <FontAwesomeIcon icon={channel.visibility === "private" ? faLock : faHashtag} className="channel-icon" />
              <span>{channel.name}</span>
            </li>
            ))}
          </ul>
          <button 
            className="add-channel" 
            onClick={toggleDropdown} 
            ref={addChannelButtonRef}
          >
            <img src="./images/add.png" alt="Add channels" /> Add Channels
          </button>
        </>
      )}

      {isDropdownOpen && (
        <div className="dropdown" ref={dropdownRef} style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
          <ul>
            <li onClick={openModal}>Create a New Channel</li>
            <li>Browse Channels</li>
          </ul>
        </div>
      )}

      {isModalOpen && <ChannelModal closeModal={closeModal} addChannel={handleAddChannel} />}

      {contextMenu.visible && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          channel={contextMenu.channel} 
          onClose={() => setContextMenu(prev => ({ ...prev, visible: false }))}
          ref={contextMenuRef}
        />
      )}

      {isLeaveChannelModalOpen && (
        <LeaveChannelModal
          channelName={contextMenu.channel?.name}
          channelType={contextMenu.channel?.type}
          isOpen={isLeaveChannelModalOpen}
          onClose={closeLeaveChannelModal}
          onLeave={handleLeaveChannel}
        />
      )}
    </div>
  );
};

export default ChannelSection;
