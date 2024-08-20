import React, { useState, useEffect } from 'react';
import '../../../src/Styles/Setting/AudioVideoSettings.css';
import ToggleButton from './ToggleButton';
import MicTest from './MicTest';
import clickSound from '../../sounds/door_bell.mp3'; // Replace with the correct path to your audio file

const AudioVideoSettings = () => {
    const [camera, setCamera] = useState('Default');
    const [inputDevice, setInputDevice] = useState('Default');
    const [outputDevice, setOutputDevice] = useState('Default');
    const [inputVolume, setInputVolume] = useState(50);
    const [outputVolume, setOutputVolume] = useState(50);
    const [aloneInSession, setAloneInSession] = useState('1 minute');
    const [settings, setSettings] = useState({
        noiseSuppression: true,
        gainControl: true,
    });
    const [cameras, setCameras] = useState(['Default']);
    const [inputDevices, setInputDevices] = useState(['Default']);
    const [outputDevices, setOutputDevices] = useState(['Default']);

    useEffect(() => {
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                setCameras(['Default', ...devices.filter(device => device.kind === 'videoinput').map(device => device.label)]);
                setInputDevices(['Default', ...devices.filter(device => device.kind === 'audioinput').map(device => device.label)]);
                setOutputDevices(['Default', ...devices.filter(device => device.kind === 'audiooutput').map(device => device.label)]);
            } catch (err) {
                console.error('Error fetching devices:', err);
            }
        };
        getDevices();
    }, []);

    const handleInputVolumeChange = (e) => {
        setInputVolume(e.target.value);
    };

    const handleOutputVolumeChange = (e) => {
        setOutputVolume(e.target.value);
    };

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    return (
        <div className="audio-video-settings">
            {/* Video Settings */}
            <div className="settings-card">
                <h2>Video Settings</h2>
                <div className="setting-group">
                    <label>Camera</label>
                    <select value={camera} onChange={(e) => setCamera(e.target.value)}>
                        {cameras.map((cam, index) => (
                            <option key={index} value={cam}>{cam}</option>
                        ))}
                    </select>
                </div>
                <div className="preview">
                    <div className="preview-image">
                        <img src='./images/vector-vintage-camera.png' alt="Camera Icon" />
                    </div>
                    <button className="test-button">Test Video</button>
                </div>
            </div>

            {/* Voice Settings */}
            <div className="settings-card">
                <h2>Voice Settings</h2>
                <div className="setting-row">
                    <div className="setting-group">
                        <label>Input Device</label>
                        <select value={inputDevice} onChange={(e) => setInputDevice(e.target.value)}>
                            {inputDevices.map((device, index) => (
                                <option key={index} value={device}>{device}</option>
                            ))}
                        </select>
                    </div>
                    <div className="slider-grp">
                        <label>Input Volume</label>
                        <input 
                            type="range" 
                            value={inputVolume} 
                            onChange={handleInputVolumeChange} 
                            className="input-slider"
                            min="0" 
                            max="100"
                        />
                        <span className="slider-label">{inputVolume}%</span>
                    </div>
                </div>
                <div className='Mic-Header'>
                    <h2>Mic Test</h2>
                </div>
                <MicTest />
                <div className="setting-row">
                    <div className="setting-group">
                        <label>Output Device</label>
                        <select value={outputDevice} onChange={(e) => setOutputDevice(e.target.value)}>
                            {outputDevices.map((device, index) => (
                                <option key={index} value={device}>{device}</option>
                            ))}
                        </select>
                    </div>
                    <div className="slider-grp">
                        <label>Output Volume</label>
                        <input 
                            type="range" 
                            value={outputVolume} 
                            onChange={handleOutputVolumeChange} 
                            className="output-slider"
                            min="0" 
                            max="100"
                        />
                        <span className="slider-label">{outputVolume}%</span>
                    </div>
                </div>
                <button className="test-button" onClick={playSound}>
                    Click to play sound <span className="sound-icon">🔊</span>
                </button>
            </div>

            {/* Noise Suppression */}
            <div className="settings-card">
                <div className="setting-row1">
                    <h2>Enable Noise Suppression</h2>   
                    <ToggleButton 
                        isOn={settings.noiseSuppression} 
                        onClick={() => handleToggle('noiseSuppression')} 
                    />
                </div>
                <p>If you're looking to cancel all the background noises</p>
            </div>

            {/* Gain Control */}
            <div className="settings-card">
                <div className="setting-row1">
                    <h2>Enable Automatic Gain Control</h2>
                    <ToggleButton 
                        isOn={settings.gainControl} 
                        onClick={() => handleToggle('gainControl')} 
                    />
                </div>
                <p>Ensure your voice stays at a constant level for others you're talking with</p>   
            </div>

            {/* When Joining a Session */}
            <div className="settings-card">
                <h2>When Joining a Session</h2>
                <div className="checkbox-group">
                    <label><input type="checkbox" /> Set my status to "In a Session..."</label>
                    <label><input type="checkbox" /> Mute my microphone</label>
                    <label><input type="checkbox" /> Blur your video background when you're in a session</label>
                    <label><input type="checkbox" /> Automatically turn on captions when you're in session</label>
                    <label><input type="checkbox" /> Send a warning if you're starting a huddle in a channel with more than 150 members</label>
                </div>
            </div>

            {/* When Slack is running in the background */}
            <div className="settings-card">
                <h2>When Slack is running in the background</h2>
                <div className="checkbox-group">
                    <label><input type="checkbox" /> Allow keyboard shortcut to mute</label>
                </div>
                <p>Use "Ctrl + Shift + Space" to mute or unmute your mic</p>
            </div>

            {/* When alone in a Session */}
            <div className="settings-card">
                <h2>When alone in a Session</h2>
                <div className="setting-group">
                    <label>Play music</label>
                    <select value={aloneInSession} onChange={(e) => setAloneInSession(e.target.value)}>
                        <option>1 minute</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                    </select>
                </div>
            </div>

            {/* When your PC locks or screen saver starts */}
            <div className="settings-card">
                <h2>When your PC locks or screen saver starts</h2>
                <div className="checkbox-group">
                    <label><input type="checkbox" /> Automatically leave sessions</label>
                </div>
            </div>
        </div>
    );
};

export default AudioVideoSettings;
