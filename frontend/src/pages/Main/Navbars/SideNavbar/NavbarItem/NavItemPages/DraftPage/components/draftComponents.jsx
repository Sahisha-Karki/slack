import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

// Header Component
export const Header = ({ title, selectedTab, setSelectedTab, selectAll, unselectAll, deleteSelected, isEditMode, selectedMessages, showCheckboxes }) => {
    const isDeleteDisabled = selectedMessages.length === 0;

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-title">
                    <h1>{title}</h1>
                </div>
                <div className="message-actions-header">
                    {showCheckboxes && isEditMode && (
                        <>
                            <button
                                className={`action-button delete-button ${isDeleteDisabled ? 'disabled' : ''}`}
                                onClick={isDeleteDisabled ? null : deleteSelected}
                                disabled={isDeleteDisabled}
                            >
                                <FaTrashAlt />
                            </button>
                            <button className="action-button" onClick={unselectAll}>Unselect</button>
                        </>
                    )}
                    {!showCheckboxes && !isEditMode && (
                        <button className="action-button" onClick={selectAll}>Select</button>
                    )}
                </div>
            </div>
            <div className="nav-bar">
                <button 
                    onClick={() => setSelectedTab('drafts')} 
                    className={`nav-button ${selectedTab === 'drafts' ? 'active' : ''}`}
                >
                    Drafts
                </button>
                <button 
                    onClick={() => setSelectedTab('sent')} 
                    className={`nav-button ${selectedTab === 'sent' ? 'active' : ''}`}
                >
                    Sent
                </button>
            </div>
        </header>
    );
};

export const MessageItem = ({ message, isSelected, toggleSelect, isEditMode, showCheckboxes }) => (
    <div className={`message-item ${isSelected ? 'selected' : ''}`}>
      {isEditMode && showCheckboxes && (
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={() => toggleSelect(message._id)} 
          className="checkbox"
        />
      )}
      <img src={message.avatar} alt="Avatar" className="avatar" />
      <div className="draft-message-content">
        <p className="draft-message-channel">{message.channel ? message.channel.name : 'No Channel'}</p> {/* Channel Name */}
        <p className="draft-message-title">{message.name}</p>
        <p className="draft-message-text">{message.content}</p>
      </div>
      <div className="draft-message-time">
        <p>{message.createdAt ? new Date(message.createdAt).toLocaleString() : 'No Time'}</p> {/* Formatted Time */}
      </div>
    </div>
  );
  