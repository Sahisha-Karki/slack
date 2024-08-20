import React, { useState } from 'react';
import '../../../src/Styles/Setting/TagInput.css'; // Assuming you'll create a separate CSS file for styling

const TagInput = () => {
  const [tags, setTags] = useState(['general']);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="tag-input-container">
      {tags.map((tag, index) => (
        <div className="tag" key={index}>
          {tag}
          <span className="remove-tag" onClick={() => handleRemoveTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        placeholder="Type a name and press Enter..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="tag-input"
      />
    </div>
  );
};

export default TagInput;
