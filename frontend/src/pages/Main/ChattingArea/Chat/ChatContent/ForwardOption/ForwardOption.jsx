import React from "react";
import "./ForwardOption.css";

const ForwardOption = ({ onForwardToChannel, onForwardToUser }) => {
  return (
    <div className="forward-options">
      <button onClick={() => onForwardToChannel('channelId')}>Forward to Channel</button>
      <button onClick={() => onForwardToUser('userId')}>Forward to User</button>
    </div>
  );
};

export default ForwardOption;
