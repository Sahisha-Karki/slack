import React, { useState } from 'react';
import './DownloadModal.css';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal component

const DownloadModal = ({ files = [], onClose, onVisitFolder, onRemove, onClearAll }) => {
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const handleClearAll = () => {
    setShowClearAllModal(true);
  };

  const handleDeleteFile = (file) => {
    setFileToDelete(file);
    setShowDeleteFileModal(true);
  };

  const confirmClearAll = () => {
    onClearAll();
    setShowClearAllModal(false);
  };

  const confirmDeleteFile = () => {
    if (fileToDelete) {
      onRemove(fileToDelete);
      setFileToDelete(null);
    }
    setShowDeleteFileModal(false);
  };

  return (
    <div className="download-modal-overlay">
      <div className="download-modal">
        <div className="download-modal-header">
          <h2>Downloads</h2>
          <div className="header-buttons">
            <button className="clear-all" onClick={handleClearAll}>
              <img src="./images/HistoryModal/carbon_clean.png" alt="Clear All" />
              Clear All
            </button>
            <button className="dld_close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="download-list">
          {files.length === 0 ? (
            <p>No files downloaded.</p>
          ) : (
            files.map((file, index) => (
              <div key={index} className="download-modal-download-item">
                <img src={file.icon} alt={`${file.name} icon`} className="download-modal-file-icon" />
                <span className="download-modal-file-name">{file.name}</span>
                <div className="download-modal-action-buttons">
                  <button className="download-modal-action-button" onClick={() => onVisitFolder(file)}>
                    <img src="./images/HistoryModal/gravity-ui_folder.png" alt="folder" />
                  </button>
                  <div className="download-modal-divider"></div>
                  <button className="download-modal-action-button" onClick={() => handleDeleteFile(file)}>
                    <img src="./images/HistoryModal/delete-outline.png" alt="DeleteIcon" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmationModal
        isVisible={showClearAllModal}
        title="Clear all downloads?"
        message="Are you sure you want to clear all downloaded files? Once, it’s done it cannot be undone."
        onClose={() => setShowClearAllModal(false)}
        onConfirm={confirmClearAll}
        confirmButtonText="Delete All"
      />

      <ConfirmationModal
        isVisible={showDeleteFileModal}
        title="Delete download?"
        message="Are you sure you want to delete this file? Once, it’s done it cannot be undone."
        onClose={() => setShowDeleteFileModal(false)}
        onConfirm={confirmDeleteFile}
        confirmButtonText="Delete"
      />
    </div>
  );
};

export default DownloadModal;
