import React, { useState, useEffect, useCallback } from 'react';
import './Mention.css';

// Custom hook for data fetching
const useFetchData = () => {
  const [data, setData] = useState({ mentions: [], reactions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // Replace with actual API call
      const result = await getMockData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

const Mention = () => {
  const { data, loading, error } = useFetchData();
  const { mentions, reactions } = data;
  const hasContent = mentions.length > 0 || reactions.length > 0;

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="error-message">Error loading data: {error.message}</div>;

  if (!hasContent) {
    return (
      <div className="mention-container">
        <div className="no-message-mention-body">
          <img src="./images/illu.png" alt="Illustration" className="mention-image" />
          <h5 className="mention-header">All your Mention & Reactions messages</h5>
          <p>From here, you can see messages where you've been mentioned or reacted to. If you don't see the right activity, you can adjust your settings in Slack.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mention-container">
      
      {mentions.length > 0 && (
        <div className="mentions-section">
          <div className="section-header">
            <h3>Mentions</h3>
          </div>
          <div className="mention-items">
            {mentions.map(mention => (
              <MentionItem key={mention.id} {...mention} />
            ))}
          </div>
        </div>
      )}
      {reactions.length > 0 && (
        <div className="reactions-section">
          <div className="section-header">
            <h3>Reactions</h3>
          </div>
          <div className="reaction-items">
            {reactions.map(reaction => (
              <ReactionItem key={reaction.id} {...reaction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MentionItem = React.memo(({ user, message, time, mentions }) => (
  <div className="mention-item" data-channel={user === 'general' ? 'general' : ''}>
    {user === 'general' ? (
      <div className="user-avatar">#</div>
    ) : (
      <img src={`./images/${user.toLowerCase()}.jpg`} alt={user} className="user-avatar" />
    )}
    <div className="mention-content">
      <span className="user-name">{user}</span>
      <span className="mention-message">{message}</span>
      <span className="mention-time">{time}</span>
      <div>
        {mentions.map((mention, index) => (
          <span key={index} className="mention-tag">{mention}</span>
        ))}
      </div>
    </div>
  </div>
));

const ReactionItem = React.memo(({ user, message, time, reactions, reactors, onReact, onRemoveReact }) => {
  const [userReactions, setUserReactions] = useState(reactions);

  const handleReactionClick = (emoji) => {
    if (userReactions.includes(emoji)) {
      setUserReactions(userReactions.filter(reaction => reaction !== emoji));
      onRemoveReact(emoji); // Call the remove reaction function
    } else {
      setUserReactions([...userReactions, emoji]);
      onReact(emoji); // Call the add reaction function
    }
  };

  return (
    <div className="reaction-item">
      <div className="reaction-header">
        <span className="reactors">{reactors.join(', ')}</span> reacted on <span className="user-chat">
          {user.toLowerCase() === 'you' ? 'your' : `${user}'s`}
        </span> chat
      </div>
      <div className="reaction-content">
        <div className="reaction-left">
          <img src={`./images/${user.toLowerCase()}.jpg`} alt={user} className="user-avatar" />
          <div className="reaction-message-content">
            <span className="user-name">{user}</span>
            <span className="reaction-message">{message}</span>
            <span className="reaction-time">{time}</span>
          </div>
        </div>
        <div className="reaction-right">
          <div className="reaction-emojis">
            {userReactions.map((emoji, index) => (
              <span key={index} className="reaction-emoji" onClick={() => handleReactionClick(emoji)}>
                {emoji} {/* Display the emoji */}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// Mock data function
const getMockData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        mentions: [
          { id: 1, user: 'Alice', message: 'Today\'s update', time: '8:55 AM', mentions: ['@johndoe'] },
          { id: 2, user: 'John Doe', message: 'Hi', time: '7:55 AM', mentions: ['@johndoe'] },
          { id: 3, user: 'general', message: 'Content of message.', time: '8:55 AM', mentions: ['@johndoe', '@alice'] },
        ],
        reactions: [
          { id: 1, user: 'Alice', message: 'Task completed', time: '9:16 AM', reactions: ['👍', '🎉'], reactors: ['You', '@Bob', '@Gaurav'] },
          { id: 2, user: 'John Doe', message: 'Nice work', time: '9:16 AM', reactions: ['👍', '🎉'], reactors: ['You', '@Bob', '10 others'] },
        ],
      });
    }, 1000); // Simulate network delay
  });
};

export default Mention;
