import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, MessageItem } from './draftComponents';
import DeleteModal from './DeleteModal';

const DraftSentPage = () => {
    const [selectedTab, setSelectedTab] = useState('drafts');
    const [messages, setMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showCheckboxes, setShowCheckboxes] = useState(false);

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
            // Delete each selected draft
            await Promise.all(
                selectedMessages.map((id) =>
                    axios.delete(`http://localhost:5000/api/drafts/drafts/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                )
            );
            // Update UI
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

    const noMessagesText = messages.filter(msg => (selectedTab === 'drafts' ? !msg.isSent : msg.isSent)).length === 0;

    return (
        <div className="draft-sent-page">
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
            <div className={`message-list ${isEditMode ? 'edit-mode' : ''}`}>
                {noMessagesText ? (
                    <div className="no-messages">
                        <img src="./images/nomessage.png" alt="No Messages" />
                        <p className='no-message-title'>All your outgoing messages</p>
                        <p className='no-message-body'>Everything you send, draft, and schedule can now be found here.</p>
                    </div>
                ) : (
                    messages
                        .filter(msg => (selectedTab === 'drafts' ? !msg.isSent : msg.isSent))
                        .map(msg => (
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
                itemCount={selectedMessages.length} // Pass the count or list of selected drafts
            />
        </div>
    );
};

export default DraftSentPage;
