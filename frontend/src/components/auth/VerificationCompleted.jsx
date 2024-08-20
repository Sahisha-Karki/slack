import React, { useEffect } from 'react';
import '../../Styles/auth/Otp.css';
import { useNavigate } from 'react-router-dom';

function VerificationCompleted() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after a 2-second delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 2 seconds delay

    // Clear the timer if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="verification-completed">
      <div className="verification-container">
        {/* <div className="verification-logo">
          <img src="./images/slack.svg.png" alt="Slack" />
        </div> */}
        <div className="verification-icon">
         <img src="./images/verify.png" alt="VerifiedIcon" />
        </div>
        <div className="verification-message">
          <h2>Verification Completed</h2>
          <p>
            You’re redirecting to slack home page, just wait a second, If not, <a href="/">click here</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerificationCompleted;
