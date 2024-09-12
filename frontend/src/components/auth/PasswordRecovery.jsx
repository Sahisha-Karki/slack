import React, { useState } from 'react';
import '../../Styles/auth/AuthForm.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

function Recovery() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRecovery = async (e) => {
        e.preventDefault();

        // Simple email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        try {
            // Send recovery request
            const response = await axios.post('http://localhost:5000/api/auth/request-password-recovery', { email });
            console.log('Recovery email sent');
    
            // Store email in local storage
            localStorage.setItem('email', email);
    
            // Determine the verification type based on the response or any additional logic
            const verificationType = response.data.verificationType || 'pw-recover'; // Default to 'pw-recover' if not provided
    
            // Navigate to OTP verification with the appropriate verification type
            navigate('/otp', { state: { verificationType } });
    
        } catch (error) {
            // Network or server error
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Recovery error:', error.response.data.message);
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                // No response received
                console.error('Network error:', error.message);
                setErrorMessage('Network error. Please check your connection and try again.');
            } else {
                // Other errors
                console.error('Error:', error.message);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <AuthForm
            onSubmit={handleRecovery}
            email={email}
            setEmail={setEmail}
            formType="recovery"
            errorMessage={errorMessage} // Pass the error message to the AuthForm component
        />
    );
}

export default Recovery;
