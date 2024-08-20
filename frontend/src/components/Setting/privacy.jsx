import React, { useState } from 'react';
import '../../../src/Styles/Setting/privacy.css'
import { TbKeyframeFilled } from "react-icons/tb";

const PrivacyAndSafetySettings = () => {
  const [discoverability, setDiscoverability] = useState('anyone');
  const [contactSharing, setContactSharing] = useState('all');
  const [blockedInvitations] = useState([]);
  const [hiddenPeople] = useState([]);

  return (
    <div className="settings-container">
      <div className="privacy-settings-box">
        <h2>Slack Connect Discoverability</h2>
        <p>Choose who can find you via Slack search. They'll only be able to see that you're on Slack - no personal or workspace details will be shared. <a href="#">Learn more</a></p>
        <div>
          <hr></hr>
          <label>
            <input
              type="radio"
              value="anyone"
              checked={discoverability === 'anyone'}
              onChange={() => setDiscoverability('anyone')}
            />
            Anyone with your email address <span className='emailcom'>(johndoe@gmail.com)</span> 
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="noone"
              checked={discoverability === 'noone'}
              onChange={() => setDiscoverability('noone')}
            />
            No one
          </label>
        </div>
      </div>

      <div className="privacy-settings-box">
  <h2>Contact Sharing</h2>
  <p>Choose who's allowed to share your contact info - so they can introduce you to people outside <span className='emailcom'>Your Company</span>. <a href="#">Learn More</a></p>
  <div>
    <hr></hr>
    <label>
      <input
        type="radio"
        value="all"
        checked={contactSharing === 'all'}
        onChange={() => setContactSharing('all')}
      />
      <div className="radio-label">
        <span>All your contacts</span>
        <span className="sub-text">Includes people from <span className='emailcom'>Your Company</span> and any external people you're using Slack connect to work with</span>
      </div>
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        value="company"
        checked={contactSharing === 'company'}
        onChange={() => setContactSharing('company')}
      />
      <span>Only People at <span className='emailcom'>Your Company</span>.</span>
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        value="noone"
        checked={contactSharing === 'noone'}
        onChange={() => setContactSharing('noone')}
      />
      <span>No one</span>
    </label>
  </div>
</div>

      <div className="privacy-settings-box">
        <h2>Invitations you've blocked</h2>
        <p>You've stopped receiving Slack connect invitations from these people</p>
        <hr></hr>
        {blockedInvitations.length === 0 ? (
          <div className="info-message">
            <span className="info-icon"><TbKeyframeFilled className='frameicon' /></span>
            You haven't blocked any invitations from anyone yet.
          </div>
        ) : (
          <ul>
            {blockedInvitations.map((person, index) => (
              <li key={index}>{person}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="privacy-settings-box">
        <h2>People you've hidden</h2>
        <p>You won't get notifications or see messages from these people. <a href="#">Learn more</a></p>
          <hr></hr>
        {hiddenPeople.length === 0 ? (
          <div className="info-message">
            <span className="info-icon"><TbKeyframeFilled className='frameicon' /></span>
            You haven't hidden anyone yet.
          </div>
        ) : (
          <ul>
            {hiddenPeople.map((person, index) => (
              <li key={index}>{person}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PrivacyAndSafetySettings;