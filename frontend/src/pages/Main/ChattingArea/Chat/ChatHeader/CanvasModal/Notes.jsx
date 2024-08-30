import React, { useState } from "react";
import "./Notes.css";
import IconBar from "../../../../../../components/Shared/IconBar";
import { FaStickyNote, FaRegCalendarCheck, FaList, FaBook } from 'react-icons/fa'; // Import your icons

const Notes = ({ onClose }) => {
  const [activeContent, setActiveContent] = useState("getStarted");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  const handleOptionClick = (option) => {
    setActiveContent(option);
    if (option !== "getStarted") {
      setNotes("");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      console.error("onClose is not a function");
    }
  };

  return (
    <div className="notes-container">
      <button className="close-notes" onClick={handleClose}>
        &times;
      </button>
      <h2>Notes</h2>
  
      <div className="content-display">
        {activeContent === "getStarted" && (
          <div>
            <h3>Getting Started</h3>
            <div className="options-bar">
              <button onClick={() => handleOptionClick("blankPage")}>
                <FaStickyNote /> Blank Page
              </button>
              <button onClick={() => handleOptionClick("meetingNotes")}>
                <FaRegCalendarCheck /> Meeting Notes
              </button>
              <button onClick={() => handleOptionClick("toDoList")}>
                <FaList /> To-do List
              </button>
              <button onClick={() => handleOptionClick("resources")}>
                <FaBook /> Resources
              </button>
            </div>
          </div>
        )}
        {activeContent === "blankPage" && (
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Start typing your notes here..."
            className="blank-canvas"
          />
        )}
        {activeContent === "meetingNotes" && <div>Meeting Notes Content</div>}
        {activeContent === "toDoList" && <div>To-do List Content</div>}
        {activeContent === "resources" && <div>Resources Content</div>}
      </div>
      <IconBar /> {/* Ensure IconBar is always rendered here */}
    </div>
  );
  
};

export default Notes;
