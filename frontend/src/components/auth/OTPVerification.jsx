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
  const [verificationType, setVerificationType] = useState('user');
  const navigate = useNavigate();
  const location = useLocation();
  
  const firstInputRef = useRef(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/signup');
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
          const url = verificationType === 'workspace'
            ? 'http://localhost:5000/api/workspaces/verify-otp'
            : 'http://localhost:5000/api/auth/verify-otp';

          await axios.post(url, {
            email,
            otp: otp.join(''),
          });

          setTimeout(() => {
            console.log('OTP verified successfully');
            const redirectPath = verificationType === 'workspace'
              ? '/workspace-creation'
              : '/verified';
            navigate(redirectPath);
          }, 1000);

        } catch (error) {
          console.error('OTP verification error:', error.response?.data?.message || 'An error occurred');

          setTimeout(() => {
            setLoading(false);
            setErrorMessage('Invalid OTP. Please try again.');

            setTimeout(() => {
              setOtp(Array(6).fill(''));
              setErrorMessage('');
              if (firstInputRef.current) {
                firstInputRef.current.focus();
              }
            }, 2000);
          }, 1000);
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
    } else if (e.key === 'Backspace' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      const url = verificationType === 'workspace'
        ? 'http://localhost:5000/api/workspaces/resend-otp'
        : 'http://localhost:5000/api/auth/resend-otp';

      await axios.post(url, { email });
      setLoading(false);
      setResendMessage('OTP resent. Check your email.');
    } catch (error) {
      setLoading(false);
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
                      className="code-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onFocus={(e) => e.target.select()}
                      ref={index === 0 ? firstInputRef : null}
                    />
                  ))}
                </div>
              </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="resend-message">
              <p>I didn’t receive the code yet, <a href="#" onClick={handleResendOTP}>Resend it</a></p>
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
