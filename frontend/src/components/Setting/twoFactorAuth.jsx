import React, { useState } from 'react';
import '../../../src/Styles/Setting/TwoFactorAuth.css';
import { FaChevronUp } from 'react-icons/fa';

function TwoFactorAuth() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="two-factor-auth-container">
      <div className="auth-header">
        <h2>Two-Factor Authentication</h2>
        <button
          className={`password-toggle-button ${isExpanded ? 'toggle-button-expanded' : ''}`} 
          onClick={handleToggleExpand}
        >
            {isExpanded ? <FaChevronUp className="arrow rotate" /> : 'Set up'}

        </button>
      </div>
      {isExpanded && (
        <div className="auth-content">
          <p>
            Two-Factor authentication (2FA for short) is a good way to add an extra<br></br> layer
            of security to your account to make sure that only you have the <br></br>ability to log in.
          </p>
          <button className="setupp-button">
            Set up Two-Factor Authentication
          </button>
          <p className="note">
            Note: Activating two-factor authentication will sign you out of all other sessions.
          </p>
        </div>
      )}
    </div>
  );
}

export default TwoFactorAuth;
