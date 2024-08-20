import React from 'react';
import ChatHeader from '../../../../../ChattingArea/Chat/ChatHeader/ChatHeader';
import MessageInput from '../../../../../../../components/MessageInput/MessageInput';
import './DirectMessagePage.css'

const DirectMessagePage = () => {
  return (
    <div className="direct-message-main-container">
        <ChatHeader/>
      <div className="direct-message-sub-container">
        <div className="direct-message-container">
          
          

        </div>
      </div>
      <div className="direct-message-input">
      <MessageInput/>
      </div>
    </div>
  );
};

export default DirectMessagePage;
