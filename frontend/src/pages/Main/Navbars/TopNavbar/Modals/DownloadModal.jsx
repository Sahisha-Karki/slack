import React, { useState } from 'react';
import './DownloadModal.css';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import the new component

const DownloadModal = ({ files = [], onClose, onVisitFolder, onRemove, onClearAll }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleClearAll = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    onClearAll();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="download-modal-overlay">
      <div className="download-modal">
        <div className="download-modal-header">
          <h2>Downloads</h2>
          <button className="clear-all" onClick={handleClearAll}>
            <i className="fas fa-broom"></i> Clear all
          </button>
          <button className="dld_close" onClick={onClose}>×</button>
        </div>
        <div className="download-list">
          {files.length === 0 ? (
            <p>No files downloaded.</p>
          ) : (
            files.map((file, index) => (
              <div key={index} className="download-modal-download-item">
                <img src={file.icon} alt={`${file.name} icon`} className="download-modal-file-icon" />
                <span className="download-modal-file-name">{file.name}</span>
                <div className="action-buttons">
                  <button className="action-button move" onClick={() => onVisitFolder(file)}>
                    <i className="fas fa-folder-open"></i>
                  </button>
                  <button className="action-button delete" onClick={() => onRemove(file)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default DownloadModal;
