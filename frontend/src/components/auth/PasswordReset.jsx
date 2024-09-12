import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/auth/AuthForm.css"; // Ensure this path is correct for your styles

function PasswordReset() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordRules = {
    minLength: 8,
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    number: /[0-9]/,
    specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validatePassword = (pwd) => {
    if (pwd.length < passwordRules.minLength) return 'Password must be at least 8 characters long.';
    if (!passwordRules.upperCase.test(pwd)) return 'Password must contain at least one uppercase letter.';
    if (!passwordRules.lowerCase.test(pwd)) return 'Password must contain at least one lowercase letter.';
    if (!passwordRules.number.test(pwd)) return 'Password must contain at least one number.';
    if (!passwordRules.specialCharacter.test(pwd)) return 'Password must contain at least one special character.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const otp = localStorage.getItem('otp'); // Retrieve OTP from localStorage
      await axios.post('http://localhost:5000/api/auth/reset-password', { otp, newPassword: password });
      
      // Clear OTP from localStorage
      localStorage.removeItem('otp');
      
      setSuccessMessage('Password reset successfully');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword === '') {
      setErrorMessage('');
    } else {
      setErrorMessage(validatePassword(newPassword));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword === '') {
      setErrorMessage('');
    } else if (password !== newConfirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage(validatePassword(password));
    }
  };

  const togglePasswordVisibility = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling up
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth">
      <div className="auth-main-container">
        <div className="auth-sub-container">
          <div className="auth-container">
            <div className="auth-header">
              <img
                src="./images/slack.svg.png"
                alt="Slack Logo"
                className="auth-logo"
              />
              <div className="auth-content">
                <h2>Reset Your Password</h2>
                <p>Enter your new password below.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-fields">
                <div className="auth-password-container">
                  <label htmlFor="new-password">New Password:</label>
                  <div className="password-input-container">
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <span
                      className="auth-password-toggle2"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    {errorMessage && <div className="auth-error-message">{errorMessage}</div>}
                  </div>
                </div>
                <div className="auth-password-container">
                  <label htmlFor="confirm-password">Confirm Password:</label>
                  <div className="password-input-container">
                    <input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                </div>
                {successMessage && <div className="auth-success-message">{successMessage}</div>}
                <button type="submit" className="auth-button auth-button-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
