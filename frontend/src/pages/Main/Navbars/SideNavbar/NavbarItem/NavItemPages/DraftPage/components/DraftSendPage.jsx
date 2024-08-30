import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, MessageItem } from './draftComponents';
import DeleteModal from './DeleteModal';
import MessagePage from '../../Message/Message'; // Ensure correct import path
import './draftComponents.css';

const DraftSentPage = () => {
    const [selectedTab, setSelectedTab] = useState('drafts');
    const [messages, setMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showMessagePage, setShowMessagePage] = useState(false); // State to control MessagePage visibility

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/drafts/drafts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching drafts and sent messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const toggleSelect = (id) => {
        setSelectedMessages((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const selectAll = () => {
        const ids = messages.filter(msg => msg.tab === selectedTab).map(msg => msg._id);
        setSelectedMessages(ids);
        setShowCheckboxes(true);
        setIsEditMode(true);
    };

    const unselectAll = () => {
        setSelectedMessages([]);
        setShowCheckboxes(false);
        setIsEditMode(false);
    };

    const deleteSelected = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await Promise.all(
                selectedMessages.map((id) =>
                    axios.delete(`http://localhost:5000/api/drafts/drafts/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                )
            );
            setMessages(messages.filter(msg => !selectedMessages.includes(msg._id)));
            setSelectedMessages([]);
            setIsModalOpen(false);
            setIsEditMode(false);
            setShowCheckboxes(false);
        } catch (error) {
            console.error('Error deleting drafts:', error);
        }
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setSelectedMessages([]);
        setShowCheckboxes(false);
    };

    const handleItemClick = (id) => {
        if (selectedTab === 'sent') {
            window.location.href = `/chat/${id}`;
        }
    };

    const drafts = messages.filter(msg => !msg.isSent);
    const sentMessages = messages.filter(msg => msg.isSent);
    const noMessagesText = (selectedTab === 'drafts' ? drafts : sentMessages).length === 0;
    const showDraftBox = selectedTab === 'drafts' && drafts.length === 0;

    return (
        <div className="draft-sent-page">
            {showMessagePage ? (
                <MessagePage />
            ) : (
                <>
                    <Header 
                        title="Drafts & Sent" 
                        selectedTab={selectedTab} 
                        setSelectedTab={setSelectedTab}
                        selectAll={selectAll}
                        unselectAll={unselectAll}
                        deleteSelected={deleteSelected}
                        isEditMode={isEditMode}
                        selectedMessages={selectedMessages}
                        showCheckboxes={showCheckboxes}
                    />

                    {showDraftBox && (
                        <div className="draft-message-box">
                            <div className='bnr-fnt'> 
                                <h2>Draft messages to send when you’re ready</h2>
                                <p>Start typing a message anywhere, then find it here. Re-read, revise, and send whenever you’d like.</p>
                            </div>
                            <div className='bnr-btn'>
                                <button className="start-message-btn" onClick={() => setShowMessagePage(true)}>
                                    Start a Message
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={`draft-page-message-list ${isEditMode ? 'edit-mode' : ''}`}>
                        {noMessagesText ? (
                            <div className="draft-page-no-messages">
                                <img src="./images/nomessage.png" alt="No Messages" />
                                <p className='draft-page-no-message-title'>All your outgoing messages</p>
                                <p className='draft-page-no-message-body'>Everything you send, draft, and schedule can now be found here.</p>
                            </div>
                        ) : (
                            (selectedTab === 'drafts' ? drafts : sentMessages).map(msg => (
                                <MessageItem
                                    key={msg._id}
                                    message={msg}
                                    isSelected={selectedMessages.includes(msg._id)}
                                    toggleSelect={toggleSelect}
                                    isEditMode={isEditMode}
                                    showCheckboxes={showCheckboxes} 
                                    onClick={() => handleItemClick(msg._id)}
                                />
                            ))
                        )}
                    </div>
                    
                    <DeleteModal
                        show={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onDelete={confirmDelete}
                        itemCount={selectedMessages.length} 
                    />
                </>
            )}
        </div>
    );
};

export default DraftSentPage;
