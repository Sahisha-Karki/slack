import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import axios from 'axios';

function NewWorkSpaceForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNewWorkspaceSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      await axios.post('http://localhost:5000/api/workspaces/request', 
        { email },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request headers
            'Content-Type': 'application/json',
          }
        }
      );

      localStorage.setItem('email', email);

      // Navigate to OTP verification page with verificationType state
      navigate('/otp', { state: { verificationType: 'workspace' } });
    } catch (error) {
      console.error("Error requesting workspace creation:", error.response?.data || error.message);
    }
  };

  return (
    <div className="Workspace-Form">
      <AuthForm
        onSubmit={handleNewWorkspaceSubmit}
        email={email}
        setEmail={setEmail}
        formType="newWorkspace"
      />
    </div>
  );
}

export default NewWorkSpaceForm;
