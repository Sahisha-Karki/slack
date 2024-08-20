import React from 'react';
import '../../../src/Styles/Setting/ToggleButton.css';

const ToggleButton = ({ isOn, onClick }) => {
  return (
    <div 
      className={`toggle-button ${isOn ? 'on' : 'off'}`} 
      onClick={onClick}
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className={`toggle-switch ${isOn ? 'on' : 'off'}`}>
        {isOn ? 
          <span className="icon">✔

            {/* <img src={`${process.env.PUBLIC_URL}/check.png`} alt="Check Icon" /> */}
          </span> 
          : 
          <span className="icon">✖
</span>}
      </div>
    </div>
  );
};

export default ToggleButton;
