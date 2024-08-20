import React, { useState } from 'react';
import '../../../src/Styles/Setting/passwordChangeForm.css';
import { FaChevronUp, FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordChange() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change submitted:', passwords);
    // Reset form and collapse
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setIsExpanded(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <div className="password-change-container">
      <div className="password-header">
        <h2>Password</h2>
        <button 
          className={`password-toggle-button ${isExpanded ? 'toggle-button-expanded' : ''}`} 
          onClick={handleToggle}
        >
          {isExpanded ? <FaChevronUp className="arrow rotate" /> : 'Change'}
        </button>
      </div>
      {isExpanded && (
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current password</label>
            <input
              type={showPassword.currentPassword ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
            />
            <div 
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility('currentPassword')}
            >
              {showPassword.currentPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New password</label>
            <input
              type={showPassword.newPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
            />
            <div 
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility('newPassword')}
            >
              {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New password</label>
            <input
              type={showPassword.confirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
            />
            <div 
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility('confirmNewPassword')}
            >
              {showPassword.confirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className="save-button">Save Password</button>
        </form>
      )}
    </div>
  );
}

export default PasswordChange;
