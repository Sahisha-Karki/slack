import React from 'react';
import './Mention.css'; // Import the CSS file for styling

const Mention = () => {
  return (
    <div className="mention-container">
      <div className="mention-body">
      <img src="./images/illu.png" alt="Illustration" className="mention-image" />
      <h5 className="mention-header">All your Mention & Reactions messages</h5>
        <p>From here, you can see messages where you’ve been mentioned or reacted to. If you don’t see the right activity, you can adjust your settings in Slack.</p>
      </div>
    </div>
  );
};

export default Mention;
