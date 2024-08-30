import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faVideoSlash,
  faMicrophoneSlash,
  faVolumeUp,
  faPencilAlt, 
  faCommentDots,  
  faVolumeMute,
  faExpandArrowsAlt,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./SessionModal.css";
import SignalIconModal from './SignalIconModal/SignalIconModal';
import CanvasModal from './CanvasModal/CanvasModal'; 
import AddPeopleModal from "./AddPeopleModal/AddPeopleModal";

const SIGNAL_ICON = "./images/videocallIcon/signal.png";
const MINIMIZE_ICON = "./images/videocallIcon/minimize.png";
const SCREENS_SHARE_ICON = "./images/videocallIcon/screenshare.png";
const SMILEY_ICON = "./images/videocallIcon/smiley.png";
const SETTING_ICON = "./images/videocallIcon/setting.png";
const ADD_PEOPLE_ICON = "./images/videocallIcon/addpeople.png";

const SessionModal = ({ isOpen, onClose }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Default minimized state

  const [participants, setParticipants] = useState([
    { name: "Participant 1", isMicOn: true, imgSrc: "./images/profile1.jpg" },
    { name: "Participant 2", isMicOn: false, imgSrc: "./images/profile2.jpg" },
  ]);

  const [screenShareStream, setScreenShareStream] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Reset to minimized state every time the modal is opened
      setIsMinimized(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Prevent closing when clicking outside
        // if (event.target.classList.contains('session-modal-overlay')) {
        //   onClose();
        // }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVolume = () => setIsVolumeOn(!isVolumeOn);
  const toggleSignalModal = () => setIsSignalModalOpen(!isSignalModalOpen);
  const toggleCanvasModal = () => setIsCanvasModalOpen(!isCanvasModalOpen);
  const toggleAddPeopleModal = () => setIsAddPeopleModalOpen(!isAddPeopleModalOpen);
  
  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenShareStream(stream);
      setIsSharing(true);
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenShareStream) {
      screenShareStream.getTracks().forEach(track => track.stop());
      setScreenShareStream(null);
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="session-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) {
        // Optionally disable this to prevent closing when clicking outside
        // onClose();
      }
    }}>
      <div
        className={`session-modal-content ${isMinimized ? 'minimized' : ''}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="session-modal-header">
          <div className="session-navbar-title">
            <FontAwesomeIcon icon={faVideo} />
            <span>Session</span>
          </div>
          <button
            className="session-close-button"
            onClick={isMinimized ? toggleMinimize : onClose}
          >
            <FontAwesomeIcon icon={isMinimized ? faExpandArrowsAlt : faTimes} />
          </button>
        </div>
        <div className={`session-modal-body ${isMinimized ? 'minimized' : ''}`}>
          {isMinimized ? (
            <div className="minimized-content">
              <div className="minimized-video-container">
                {participants.map((participant, index) => (
                  <div key={index} className="minimized-profile-box">
                    <img
                      src={participant.imgSrc}
                      alt={`Participant ${index + 1}`}
                      className="minimized-profile-image"
                    />
                  </div>
                ))}
              </div>
              <div className="minimized-control-bar">
                <div className="icon-container">
                  <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
                </div>
                <div className="icon-container">
                  <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
                </div>
                <div className="icon-container" onClick={startScreenSharing}>
                  <img src={SCREENS_SHARE_ICON} alt="screenshare" />
                </div>
                <button className="end-call" onClick={onClose}>
                  End
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="video-grid">
                {participants.map((participant, index) => (
                  <div key={index} className="video-container">
                    <img
                      src={participant.imgSrc}
                      alt={`Participant ${index + 1}`}
                      className="video-feed"
                    />
                    <div className="participant-info">
                      <FontAwesomeIcon
                        icon={participant.isMicOn ? faMicrophone : faMicrophoneSlash}
                        className={participant.isMicOn ? "mic-on" : "mic-off"}
                      />
                      <span className="participant-name">{participant.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="control-bar">
          <div className="left-controls">
            <button className="icon-container" onClick={toggleSignalModal}>
              <img src={SIGNAL_ICON} alt="signal" />
            </button>
            <button className="icon-container" onClick={toggleMinimize}>
              <img src={MINIMIZE_ICON} alt="minimize" />
            </button>
          </div>
          <div className="center-controls">
            <button className="end-call" onClick={onClose}>
              End
            </button>
            <button className="icon-container" onClick={toggleVideo}>
              <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
            </button>
            <button className="icon-container" onClick={toggleVolume}>
              <FontAwesomeIcon icon={isVolumeOn ? faVolumeUp : faVolumeMute} />
            </button>
            <button className="icon-container" onClick={toggleMic}>
              <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
            </button>
            <button className="icon-container" onClick={startScreenSharing}>
              <img src={SCREENS_SHARE_ICON} alt="screenshare" />
            </button>
            <button className="icon-container">
              <img src={SMILEY_ICON} alt="smiley" />
            </button>
            <button className="icon-container">
              <img src={SETTING_ICON} alt="settings" />
            </button>
            <button className="icon-container" onClick={toggleAddPeopleModal}>
              <img src={ADD_PEOPLE_ICON} alt="add people" />
            </button>
          </div>
          <div className="right-controls">
            <button className="icon-container" onClick={toggleCanvasModal}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button className="icon-container">
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
          </div>
        </div>
        {isSharing && (
          <div className="screenshare-overlay">
            <div className="screenshare-preview">
              <video
                autoPlay
                muted
                playsInline
                srcObject={screenShareStream}
                className="screenshare-video"
              />
              <button className="screenshare-stop-button" onClick={stopScreenSharing}>Stop Sharing</button>
            </div>
          </div>
        )}
      </div>
      {isSignalModalOpen && <SignalIconModal isOpen={isSignalModalOpen} onClose={toggleSignalModal} />}
      {isCanvasModalOpen && <CanvasModal isOpen={isCanvasModalOpen} onClose={toggleCanvasModal} />}
      {isAddPeopleModalOpen && <AddPeopleModal isOpen={isAddPeopleModalOpen} onClose={toggleAddPeopleModal} />}
    </div>
  );
};

export default SessionModal;
