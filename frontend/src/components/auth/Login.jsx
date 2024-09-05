import React, { useState } from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Login successful:', response.data);

      // Save token and userId to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      navigate('/welcome');
    } catch (error) {
      if (error.response?.status === 404) {
        setEmailError('Email not registered');
      } else if (error.response?.status === 401) {
        setPasswordError('Incorrect password');
      } else {
        console.error('Login error:', error.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formType="login"
      emailError={emailError}
      passwordError={passwordError}
    />
  );
}

export default Login;
