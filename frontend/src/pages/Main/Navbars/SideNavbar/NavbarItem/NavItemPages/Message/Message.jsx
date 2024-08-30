import React, { useState, useRef, useEffect } from 'react';
import MessageInput from '../../../../../../../components/MessageInput/MessageInput';
import './Message.css';

const MessageComposer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const popupRef = useRef(null);
    const inputRef = useRef(null);

    const users = ['Alice', 'John Doe', 'Bob', 'Charlie'];
    const channels = ['general', 'announcement', 'attendance', 'Daily Task', 'random'];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.startsWith('@') || value.startsWith('#')) {
            setShowPopup(true);
        } else if (value === '') {
            setShowPopup(false);
        } else {
            setShowPopup(true);
        }
    };

    const handleSelectRecipient = (recipient) => {
        if (!selectedRecipients.includes(recipient)) {
            setSelectedRecipients([...selectedRecipients, recipient]);
        }
        setSearchTerm('');
        setShowPopup(false);
    };

    const handleRemoveRecipient = (recipientToRemove) => {
        setSelectedRecipients(selectedRecipients.filter(recipient => recipient !== recipientToRemove));
    };

    const filteredResults = searchTerm.startsWith('@')
        ? users.filter(user => user.toLowerCase().includes(searchTerm.slice(1).toLowerCase()))
        : searchTerm.startsWith('#')
        ? channels.filter(channel => channel.toLowerCase().includes(searchTerm.slice(1).toLowerCase()))
        : [];

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex + 1) % filteredResults.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (focusedIndex >= 0 && focusedIndex < filteredResults.length) {
                handleSelectRecipient(filteredResults[focusedIndex]);
            }
        }
    };

    const handleMouseEnter = (index) => {
        setFocusedIndex(index);
    };

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
            setShowPopup(false);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="message-composer-container">
            <div className="message-composer-heading">
                <h1>Send your message</h1>
            </div>

            <div className="message-composer-header">
                <div className="message-composer-input-wrapper">
                    <span className="message-composer-label">To:</span>
                    {selectedRecipients.map((recipient, index) => (
                        <span key={index} className="message-composer-recipient">
                            {recipient.startsWith('#') ? `#${recipient}` : `@${recipient}`}
                            <span
                                className="message-composer-recipient-remove"
                                onClick={() => handleRemoveRecipient(recipient)}
                            >
                                &times;
                            </span>
                        </span>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={selectedRecipients.length === 0 ? "@people, member@gmail.com, #channel" : ""}
                        className="message-composer-search"
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

            <div className="message-composer-content">
                <p className="message-composer-subtitle">
                    From this point, you can send messages to any colleague or channel. If you don’t see the right person listed, you can,{' '}
                    <span className="message-composer-link">Add them to Slack.</span>
                </p>
            </div>

            {showPopup && (
                <div className="message-composer-popup" ref={popupRef}>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                            <div
                                key={index}
                                className={`message-composer-item ${focusedIndex === index ? 'focused' : ''}`}
                                onClick={() => handleSelectRecipient(result)}
                                onMouseEnter={() => handleMouseEnter(index)}
                            >
                                <span
                                    className={`message-composer-item-icon ${
                                        searchTerm.startsWith('@') ? 'user-icon' : 'channel-icon'
                                    }`}
                                >
                                    {searchTerm.startsWith('@') ? '@' : '#'}
                                </span>
                                <span className="message-composer-item-name">{result}</span>
                            </div>
                        ))
                    ) : (
                        <div className="message-composer-no-results">No items found</div>
                    )}
                </div>
            )}

            <div className="message-composer-input">
                <MessageInput />
            </div>
        </div>
    );
};

export default MessageComposer;
