import React, { useState } from "react";
import "../../Styles/auth/AuthForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function AuthForm({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  formType,
}) {
  // State for "Remember Me" checkbox
  const [rememberMe, setRememberMe] = useState(false);
  // State for OTP sent message visibility (only for new workspace form)
  const [otpSent, setOtpSent] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Function to render the header text based on form type
  const renderHeader = () => {
    switch (formType) {
      case "login":
        return "Log In to Slack";
      case "signup":
        return "Sign Up for Slack";
      case "recovery":
        return "Recover Password";
      case "newWorkspace":
        return "First, enter your email";
      default:
        return "";
    }
  };

  // Function to render the message text based on form type
  const renderMessage = () => {
    switch (formType) {
      case "login":
        return "Connect, collaborate, and create with your team seamlessly. We suggest using the email address you use at work.";
      case "signup":
        return "Create an account to start collaborating with your team. Use your work email address to get started.";
      case "recovery":
        return "Enter the email address associated with your account and we'll send you a link to reset your password.";
      case "newWorkspace":
        return "We suggest using the email address you use at work.";
      default:
        return "";
    }
  };

  // Function to render the submit button text based on form type
  const renderSubmitButtonText = () => {
    switch (formType) {
      case "login":
        return "Login";
      case "signup":
        return "Sign Up";
      case "recovery":
        return "Continue";
      case "newWorkspace":
        return "Continue";
      default:
        return "Submit";
    }
  };

  // Alternate actions and links based on form type
  const alternateActions = {
    login: "Register",
    signup: "Login",
    recovery: "Sign up",
    newWorkspace: "Sign in",
  };

  const alternateLinks = {
    login: "/signup",
    signup: "/login",
    recovery: "/signup",
    newWorkspace: "/login",
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      try {
        await onSubmit(e); // Await the completion of onSubmit
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    if (formType === "newWorkspace") {
      setOtpSent(true); // Manage OTP state if applicable
    }
  };
  

  return (
    <div className="auth">
      {/* Main container for the authentication form */}
      <div className="auth-main-container">
        <div className="auth-sub-container">
          <div className="auth-container">
            {/* Header and Content Section */}
            <div className="auth-header">
              {/* logo */}
              <img
                src="./images/slack.svg.png"
                alt="Slack Logo"
                className="auth-logo"
              />
              <div className="auth-content">
                {/* Header and message based on form type */}
                <h2>{renderHeader()}</h2>
                <p>{renderMessage()}</p>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleFormSubmit} className="auth-form">
              <div className="auth-fields">
                {/* Email input field */}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                {/* Conditional rendering for password and confirm password fields */}
                {formType !== "recovery" && formType !== "newWorkspace" && (
                  <>
                    <div className="auth-password-container">
                      {/* Password input field */}
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {/* Toggle for password visibility */}
                      <span
                        className="auth-password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>
                    </div>

                    {/* Options Section (visible only for login form) */}
                    {formType === "login" && (
                      <div className="auth-options">
                        <div className="remember-me">
                          {/* Remember Me checkbox */}
                          <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label htmlFor="remember-me">Remember Me</label>
                        </div>
                        <div className="forgot-password">
                          {/* Forgot password link */}
                          <a href="/recovery">Forgot your password?</a>
                        </div>
                      </div>
                    )}

                    {/* Confirm Password Section (visible only for signup form) */}
                    {confirmPassword !== undefined && (
                      <div className="auth-password-container">
                        {/* Confirm Password input field */}
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Re-enter Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Submit button with text based on form type */}
              <button type="submit" className="auth-button auth-button-primary">
                {renderSubmitButtonText()}
              </button>
            </form>

            {/* OTP Sent Message (visible only for new workspace form) */}
            {formType === "newWorkspace" && otpSent && (
              <div className="workspace-otp-message">
                We’ll email you an OTP code to verify your account.
              </div>
            )}

            {/* Google Sign-in Button (visible only if not on recovery form) */}
            {formType !== "recovery" && (
              <>
                <div className="auth-divider">Or</div>
                <div className="alternative-auth">
                  <button className="google-button">
                    <img src="./images/google.png" alt="Google Icon" /> Sign in
                    with Google
                  </button>
                </div>
              </>
            )}

            {/* Alternate Action Link and Message */}
            <div className="auth-message">
              {/* Message and link for switching between forms */}
              {formType === "login"
                ? "Need a new account? "
                : formType === "signup"
                ? "Already have an account? "
                : formType === "newWorkspace"
                ? "Already Using Slack? "
                : "Don't have an account? "}
              <a href={alternateLinks[formType]}>
                {alternateActions[formType]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
