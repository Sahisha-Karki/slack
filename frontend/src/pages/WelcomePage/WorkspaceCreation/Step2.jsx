import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/WelcomePage/Step2.css';
import CustomFileInput from '../../../components/Shared/CustomFileInput';

const Step2CreateWorkspace = ({ onNext }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyPhoto, setCompanyPhoto] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (file) => {
    if (file && file.size > 5000000) {
      setError('File size exceeds 5MB.');
      return;
    }
    setCompanyPhoto(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName) {
      setError('Company name is required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      const formData = new FormData();
      formData.append('companyName', companyName);
      if (companyPhoto) formData.append('companyPhoto', companyPhoto);

      const response = await axios.post(
        'http://localhost:5000/api/workspaces/set-company-name', // API URL
        formData, // Data to send
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Authorization header
            'Content-Type': 'multipart/form-data', // Content-Type header for file upload
          },
        }
      );
      

      setMessage(response.data.message);
      setCompanyName(''); // Clear the company name field
      setCompanyPhoto(null); // Clear the selected file
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to set company name.');
    }
  };

  return (
    <form className="step2-create-workspace-form" onSubmit={handleSubmit}>
      <p className='step2-step'>Step 2 of 5</p>
      <h2>Create Workspace</h2>
      <label htmlFor="step2-company-name" className='step2-company-name-label'>What’s the name of your company or team?</label>
      <p>This will be the name of your Slack workspace—choose something that your team will recognize.</p>
      <div className="step2-input-container">
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="E.g. Yourcompany or Team"
          maxLength={70}
          className="step2-company-name-input"
          required
        />
        <div className="step2-character-count">
          {70 - companyName.length}
        </div>
      </div>
      <div className="step2-file-upload-container">
        <label htmlFor="step2-company-photo-upload" className='step2-company-photo-upload-label'>Company Logo (optional)</label>
        <p>Help your teammates know they’re in the right place.</p>
        <div className="step2-file-preview-container">
          <div className="step2-file-preview">
            {companyPhoto ? (
              <img src={URL.createObjectURL(companyPhoto)} alt="Company Logo Preview" />
            ) : (
              <div className="step2-file-placeholder">Y</div>
            )}
          </div>
          <CustomFileInput onFileChange={handleFileChange} />
        </div>
        <button type="submit" className="step2-next-button">Next</button>
      </div>
      {error && <div className="step2-error">{error}</div>}
      {message && <div className="step2-message">{message}</div>}
    </form>
  );
};

export default Step2CreateWorkspace;
