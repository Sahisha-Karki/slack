import React from 'react';
import './DefaultPage.css';

const DefaultPage = () => {
  return (
    <div className="default-page">
      <header className="default-page-header">
        <h1>Welcome to Our App!</h1>
        <p>We're excited to have you here. Let's get started with some quick tips:</p>
      </header>
      <div className="default-page-guide-section">
        <div className="default-page-guide-item">
          <h2>1. Start Conversations</h2>
          <p>Engage with your team on topics or projects. <a href="/conversations">Learn more</a>.</p>
        </div>
        <div className="default-page-guide-item">
          <h2>2. Join Existing Channels</h2>
          <p>Find and join channels of interest. <a href="/channels">Discover channels</a>.</p>
        </div>
        <div className="default-page-guide-item">
          <h2>3. Send Direct Messages</h2>
          <p>For quick questions or private chats. <a href="/messages">Start a chat</a>.</p>
        </div>
        <div className="default-page-guide-item">
          <h2>4. Customize Your Profile</h2>
          <p>Update your picture and info. <a href="/profile">Update profile</a>.</p>
        </div>
      </div>
      <footer className="default-page-footer">
        <p>Need help? <a href="/support">Contact support</a> or <a href="/faq">read our FAQ</a>.</p>
      </footer>
    </div>
  );
};

export default DefaultPage;
