import React, { useState, useEffect, useRef } from 'react';
import '../../Styles/auth/Otp.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function OTPVerification() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [verificationType, setVerificationType] = useState('user'); // Default to 'user' for registration/workspace
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  const firstInputRef = useRef(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/signup'); // Redirect if email is not found
    }

    if (location.state?.verificationType) {
      setVerificationType(location.state.verificationType);
    }
  }, [navigate, location.state]);

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      const verifyOtp = async () => {
        setLoading(true);
        setErrorMessage('');
      
        try {
          const url = verificationType === 'pw-recover'
            ? 'http://localhost:5000/api/auth/verify-password-recovery-otp'
            : verificationType === 'workspace'
            ? 'http://localhost:5000/api/workspaces/verify-otp'
            : 'http://localhost:5000/api/auth/verify-otp';
      
          const response = await axios.post(url, {
            email,
            otp: otp.join(''),
          });
      
          // Store OTP in localStorage
          localStorage.setItem('otp', otp.join(''));
      
          setTimeout(() => {
            console.log('OTP verified successfully');
            const redirectPath = verificationType === 'pw-recover'
              ? '/password-reset'
              : verificationType === 'workspace'
              ? '/workspace-creation'
              : '/verified';
            navigate(redirectPath);
          }, 1000);
      
        } catch (error) {
          const message = error.response?.data?.message || 'An error occurred';
          console.error('OTP verification error:', message);
      
          setLoading(false);
          setErrorMessage(message.includes('expired')
            ? 'It looks like your OTP has expired. Please click "Resend OTP" to receive a new code.'
            : 'The OTP you entered seems to be incorrect. Please check the code and try again.');
      
          // Clear OTP fields but keep the error message
          setOtp(Array(6).fill(''));
      
          // Focus on the first input field
          setTimeout(() => {
            if (firstInputRef.current) {
              firstInputRef.current.focus();
            }
          }, 0);
        }
      };
      
      verifyOtp();
    }
  }, [otp, email, navigate, verificationType]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      setOtp(otp.map((digit, i) => (i === index ? value : digit)));
      if (index < 5 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value.length === 6 && /^[0-9]{6}$/.test(value)) {
      setOtp(value.split(''));
      document.getElementById(`otp-input-5`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^[0-9]{6}$/.test(pastedData)) {
      setOtp(pastedData.split(''));
      document.getElementById(`otp-input-5`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index] === '') {
        if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp);
          setTimeout(() => {
            document.getElementById(`otp-input-${index - 1}`).focus();
          }, 0);
        }
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    try {
      const url = verificationType === 'pw-recover'
        ? 'http://localhost:5000/api/auth/resend-password-recovery-otp'
        : verificationType === 'workspace'
        ? 'http://localhost:5000/api/workspaces/resend-otp'
        : 'http://localhost:5000/api/auth/resend-otp';

      await axios.post(url, { email });
      setResendDisabled(true);
      setResendMessage('OTP resent. Check your email.');

      // Start countdown timer
      let countdown = 60;
      setResendCountdown(countdown);
      const timer = setInterval(() => {
        countdown -= 1;
        setResendCountdown(countdown);
        if (countdown <= 0) {
          clearInterval(timer);
          setResendDisabled(false);
          setResendMessage('You can resend the code now.');
        }
      }, 1000);

    } catch (error) {
      setErrorMessage('Failed to resend OTP. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="otp-verification">
      <div className="otp-main-container">
        <div className="otp-sub-container">
          <div className="otp-container">
            <div className="otp-container-logo">
              <img src="./images/slack.svg.png" alt="Slack" />
            </div>
            <div className="otp-header">
              <h2>Check E-mail for Verification Code</h2>
              <p>We’ve sent you a six-digit code in your mail. The code expires shortly, please enter it soon.</p>
            </div>
            <form className="otp-form" onSubmit={(e) => e.preventDefault()}>
              <div className="otp-fields">
                <label htmlFor="verification-code">Enter Code Here:</label>
                <div className="code-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`otp-input-${index}`}
                      maxLength="1"
                      className={`code-input ${errorMessage ? 'error-border' : ''}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onPaste={handlePaste}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={index === 0 ? firstInputRef : null}
                    />
                  ))}
                </div>
              </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="resend-message">
              <p>
                {resendDisabled 
                  ? `Hold tight! You can request a new code in ${resendCountdown}s` 
                  : `Didn’t receive the code? No worries, `}
                <button 
                  onClick={handleResendOTP} 
                  disabled={resendDisabled}
                  className="resend-button"
                >
                  Resend it
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-popup">
          <p>Verifying OTP...</p>
        </div>
      )}
    </div>
  );
}

export default OTPVerification;
