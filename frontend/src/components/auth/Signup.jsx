import React, { useState } from 'react';
import '../../Styles/auth/AuthForm.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password, confirmPassword });
      console.log('Signup successful:', response.data);

      // Navigate to OTP verification page with verificationType state
      console.log('Navigating to /otp');
      navigate('/otp', { state: { verificationType: 'user' } });
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignup}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formType="signup"
    />
  );
}

export default Signup;
