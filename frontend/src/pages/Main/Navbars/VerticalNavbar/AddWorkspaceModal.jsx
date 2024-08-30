import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../../../Styles/Pages/VerticalNavbar/AddWorkspaceModal.css';

const AddWorkspaceModal = ({ onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation to /login
  const handleSignInClick = () => {
    navigate('/login');
  };

  // Function to handle navigation to /workspace-login
  const handleCreateWorkspaceClick = () => {
    navigate('/workspace-login');
  };

  return (
    <div className="workspace-modal-overlay">
      <div className="workspace-modal-content">
        <button className="workspace-modal-close" onClick={onClose}>&times;</button>
        <div className="workspace-modal-header">Add New Workspace</div>
        <div className="workspace-modal-body">
          <div className="workspace-modal-option" onClick={handleSignInClick}>
            <img src="./images/f2.png" alt="Sign In Icon" className="modal-icon" />
            <div className="workspace-modal-text">Sign In to another workspace</div>
          </div>
          <div className="workspace-modal-option">
            <img src="./images/f4.png" alt="Add Multiple Icon" className="modal-icon" onClick={handleSignInClick} />
            <div className="workspace-modal-text">Add multiple workspaces</div>
          </div>
          <div className="workspace-modal-option" onClick={handleCreateWorkspaceClick}>
            <img src="./images/f3.png" alt="Create New Icon" className="modal-icon" />
            <div className="workspace-modal-text">Create new workspaces</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkspaceModal;
