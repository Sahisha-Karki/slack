import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../../components/Header&Footer/Header'; 
import '../../Styles/WelcomePage/WelcomePage.css';
import axios from 'axios'; // Import axios for making HTTP requests

const WelcomePage = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/workspaces/user-workspaces', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setWorkspaces(response.data.workspaces || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch workspaces');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = () => {
    navigate("/workspace-login");
  };

  const handleLaunch = async (workspaceId) => {
    const token = localStorage.getItem('token');
  
    if (!/^[0-9a-fA-F]{24}$/.test(workspaceId)) {
        console.error('Invalid workspace ID');
        setError('Invalid workspace ID');
        return;
    }
  
    try {
        const response = await axios.get(`http://localhost:5000/api/workspaces/launch-workspace/${workspaceId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
  
        console.log(response.data, "RESPONSE"); // Check the response data
  
        // Save the workspaceId to localStorage
        localStorage.setItem('workspaceId', response.data.workspace._id);
  
        navigate(`/main?workspace=${response.data.workspace._id}`, { state: { workspace: response.data.workspace } });
    } catch (error) {
        console.error('Error launching workspace', error);
        setError(error.response?.data?.message || 'Failed to launch workspace');
    }
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
  {loading ? (
    <p>Loading workspaces...</p>
  ) : error ? (
    <p className="error-message">Error: {error}</p>
  ) : workspaces.length > 0 ? (
    workspaces.map(workspace => (
      <div key={workspace._id} className="workspace-item1">
        <div className="workspace-content1">
          <div className="logo">
            <img 
              src={workspace.logo || 'https://via.placeholder.com/100'} 
              alt={workspace.name} 
            />
            <p>{workspace.name}</p>
          </div>
        </div>
        <button className="launch-button" onClick={() => handleLaunch(workspace._id)}>Launch</button>
      </div>
    ))
  ) : (
    <p>No workspaces found</p>
  )}
  <div className="workspace-item2">
    <div className="workspace-content2">
      <div className="user-image">
        <img src="https://via.placeholder.com/100" alt="User" />
      </div>
      <p>You can create another workspace with another team too.</p>
    </div>
    <button className="create-button" onClick={handleCreateWorkspace}>Create a New Workspace</button>
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