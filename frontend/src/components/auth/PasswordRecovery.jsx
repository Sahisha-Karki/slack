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
        try {
            // Add your password recovery API call here
            await axios.post('http://localhost:5000/api/auth/recover', { email });
            console.log('Recovery email sent');
        } catch (error) {
            console.error('Recovery error:', error.response?.data?.message || 'An error occurred');
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <AuthForm
            onSubmit={handleRecovery}
            email={email}
            setEmail={setEmail}
            formType="recovery"
        />
    );
}

export default Recovery;
