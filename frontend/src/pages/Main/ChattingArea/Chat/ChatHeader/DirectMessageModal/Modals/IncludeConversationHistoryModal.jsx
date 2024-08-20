import React from 'react';
import './IncludeConversationHistoryModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const IncludeConversationHistoryModal = ({ onClose, onBack, onDone }) => {
  return (
    <div className="include-conversation-history-modal-overlay">
      <div className="include-conversation-history-modal-content">
        <div className="include-conversation-history-modal-header">
          <h3>Include conversation history?</h3>
          <button
            className="include-conversation-history-modal-close"
            onClick={onClose}
            aria-label="close include conversation history modal"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="include-conversation-history-modal-body">
          <p>Choose whether John Doe can see past messages and files once they’re added to the conversation.</p>
          <label>
            <input type="radio" name="history" value="none" />
            Don’t include any conversation history
          </label>
          <label>
            <input type="radio" name="history" value="today" />
            From today
          </label>
          <label>
            <input type="radio" name="history" value="beginning" />
            From the beginning
          </label>
          <label>
            <input type="radio" name="history" value="custom" />
            Custom
          </label>
          <input type="date" className="include-conversation-history-modal-date" />
          <p style={{ margin: '0', marginTop: '20px', color: '#9B9999', fontSize: '12px' }}>This let everyone to see past messages and files once they added to the conversation</p>
          <p style={{ marginTop: '10px', color: '#9B9999', fontSize: '12px' }}>Once done it cannot be undone</p>
        </div>
        <div className="include-conversation-history-modal-footer">
          <button className="include-conversation-history-modal-back" onClick={onBack}>Back</button>
          <button className="include-conversation-history-modal-done" onClick={onDone}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default IncludeConversationHistoryModal;
