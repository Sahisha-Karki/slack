import React, { useState, forwardRef, useCallback, useEffect } from "react";
import './ContextMenu.css';
import NotificationModal from './NotificationModal/NotificationModal';
import LeaveChannelModal from './LeaveChannelModal/LeaveChannelModal';

const ContextMenu = forwardRef(({ x, y, channel, onClose }, ref) => {
  const [isSubDropdownOpen, setSubDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);

  // Function to handle outside click
  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSubDropdownOpen(false);
      if (onClose) onClose();
    }
  }, [ref, onClose]);

  // Use effect to add/remove click listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSubDropdownToggle = (event) => {
    event.stopPropagation();
    setSubDropdownOpen(prev => !prev);
  };

  const handleOpenModal = (event) => {
    event.stopPropagation();
    setSubDropdownOpen(false);
    setModalOpen(true);
  };

  const handleOpenLeaveModal = (event) => {
    event.stopPropagation();
    setSubDropdownOpen(false); // Close the context menu
    setLeaveModalOpen(true);  // Open leave channel modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseLeaveModal = () => {
    setLeaveModalOpen(false);
    if (onClose) onClose(); // Ensure the context menu closes
  };

  const handleLeaveChannel = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/workspaces/channels/${channel._id}/leave`, {
        method: 'DELETE',  // Changed to DELETE
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Successfully left the channel:', data);
        handleCloseLeaveModal(); // Close modal on successful leave
      } else {
        console.error('Failed to leave channel:', data.message);
      }
    } catch (error) {
      console.error('Error leaving channel:', error);
    }
  };
  
  

  return (
    <>
      <div 
        className="context-menu" 
        style={{ top: y, left: x }}
        ref={ref}
      >
        <ul>
          <li>View Channel Details</li>
          <li onClick={handleSubDropdownToggle}>
            Copy <i className={`fas fa-chevron-${isSubDropdownOpen ? 'right' : 'down'}`}></i>
            {isSubDropdownOpen && (
              <ul className="context-sub-dropdown">
                <li>Copy Name</li>
                <li>Copy Link</li>
                <li>Copy Sessions Link</li>
              </ul>
            )}
          </li>
          <li onClick={handleOpenModal}>Change Notifications</li>
          <li onClick={handleOpenLeaveModal}>Leave Channel</li>
        </ul>
      </div>

      {isModalOpen && (
        <NotificationModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal} 
        />
      )}

      {isLeaveModalOpen && (
        <LeaveChannelModal 
          channelName={channel.name} 
          channelType={channel.type} 
          isOpen={isLeaveModalOpen}
          onClose={handleCloseLeaveModal} 
          onLeave={handleLeaveChannel}
        />
      )}
    </>
  );
});

export default ContextMenu;
