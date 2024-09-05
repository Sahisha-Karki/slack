import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import "./Notes.css";
import IconBar from "../../../../../../components/Shared/IconBar";
import { FaStickyNote, FaRegCalendarCheck, FaList, FaBook, FaTimes } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react'; // Import your emoji picker library

const Notes = ({ onClose }) => {
  const [activeContent, setActiveContent] = useState("getStarted");
  const [notes, setNotes] = useState("");
  const [tables, setTables] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [textFields, setTextFields] = useState([]); // New state for text fields

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedActiveContent = localStorage.getItem("activeContent");
    const savedTables = JSON.parse(localStorage.getItem("tables"));
    const savedChecklist = JSON.parse(localStorage.getItem("checklist"));
    const savedTextFields = JSON.parse(localStorage.getItem("textFields")); // Load text fields

    if (savedNotes && savedNotes.trim() !== "") {
      setNotes(savedNotes);
      if (savedActiveContent) {
        setActiveContent(savedActiveContent);
      }
    } else {
      setActiveContent("getStarted");
    }

    if (savedTables) {
      setTables(savedTables);
    }

    if (savedChecklist) {
      setChecklist(savedChecklist);
    }

    if (savedTextFields) {
      setTextFields(savedTextFields);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", notes);
    localStorage.setItem("activeContent", activeContent);
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("checklist", JSON.stringify(checklist));
    localStorage.setItem("textFields", JSON.stringify(textFields)); // Save text fields
  }, [notes, activeContent, tables, checklist, textFields]);

  const handleOptionClick = (option) => {
    setActiveContent(option);
    if (option !== "blankPage") {
      setNotes("");
    }
  };

  

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      console.error("onClose is not a function");
    }
  };


  
  const handleInsertContent = (option) => {
    switch (option) {
      case 'table':
        addTable();
        break;
      case 'checkbox':
        addCheckbox();
        break;
      case 'textField': // New case for text field
        addTextField();
        break;
      case 'video':
      case 'audio':
      case 'divider':
      case 'image':
      case 'file':
        console.log('${option} selected');
        break;
      default:
        console.log('Unhandled option:', option);
    }
  };

  const addTable = () => {
    const newTable = {
      id: Date.now(),
      rows: 2,
      columns: 2,
      data: Array(2).fill(Array(2).fill(""))
    };
    setTables(prevTables => [...prevTables, newTable]);
  };

  const updateTable = (id, changes) => {
    setTables(tables.map(table => table.id === id ? { ...table, ...changes } : table));
  };

  const handleCellChange = (tableId, rowIndex, colIndex, value) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const updatedData = table.data.map((row, rIdx) =>
          row.map((cell, cIdx) =>
            rIdx === rowIndex && cIdx === colIndex ? value : cell
          )
        );
        return { ...table, data: updatedData };
      }
      return table;
    }));
  };

  const addRow = (tableId) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const newRow = Array(table.columns).fill("");
        return { ...table, data: [...table.data, newRow] };
      }
      return table;
    }));
  };

  const addColumn = (tableId) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const newData = table.data.map(row => [...row, ""]);
        return { ...table, data: newData, columns: table.columns + 1 };
      }
      return table;
    }));
  };

  const removeRow = (tableId, rowIndex) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const newData = table.data.filter((_, rIdx) => rIdx !== rowIndex);
        return { ...table, data: newData };
      }
      return table;
    }));
  };

  const removeColumn = (tableId, colIndex) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const newData = table.data.map(row => row.filter((_, cIdx) => cIdx !== colIndex));
        return { ...table, data: newData, columns: table.columns - 1 };
      }
      return table;
    }));
  };

  const removeTable = (id) => {
    setTables(tables.filter(table => table.id !== id));
  };

  const addCheckbox = () => {
    setChecklist([...checklist, { id: Date.now(), checked: false, text: '' }]);
  };

  const handleCheckboxChange = (id, e) => {
    const { checked } = e.target;
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked } : item));
  };

  const handleCheckboxTextChange = (id, e) => {
    const { value } = e.target;
    setChecklist(checklist.map(item => item.id === id ? { ...item, text: value } : item));
  };

  const handleCheckboxEnter = (e) => {
    if (e.key === 'Enter') {
      addCheckbox();
    }
  };

  const removeCheckbox = (id) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleEmojiClick = (emoji) => {
    setNotes(notes + emoji.emoji);
  };

 
  const addTextField = () => {
    setTextFields([...textFields, { id: Date.now(), value: '' }]);
  };

  const handleTextFieldChange = (id, value) => {
    setTextFields(textFields.map(field => field.id === id ? { ...field, value } : field));
  };

  const removeTextField = (id) => {
    if (textFields.length > 0) { // Ensure at least one text field remains
      setTextFields(textFields.filter(field => field.id !== id));
    }
  };

  const renderTable = (table) => (
    <div
      key={table.id}
      className={`table-container ${selectedTableId === table.id ? 'selected' : ''}`}
      onClick={() => setSelectedTableId(table.id)}
    >
      <div className="table-header">
        <button onClick={() => removeTable(table.id)} className="delete-table-button">
          <FaTimes />
        </button>
      </div>
      <table>
        <tbody>
          {table.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <textarea
                    value={cell}
                    onChange={(e) => handleCellChange(table.id, rowIndex, colIndex, e.target.value)}
                    placeholder="Cell"
                  />
                  {rowIndex === 0 && (
                    <div
                      className="insert-control insert-column"
                      onClick={() => addColumn(table.id)}
                    >
                      +
                    </div>
                  )}
                  {colIndex === 0 && (
                    <div
                      className="insert-control insert-row"
                      onClick={() => addRow(table.id)}
                    >
                      +
                    </div>
                  )}
                  {row.length > 1 && (
                    <div
                      className="remove-control"
                      onClick={() => removeColumn(table.id, colIndex)}
                    >
                      -
                    </div>
                  )}
                  {table.data.length > 1 && (
                    <div
                      className="remove-control"
                      onClick={() => removeRow(table.id, rowIndex)}
                    >
                      -
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChecklist = () => (
    <div className="checklist-container">
      {checklist.map(item => (
        <div key={item.id} className="checklist-item">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => handleCheckboxChange(item.id, e)}
          />
          <input
            type="text"
            value={item.text}
            onChange={(e) => handleCheckboxTextChange(item.id, e)}
            onKeyDown={handleCheckboxEnter}
            placeholder="Write something..."
          />
          <button onClick={() => removeCheckbox(item.id)} className="delete-button">
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );

  const renderTextFields = () => (
    <div className="text-fields-container">
      {textFields.map(field => (
        <div key={field.id} className="text-field">
          <ReactQuill
            value={field.value}
            onChange={(value) => handleTextFieldChange(field.id, value)}
            modules={modules}
          />
          {textFields.length > 0 && (
            <button
              onClick={() => removeTextField(field.id)}
              className="delete-text-field-button"
            >
              <FaTimes />
            </button>
          )}
        </div>
      ))}
      <button onClick={addTextField} className="add-text-field-button">
      +
      </button>
    </div>
  );

  const handleIconBarOptionClick = (option) => {
    const editor = document.querySelector(".ql-editor");
    if (editor) {
      switch (option) {
        case 'blockquote':
          editor.innerHTML = `<blockquote><p>${editor.innerText}</p></blockquote>`;
          break;
        case 'code':
          editor.innerHTML = `<pre><code>${editor.innerText}</code></pre>`;
          break;
        case 'bulletedList':
          editor.innerHTML = `<ul><li>${editor.innerText.split('\n').join('</li><li>')}</li></ul>`;
          break;
        case 'orderedList':
          editor.innerHTML = `<ol><li>${editor.innerText.split('\n').join('</li><li>')}</li></ol>`;
          break;
        case 'checklist':
          editor.innerHTML = `<ul>${editor.innerText.split('\n').map(item => `<li><input type="checkbox"/> ${item}</li>`).join('')}</ul>`;
          break;
        case 'smallHeading':
          editor.innerHTML = `<h3>${editor.innerText}</h3>`;
          break;
        case 'mediumHeading':
          editor.innerHTML = `<h2>${editor.innerText}</h2>`;
          break;
        case 'bigHeading':
          editor.innerHTML = `<h1>${editor.innerText}</h1>`;
          break;
        case 'underline':
          editor.innerHTML = `<u>${editor.innerText}</u>`;
          break;
        case 'paragraph':
          editor.innerHTML = `<p>${editor.innerText}</p>`;
          break;
        default:
          console.log('Unhandled option:', option);
      }
    }
  };
  

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link']
    ],
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
          <div>
            <ReactQuill
              value={notes}
              onChange={handleNotesChange}
              placeholder="Start typing your notes here..."
              className="blank-canvas"
              modules={modules}
              
              // modules={{ toolbar: false }} // Disable the toolbar
            />
            {tables.map(renderTable)}
            {renderChecklist()}
            {renderTextFields()} {/* Render text fields */}
          </div>
        )}
        {/* Other activeContent conditions can go here... */}
        {activeContent === 'table' && tables.map(renderTable)}
        {activeContent === 'checklist' && renderChecklist()}
        {activeContent === 'textField' && renderTextFields()}
      </div>

      <IconBar onInsertContent={handleInsertContent} onEmojiClick={handleEmojiClick} onFontOptionClick={handleIconBarOptionClick} />
    </div>
  );
};

export default Notes;