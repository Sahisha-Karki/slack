import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faVideo as faScreenRecord, // Use this for screen recording icon
  faFont,
  faBold,
  faItalic,
  faListUl,
  faAt,
  faLink,
  faCode,
  faPaperPlane,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faListOl,
  faStop // Import the stop icon
} from '@fortawesome/free-solid-svg-icons';
import '../../Styles/MessageInput/MessageInput.css';
import Tooltip from '@mui/material/Tooltip';
import AddFile from './Icons/AddFile';
import AddImage from './Icons/AddImage';
import EmojiPickerComponent from './Icons/EmojiPicker';

const MessageToolbar = ({ 
  handleEmojiSelect, 
  handleLinkInsert, 
  handleSend, 
  setMessage,
  message, 
  isLoading,
  setAudioBlob,
  setVideoBlob
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  
  // Function to start screen recording
  const startScreenRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setStream(screenStream);
      const mediaRecorder = new MediaRecorder(screenStream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setVideoBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setOpenModal(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing screen: ", err);
    }
  };

  // Function to stop screen recording
  const stopScreenRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setStream(null);
      setIsRecording(false);
    }
  };

  // Function to start audio recording
  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing audio:', err);
    }
  };

  // Function to stop audio recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Close the modal
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="toolbar-icons">
      <div className="icon-section first-icon-section">
        <AddFile />
        <AddImage />
        <button
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
          aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
        </button>
        <button 
          title={isRecording ? "Stop Screen Recording" : "Start Screen Recording"} 
          aria-label={isRecording ? "Stop Screen Recording" : "Start Screen Recording"} 
          onClick={isRecording ? stopScreenRecording : startScreenRecording}
        >
          <FontAwesomeIcon icon={faScreenRecord} />
        </button>
        <EmojiPickerComponent onSelect={handleEmojiSelect} />
      </div>

      <div className="icon-section second-icon-section">
        <button title="Change Font" aria-label="Change Font" disabled>
          <FontAwesomeIcon icon={faFont} />
        </button>
        <button title="Bold" aria-label="Bold" disabled>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button title="Italic" aria-label="Italic" disabled>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button title="Bullet Points" aria-label="Bullet Points" disabled>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button title="Numbered List" aria-label="Numbered List" disabled>
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>

      <div className="icon-section third-icon-section">
        <button title="Align Left" aria-label="Align Left" disabled>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button title="Align Center" aria-label="Align Center" disabled>
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button title="Align Right" aria-label="Align Right" disabled>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button title="Mention" aria-label="Mention" disabled>
          <FontAwesomeIcon icon={faAt} />
        </button>
        <button title="Insert Link" onClick={handleLinkInsert} aria-label="Insert Link">
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button title="Code" aria-label="Code" disabled>
          <FontAwesomeIcon icon={faCode} />
        </button>
      </div>

      <div className="icon-section forth-icon-section">
        <Tooltip title="Send Message" arrow>
          <button
            className="send-button"
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            aria-label="Send Message"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageToolbar;
