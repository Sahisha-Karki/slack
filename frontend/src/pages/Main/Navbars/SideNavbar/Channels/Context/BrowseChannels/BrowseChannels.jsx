import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faLock } from '@fortawesome/free-solid-svg-icons';
import ChannelModal from '../../ChannelModal'; // Make sure to import ChannelModal
import './BrowseChannels.css';

const BrowseChannels = ({ onBrowseChannels }) => {
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const token = localStorage.getItem('token');
        const workspaceId = localStorage.getItem('workspaceId');

        if (!token || !workspaceId) throw new Error('No authentication token or workspace ID found.');

        const response = await axios.get(`http://localhost:5000/api/channels/workspace/${workspaceId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setChannels(response.data.channels);
        setFilteredChannels(response.data.channels);
      } catch (error) {
        setError("Failed to load channels.");
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChannels(filtered);
    } else {
      setFilteredChannels(channels);
    }
  }, [searchQuery, channels]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="browse-channels">
      <div className="browse-channels-header">
        <h1>All channels</h1>
        <div className="browse-channels-create-channel-btn">
          <button onClick={handleOpenModal}>Create channel</button>
        </div>
      </div>

      <div className="browse-channels-search-container">
        <FontAwesomeIcon icon={faSearch} className="browse-channels-search-icon" />
        <input
          type="text"
          placeholder="Search for channels"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="browse-channels-intro-section">
        <button className="browse-channels-close-btn" onClick={onBrowseChannels}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Organize your team's conversations</h2>
        <p>
          Channels are spaces for gathering all the right people, messages, files and tools. 
          Organize them by any project, group, initiative or topic of your choosing.
        </p>
        <button className="browse-channels-create-channel-btn" onClick={handleOpenModal}>Create a channel</button>
      </div>

      <div className="browse-channels-channel-list-header">
        <select><option>All channels</option></select>
        <select><option>Any channel type</option></select>
        <select><option>Organizations</option></select>
        <select><option>A to Z</option></select>
      </div>

      <ul className="browse-channels-channel-list">
        {filteredChannels.map((channel) => (
          <li key={channel._id} className="browse-channels-channel-item">
            <div className="browse-channels-channel-info">
              <span className="browse-channels-channel-name">
                {channel.isPrivate && <FontAwesomeIcon icon={faLock} />}
                {channel.name}
              </span>
              <span className="browse-channels-channel-details">
                <span className="browse-channels-joined">Joined</span> · {channel.membersCount} members
                {channel.description && <span> · {channel.description}</span>}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Conditionally render the ChannelModal */}
      {isModalOpen && (
        <ChannelModal closeModal={handleCloseModal} addChannel={(newChannel) => {
          // Update channels and filteredChannels with the new channel
          setChannels(prevChannels => [...prevChannels, newChannel]);
          setFilteredChannels(prevChannels => [...prevChannels, newChannel]);
          handleCloseModal();
        }} workspaceId={localStorage.getItem('workspaceId')} />
      )}
    </div>
  );
};

export default BrowseChannels;
