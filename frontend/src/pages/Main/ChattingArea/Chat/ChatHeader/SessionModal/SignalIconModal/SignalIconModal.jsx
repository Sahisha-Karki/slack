import React, { useState } from 'react';
import './SignalIconModal.css'; 

const SignalconModal = ({ isOpen, onClose }) => {
    const [isAudioOnly, setIsAudioOnly] = useState(false);
    const [networkStatus, setNetworkStatus] = useState('Good');
    const [systemStatus, setSystemStatus] = useState('Good');
    const [deviceStatus, setDeviceStatus] = useState('Bad');

    if (!isOpen) return null;

    const toggleAudioOnly = () => setIsAudioOnly(!isAudioOnly);

    const handleStatusChange = (statusType, status) => {
        if (statusType === 'network') setNetworkStatus(status);
        if (statusType === 'system') setSystemStatus(status);
        if (statusType === 'device') setDeviceStatus(status);
    };

    return (
        <div className="signalcon-modal-overlay" onClick={onClose}>
            <div className="signalcon-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="signalcon-modal-header">
                    <div className="signalcon-modal-header-item">
                      <div className="signalcon-modal-body-item">
                        <p className="signalcon-modal-header-title">Can’t access microphone</p>
                        <p className="signalcon-modal-header-description">Check your system settings to make sure Slack has permission to access your microphone.</p>
                      </div>
                    </div>
                    <div className="signalcon-modal-header-item">
                      <div className="signalcon-modal-body-item">
                        <p className="signalcon-modal-header-title">Can’t access Camera</p>
                        <p className="signalcon-modal-header-description">Check your system settings to make sure Slack has permission to access your camera.</p>
                      </div>
                    </div>
                </div>
                <div className="signalcon-modal-header-item">
                    <div className="signalcon-modal-body-item">
                        <p className="signalcon-modal-header-title">Audio-only mode</p>
                        <p className="signalcon-modal-header-description">Turn off videos and camera to improve performance.</p>
                        <div className="signalcon-modal-button-container">
                            <button onClick={toggleAudioOnly} className={`signalcon-modal-toggle-button ${isAudioOnly ? 'on' : 'off'}`}>
                                {isAudioOnly ? 'On' : 'Off'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="signalcon-modal-status-container">
                    <div className="signalcon-modal-status-item">
                        <p>Network</p>
                        <DropdownMenu 
                            currentStatus={networkStatus} 
                            onStatusChange={(status) => handleStatusChange('network', status)} 
                        />
                    </div>
                    <div className="signalcon-modal-status-item">
                        <p>System</p>
                        <DropdownMenu 
                            currentStatus={systemStatus} 
                            onStatusChange={(status) => handleStatusChange('system', status)} 
                        />
                    </div>
                    <div className="signalcon-modal-status-item">
                        <p>Device</p>
                        <DropdownMenu 
                            currentStatus={deviceStatus} 
                            onStatusChange={(status) => handleStatusChange('device', status)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DropdownMenu = ({ currentStatus, onStatusChange }) => {
    const handleChange = (event) => {
        onStatusChange(event.target.value);
    };

    return (
        <div className="signalcon-modal-dropdown-menu">
            <select 
                value={currentStatus} 
                onChange={handleChange} 
                className="signalcon-modal-dropdown-select"
            >
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
            </select>
        </div>
    );
};

export default SignalconModal;
