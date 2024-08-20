import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/WelcomePage/Step3.css';
import SkipModal from './SkipModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const CreateWorkspaceStep3 = ({ onNext, onSkip }) => {
  const [email, setEmail] = useState('');
  const [inviteLink] = useState('https://example.com/invite-link'); 
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  const handleSkipClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSkipConfirm = async () => {
    setModalOpen(false);
    try {
      const token = localStorage.getItem('token');

      // Skip invitation API call if necessary
      await axios.post('http://localhost:5000/api/workspaces/add-team-members', { members: [] }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Use onSkip to handle the transition
      if (onSkip) {
        onSkip(); 
      } else {
        onNext(); // Fallback if onSkip is not provided
      }
    } catch (error) {
      console.error('Error skipping invitation:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleNext = async () => {
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/workspaces/add-team-members', {
        members: [email]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      onNext(); // Proceed to the next step
    } catch (error) {
      console.error('Error adding team members:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="create-workspace-step3-container">
      <h2>Add members to your team</h2>
      <p>Step 3 of 5</p>
      <h2>Who else is on the Your Company Team?</h2>
      <button className="google-contacts-button">
        Add from Google Contacts
      </button>
      <textarea
        id="email-input"
        value={email}
        onChange={handleEmailChange}
        placeholder="E.g. johndoe@gmail.com"
        rows="4"
      />
      <div className="options-container">
        <button className="skip-button" onClick={handleSkipClick}>
          Skip for now
        </button>
        <button className="copy-invite-link-button" onClick={handleCopyInviteLink}>
          <FontAwesomeIcon icon={faCopy} /> Copy Invite Link
        </button>
        <button className="next-button" onClick={handleNext}>Next</button>
        <SkipModal isOpen={isModalOpen} onClose={handleCloseModal} onSkip={handleSkipConfirm} />
      </div>
    </div>
  );
};

export default CreateWorkspaceStep3;
