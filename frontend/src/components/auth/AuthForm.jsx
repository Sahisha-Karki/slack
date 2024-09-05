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
  emailError,
  passwordError,
  confirmPasswordError,
}) {
  const [rememberMe, setRememberMe] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const passwordRules = {
    minLength: 8,
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    number: /[0-9]/,
    specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validatePassword = (pwd) => {
    let error = '';
    if (pwd.length < passwordRules.minLength) error = 'Password must be at least 8 characters long.';
    else if (!passwordRules.upperCase.test(pwd)) error = 'Password must contain at least one uppercase letter.';
    else if (!passwordRules.lowerCase.test(pwd)) error = 'Password must contain at least one lowercase letter.';
    else if (!passwordRules.number.test(pwd)) error = 'Password must contain at least one number.';
    else if (!passwordRules.specialCharacter.test(pwd)) error = 'Password must contain at least one special character.';
    return error;
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    if (formType === 'signup') {
      const error = validatePassword(pwd);
      setErrors((prevErrors) => ({ ...prevErrors, password: error }));
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: '', password: '', confirmPassword: '' };
  
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
  
    if (formType === 'signup') {
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
        valid = false;
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
        valid = false;
      }
    } else if (formType === 'login') {
      // For login, you might want to check if the password is non-empty or any other condition
      if (!password) {
        newErrors.password = 'Password is required.';
        valid = false;
      }
    }
  
    setErrors(newErrors);
  
    if (valid && onSubmit) {
      try {
        await onSubmit(e);
      } catch (error) {
        console.error('Form submission error:', error);
      }
  
      if (formType === "newWorkspace") {
        setOtpSent(true);
      }
    }
  };
  

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
                <h2>{renderHeader()}</h2>
                <p>{renderMessage()}</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="auth-form">
              <div className="auth-fields">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <div className="auth-error-message">{emailError}</div>}

                {formType !== "recovery" && formType !== "newWorkspace" && (
                  <>
                    <div className="auth-password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                      />
                      <span
                        className={`auth-password-toggle ${passwordError ? 'error-visible' : ''}`}
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>

                      {passwordError && (
                        <div className="auth-error-message">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    {formType === "login" && (
                      <div className="auth-options">
                        <div className="remember-me">
                          <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label htmlFor="remember-me">Remember Me</label>
                        </div>
                        <div className="forgot-password">
                          <a href="/recovery">Forgot your password?</a>
                        </div>
                      </div>
                    )}

                    {confirmPassword !== undefined && (
                      <div className="auth-password-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Re-enter Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        {confirmPasswordError && (
                          <div className="auth-error-message">
                            {confirmPasswordError}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <button type="submit" className="auth-button auth-button-primary">
                {renderSubmitButtonText()}
              </button>
            </form>

            {formType === "newWorkspace" && otpSent && (
              <div className="workspace-otp-message">
                We’ll email you an OTP code to verify your account.
              </div>
            )}

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

            <div className="auth-message">
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
