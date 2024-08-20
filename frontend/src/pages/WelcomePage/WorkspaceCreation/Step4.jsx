import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/WelcomePage/Step4.css';

const CreateWorkspaceStep4 = ({ onNext }) => {
  const [projectName, setProjectName] = useState('');

  const handleProjectNameChange = (e) => setProjectName(e.target.value);

  const handleNext = async () => {
    if (!projectName) {
      alert('Please enter a project name.');
      return;
    }
    try {
      const token = localStorage.getItem('token');

      // Send request to create a channel
      await axios.post('http://localhost:5000/api/workspaces/create-channel', {
        channelName: projectName,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      onNext(); // Proceed to the next step
    } catch (error) {
      console.error('Error creating channel:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="create-workspace-step4-container">
      <h2>Create channel</h2>
      <p>Step 4 of 5</p>
      <p className='step4-heading'>What’s your team working on right now?</p>
      <p className='step4-description'>
        This could be anything: a project, campaign, event, or the deal you’re trying to close.
      </p>
      <input
        type="text"
        id="project-name-input"
        value={projectName}
        onChange={handleProjectNameChange}
        placeholder="E.g. autumn, rules"
      />
      <button className="step4-next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default CreateWorkspaceStep4;
