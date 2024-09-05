import React, { useState } from 'react';
import Select from 'react-select';
import { FaChevronUp } from 'react-icons/fa';
import ISO6391 from 'iso-639-1';
import '../../../src/Styles/Setting/Language.css';

function LanguageSelection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: 'en',
    label: ISO6391.getName('en'),
  });

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  // Generate language options from ISO6391
  const languageOptions = ISO6391.getAllCodes().map((code) => ({
    value: code,
    label: ISO6391.getName(code),
  }));

  return (
    <div className="language-selection-container">
      <div className="language-auth-header">
        <h2>Language</h2>
        <button
          className={`password-toggle-button ${isExpanded ? 'toggle-button-expanded' : ''}`}
          onClick={handleToggleExpand}
        >
          {isExpanded ? <FaChevronUp className="arrow rotate" /> : 'Set'}
        </button>
      </div>
      {isExpanded && (
        <div className="auth-content">
          <p>
            Choose the language you’d like to use in Slack. Currently, your language is set to {selectedLanguage.label}.
          </p>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            className="language-dropdown"
            placeholder="Select a language"
          />
          <div className="try">
            <button className="setup-button">
              Set This Language
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelection;
