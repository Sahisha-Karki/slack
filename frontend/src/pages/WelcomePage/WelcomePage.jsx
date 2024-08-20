import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../../components/Header&Footer/Header'; 
import '../../Styles/WelcomePage/WelcomePage.css';
import axios from 'axios'; // Import axios for making HTTP requests

const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [workspaces, setWorkspaces] = useState([]); // State to hold workspaces
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  const handleCreateWorkspace = () => {
    navigate("/workspace-login");
  };

  const handleLaunchWorkspace = (workspaceId) => {
    console.log('Launching workspace with ID:', workspaceId); // Log the workspaceId
    navigate('/main', { state: { workspaceId } });
  };

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workspaces/user-workspaces', { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token or other auth headers if necessary
          }
        });
        setWorkspaces(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  const renderWorkspaces = () => {
    if (loading) return <p>Loading workspaces...</p>;
    if (error) return <p>Error fetching workspaces: {error}</p>;
    if (workspaces.length === 0) return <p>No workspaces available.</p>;

    return workspaces.map((workspace) => (
      <div key={workspace._id} className="workspace-item1">
        <div className="workspace-content1">
          <p>Workspaces that you have example@gmail.com</p>
          <div className="logo">
            <img src="https://via.placeholder.com/100" alt="Your Company" />
            <p>{workspace.name}</p>
          </div>
        </div>
        <button className="launch-button" onClick={() => handleLaunchWorkspace(workspace._id)}>
          Launch
        </button>
      </div>
    ));
  };

  return (
    <div className="welcome-page-main-container">
      <Header
        customButtonText="Create a New Workspace"
        additionalButton="Learn More"
        customButtonAction={handleCreateWorkspace}
      />
      <div className="welcome-page-sub-container">
        <div className="welcome-page-container">
          <div className="content">
            <h1>Welcome back</h1>
          </div>
          <div className="workspace">
            {renderWorkspaces()}
            <div className="workspace-item2">
              <div className="workspace-content2">
                <div className="user-image">
                  <img src="https://via.placeholder.com/100" alt="User" />
                </div>
                <p>You can create another workspace with another team too.</p>
              </div>
              <button className="create-button" onClick={handleCreateWorkspace}>
                Create a New Workspace
              </button>
            </div>
          </div>
          <div className="footer">
            <p>Not seeing your workspace? Try using a different email.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
