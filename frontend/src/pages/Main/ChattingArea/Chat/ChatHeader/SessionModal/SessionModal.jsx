import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faVideoSlash,
  faMicrophoneSlash,
  faVolumeUp,
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
const CALL_ICON = "./images/videocallIcon/call.png";
const SCREENS_SHARE_ICON = "./images/videocallIcon/screenshare.png";
const SMILEY_ICON = "./images/videocallIcon/smiley.png";
const SETTING_ICON = "./images/videocallIcon/setting.png";
const ADD_PEOPLE_ICON = "./images/videocallIcon/addpeople.png";
const CANVAS_ICON = "./images/videocallIcon/canvas.png";
const CHAT_ICON = "./images/videocallIcon/chat.png";

const SessionModal = ({ isOpen, onClose }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [participants, setParticipants] = useState([
    { name: "Participant 1", isMicOn: true, imgSrc: "./images/profile1.jpg" },
    { name: "Participant 2", isMicOn: false, imgSrc: "./images/profile2.jpg" },
  ]);

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVolume = () => setIsVolumeOn(!isVolumeOn);
  const toggleSignalModal = () => setIsSignalModalOpen(!isSignalModalOpen);
  const toggleCanvasModal = () => setIsCanvasModalOpen(!isCanvasModalOpen);
  const toggleAddPeopleModal = () => setIsAddPeopleModalOpen(!isAddPeopleModalOpen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (event.target.classList.contains('session-modal-overlay')) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="session-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div
        className={`session-modal-content ${isMinimized ? 'minimized' : ''}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="session-modal-navbar">
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
              <div className="minimized-footer">
                <div className="icon-container">
                  <img src={CALL_ICON} alt="call" />
                </div>
                <div className="icon-container">
                  <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
                </div>
                <div className="icon-container">
                  <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
                </div>
                <div className="icon-container">
                  <img src={SCREENS_SHARE_ICON} alt="screenshare" />
                </div>
                <button className="leave-button">Leave</button>
              </div>
            </div>
          ) : (
            <>
              <div className="volume-control">
                <button onClick={toggleVolume}>
                  <FontAwesomeIcon icon={isVolumeOn ? faVolumeUp : faVolumeMute} />
                </button>
              </div>
              <div className="video-container">
                {participants.map((participant, index) => (
                  <div key={index} className="video-box">
                    <div className="video-screen">
                      <img
                        src={participant.imgSrc}
                        alt={`Participant ${index + 1}`}
                        className="video-image"
                      />
                      <div className="participant-info">
                        <div className="participant-avatar">
                          <FontAwesomeIcon
                            icon={
                              participant.isMicOn ? faMicrophone : faMicrophoneSlash
                            }
                          />
                        </div>
                        <span className="participant-name">{participant.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="session-footer">
                <div className="session-controls">
                  <div className="left-controls">
                    <div className="icon-container" onClick={toggleSignalModal}>
                      <img src={SIGNAL_ICON} alt="signal" />
                    </div>
                    <div className="icon-container" onClick={toggleMinimize}>
                      <img src={MINIMIZE_ICON} alt="minimize" />
                    </div>
                  </div>
                  <div className="center-controls">
                    <div className="icon-container">
                      <img src={CALL_ICON} alt="call" />
                    </div>
                    <div className="icon-container">
                      <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
                    </div>
                    <div className="icon-container">
                      <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
                    </div>
                    <div className="icon-container">
                      <img src={SCREENS_SHARE_ICON} alt="screenshare" />
                    </div>
                    <div className="icon-container">
                      <img src={SMILEY_ICON} alt="smiley" />
                    </div>
                    <div className="icon-container">
                      <img src={SETTING_ICON} alt="settings" />
                    </div>
                    <div className="icon-container" onClick={toggleAddPeopleModal}>
                      <img src={ADD_PEOPLE_ICON} alt="add people" />
                    </div>
                  </div>
                  <div className="right-controls">
                    {isCanvasModalOpen && (
                      <CanvasModal isOpen={isCanvasModalOpen} onClose={toggleCanvasModal} />
                    )}
                    <div className="icon-container" onClick={toggleCanvasModal}>
                      <img src={CANVAS_ICON} alt="canvas" />
                    </div>
                    <div className="icon-container">
                      <img src={CHAT_ICON} alt="chat" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isSignalModalOpen && (
        <SignalIconModal 
          isOpen={isSignalModalOpen} 
          onClose={() => setIsSignalModalOpen(false)} 
        />
      )}
      {isAddPeopleModalOpen && (
        <AddPeopleModal 
          isOpen={isAddPeopleModalOpen} 
          onClose={toggleAddPeopleModal} 
        />
      )}
    </div>
  );
};

export default SessionModal;
