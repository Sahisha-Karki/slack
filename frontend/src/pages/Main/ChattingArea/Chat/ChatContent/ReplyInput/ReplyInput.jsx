import React, { useState } from "react";
import "./ReplyInput.css";

const ReplyInput = ({ onSend }) => {
  const [replyText, setReplyText] = useState("");

  const handleSendClick = () => {
    onSend(replyText);
    setReplyText(""); // Clear input field
  };

  return (
    <div className="reply-input">
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Type your reply..."
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default ReplyInput;
