import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../../Styles/WelcomePage/Step5.css';

const CreateWorkspaceStep5 = ({ setStep }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  const handleLaunchClick = async () => {
    setIsLaunching(true);
    console.log('Launching...'); // Ensure this log appears

    // Simulate async operation (e.g., final API call)
    try {
      // Simulate a delay for async operations like final API calls
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Navigate to the main application
      navigate('/main');
    } catch (error) {
      console.error('Error during launch:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="create-workspace-step5-container">
      <h2>Workspace successfully created</h2>
      <p>Start your journey by clicking down below and get started to explore Slack.</p>
      <button
        className={`launch-slack-button ${isLaunching ? 'launching' : ''}`}
        onClick={handleLaunchClick}
        disabled={isLaunching} // Disable button during launch
      >
        {isLaunching ? 'Launching...' : 'Launch Slack →'}`` 
      </button>
    </div>
  );
};

export default CreateWorkspaceStep5;
