import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Main from './pages/Main/Main';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './components/auth/Login';
import SignupPage from './components/auth/Signup';
import RecoveryPage from './components/auth/PasswordRecovery';
import OTPVerificationPage from './components/auth/OTPVerification';
import VerificationCompleted from './components/auth/VerificationCompleted';
import NewWorkspaceForm from './components/auth/NewWorkspaceForm';
import WorkspaceCreation from './pages/WelcomePage/WorkspaceCreation/WorkspaceRoutes';

const App = () => {
  return (
    <Router>
          <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/otp" element={<OTPVerificationPage />} />
        <Route path="/verified" element={<VerificationCompleted />} />
        <Route path="/workspace-login" element={<NewWorkspaceForm />} />
        <Route path="/workspace-creation" element={<WorkspaceCreation />} />

        <Route path="/main/*" element={<Main />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
      </div>
    </Router>
    
  );
};

export default App