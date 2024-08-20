import React, { useState } from 'react';
import CreateProfileStep1 from './Step1';
import CreateWorkspaceStep2 from './Step2';
import CreateWorkspaceStep3 from './Step3';
import CreateWorkspaceStep4 from './Step4';
import CreateWorkspaceStep5 from './Step5';

import '../../Main/Main.css';

const WorkspaceCreation = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    // Move to the next step immediately
    handleNextStep();
  };
  
  return (
    <div className="main-container">
      <div className="main-header">
        {/* TopNav placeholder */}
      </div>
      <div className="main-body">
        <div className="vertical-nav">
          {/* VerticalNav placeholder */}
        </div>
        <div className="main-sidebar">
          {/* SideNav placeholder */}
        </div>
        <div className="main-chat-container">
          <div className="main-content">
            {step === 1 && <CreateProfileStep1 onNext={handleNextStep} />}
            {step === 2 && <CreateWorkspaceStep2 onNext={handleNextStep} />}
            {step === 3 && <CreateWorkspaceStep3 onNext={handleNextStep} onSkip={handleSkip}/>}
            {step === 4 && <CreateWorkspaceStep4 onNext={handleNextStep} />}
            {step === 5 && <CreateWorkspaceStep5 onNext={handleNextStep} />}
            {/* Add further steps here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCreation;
