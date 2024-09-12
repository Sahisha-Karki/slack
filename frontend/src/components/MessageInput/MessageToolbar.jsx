import React, { useState, useRef, useEffect } from 'react';
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
  faStop,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import '../../Styles/MessageInput/MessageInput.css';
import Tooltip from '@mui/material/Tooltip';
import AddFile from './Icons/AddFile';
import AddImage from './Icons/AddImage';
import EmojiPickerComponent from './Icons/EmojiPicker';
import EmojiUploadModal from './Icons/EmojiuploadModal';

const MessageToolbar = ({ 
  handleEmojiSelect, 
  handleLinkInsert, 
  handleSend,
  handleImageSelect, 
  setMessage,
  message, 
  isLoading,
  setAudioBlob,
  setVideoBlob,
  applyFormatting,
  onMention,
}) => {
  const [isMicRecording, setIsMicRecording] = useState(false);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openEmojiModal, setOpenEmojiModal] = useState(false); // Add state to handle Emoji modal
  const [recordingTime, setRecordingTime] = useState(60); // Countdown time in seconds
  const [timerId, setTimerId] = useState(null); // Store timer ID for clearing
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  
  const startMicRecording = async () => {
    try {
      // Request access to the microphone
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
        setAudioBlob(blob); // Set audio blob
      };

      mediaRecorder.start();
      setIsMicRecording(true);
      setRecordingTime(60); // Reset countdown time to 60 seconds
      const id = setInterval(() => {
        setRecordingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(id);
            stopMicRecording();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setTimerId(id);
    } catch (err) {
      console.error('Error accessing audio:', err);
      alert('Failed to access microphone. Please check your permissions.');
    }
  };

  const stopMicRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsMicRecording(false);
      clearInterval(timerId); // Clear the timer when stopping the recording
    } else {
      console.error('No media recorder instance found.');
    }
  };
  
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
      setIsScreenRecording(true);
    } catch (err) {
      console.error("Error accessing screen: ", err);
      alert('Failed to access screen recording. Please check your permissions.');
    }
  };
  
  const stopScreenRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setStream(null);
      setIsScreenRecording(false);
    } else {
      console.error('No media recorder instance found.');
    }
  };
  
  // Close the modal
  const handleCloseModal = () => setOpenModal(false);

    
  // Handle opening the emoji upload modal
  const handleUploadEmojiClick = () => setOpenEmojiModal(true);
  
 // Handle emoji selection
 const handleEmojiSelection = (emojiData) => {
  handleEmojiSelect(emojiData); // Call the passed-in handler
  setOpenEmojiModal(false); // Close the emoji upload modal if needed
};
  
  return (
    <div className="toolbar-icons">
      <div className="icon-section first-icon-section">
        <AddFile />
        <AddImage onImageSelect={handleImageSelect} />
        <button
          title={isMicRecording ? 'Stop Microphone Recording' : 'Start Microphone Recording'}
          aria-label={isMicRecording ? 'Stop Microphone Recording' : 'Start Microphone Recording'}
          onClick={isMicRecording ? stopMicRecording : startMicRecording}
        >
          <FontAwesomeIcon icon={isMicRecording ? faStop : faMicrophone} />
        </button>
        <button 
          title={isScreenRecording ? "Stop Screen Recording" : "Start Screen Recording"} 
          aria-label={isScreenRecording ? "Stop Screen Recording" : "Start Screen Recording"} 
          onClick={isScreenRecording ? stopScreenRecording : startScreenRecording}
        >
          <FontAwesomeIcon icon={isScreenRecording ? faStop : faScreenRecord} />
        </button>
        <EmojiPickerComponent onSelect={handleEmojiSelection} />
        <button
          title="Upload Emoji"
          onClick={handleUploadEmojiClick} // Open the upload emoji modal
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>

      <div className="icon-section second-icon-section">
        <button title="Bold" aria-label="Bold" onClick={() => applyFormatting('bold')}>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button title="Italic" aria-label="Italic" onClick={() => applyFormatting('italic')}>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button title="Bullet Points" aria-label="Bullet Points" onClick={() => applyFormatting('insertUnorderedList')}>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button title="Numbered List" aria-label="Numbered List" onClick={() => applyFormatting('insertOrderedList')}>
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>

      <div className="icon-section third-icon-section">
        <button title="Align Left" aria-label="Align Left" onClick={() => applyFormatting('justifyLeft')}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button title="Align Center" aria-label="Align Center" onClick={() => applyFormatting('justifyCenter')}>
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button title="Align Right" aria-label="Align Right" onClick={() => applyFormatting('justifyRight')}>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button title="Mention" onClick={onMention}>
          <FontAwesomeIcon icon={faAt} />
        </button>
        <button title="Insert Link" onClick={handleLinkInsert} aria-label="Insert Link">
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button
          title="Code"
          aria-label="Code"
          onClick={() => applyFormatting('code')}
        >
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

      {isMicRecording && (
        <div className="recording-timer">
          Mic Recording Time: {recordingTime}s
        </div>
      )}
      {isScreenRecording && (
        <div className="recording-timer">
          Screen Recording Time: {recordingTime}s
        </div>
      )}

      {/* Emoji Upload Modal */}
      <EmojiUploadModal 
        isOpen={openEmojiModal}
        onClose={() => setOpenEmojiModal(false)}
        onEmojiUpload={handleEmojiSelect} // Directly handle emoji upload
      />
    </div>
  );
};

export default MessageToolbar;