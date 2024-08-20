import React from 'react';
import './Thread.css'; 

const Thread = () => {
  return (
    <div className="thread-container">
        <img src="./images/@icon.png" alt="@Icon" />
      <h2>Manage Your Conversations</h2>
      <p>All the threads you're part of will be gathered in one place.All the threads you're part of will be gathered in one place.</p>
      <a href="/discover-threads" className="discover-link">Discover more about threads</a>
    </div>
  );
};

export default Thread;
