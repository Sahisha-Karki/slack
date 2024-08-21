import React from 'react';
import './RecordingPreviewModal.css'; // Ensure you have the CSS for styling
import { FaDownload, FaRedo, FaCheckCircle } from 'react-icons/fa'; // Import icons

const RecordingPreviewModal = ({ open, onClose, previewUrl, onStartOver, onDone }) => {
  if (!open) return null;

  const handleStartOver = () => {
    if (onStartOver) onStartOver();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleDone = () => {
    if (onDone) onDone();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Recording Preview</h2>
          <div className="custom-modal-buttons">
            <a className="custom-modal-button start-over" onClick={handleStartOver}>
              <FaRedo /> Start Over
            </a>
            <a className="custom-modal-close" onClick={handleClose}>
              &times;
            </a>
          </div>
        </div>
        <div className="custom-modal-body">
          {previewUrl && (
            <video controls src={previewUrl} className="custom-modal-video" />
          )}
        </div>
        <div className="custom-modal-footer">
          <a href={previewUrl} download="recording.webm" className="custom-modal-button download">
            <FaDownload /> Download
          </a>
          <a className="custom-modal-button done" onClick={handleDone}>
            <FaCheckCircle /> Done
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecordingPreviewModal;
