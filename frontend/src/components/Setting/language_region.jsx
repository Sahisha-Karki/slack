import React, { useState } from 'react';
import Select from 'react-select';
import  TimezoneSelect  from 'react-timezone-select';
import '../../../src/Styles/Setting/language_region.css'
import ISO6391 from 'iso-639-1';
 
const LanguageAndRegionSettings = () => {
  const [language, setLanguage] = useState({ value: 'en', label: 'English (US)' });
  const [timezone, setTimezone] = useState({ value: 'Asia/Kathmandu', label: '(UTC +05:45) Kathmandu' });
  const [autoSetTimezone, setAutoSetTimezone] = useState(false);
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(true);
  const [spellCheckLanguages, setSpellCheckLanguages] = useState([{ value: 'en', label: 'English (US)' }]);

  const languageOptions = ISO6391.getAllCodes().map(code => ({
    value: code,
    label: `${ISO6391.getNativeName(code)} (${ISO6391.getName(code)})`
  }));

  const handleSpellCheckLanguageChange = (selectedOptions) => {
    setSpellCheckLanguages(selectedOptions);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '50px',
      height: '50px',
      borderRadius: '10px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '40px',
      padding: '0 6px',
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: '500px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
      height: '40px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '50px'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, /* Ensure dropdown is above other elements */
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>Language</h2>
        <label>System Language</label>
        <Select
          value={language}
          onChange={setLanguage}
          options={languageOptions}
          placeholder="Choose the language you want to use in Slack"
          styles={customStyles}
        />
        <small>Choose the language you want to use in Slack</small>
      </div>

      <div className="settings-box">
        <h2>Time zone</h2>
        <label>
          <input
            type="checkbox"
            checked={autoSetTimezone}
            onChange={(e) => setAutoSetTimezone(e.target.checked)}
          />
          Set time zone automatically
        </label>
        <TimezoneSelect
          value={timezone}
          onChange={setTimezone}
          placeholder="Select timezone"
          styles={customStyles}
        />
        <small>Slack uses your time zone to send summary and notification emails, for times in your activity feeds, and for reminders.</small>
      </div>

      <div className="settings-box">
        <h2>Spell Check</h2>
        <label>
          <input
            type="checkbox"
            checked={spellCheckEnabled}
            onChange={(e) => setSpellCheckEnabled(e.target.checked)}
          />
          Enable spell check on your messages and canvases
        </label>
        <Select
          isMulti
          value={spellCheckLanguages}
          onChange={handleSpellCheckLanguageChange}
          options={languageOptions}
          placeholder="Choose the language you want to spell check"
          styles={customStyles}
          menuPortalTarget={document.body}  /* Render the dropdown in the body */
          menuPosition="absolute"            /* Position the dropdown absolutely */
          menuShouldScrollIntoView={false}   /* Prevent scrolling into view automatically */
          />

      </div>
    </div>
  );
};

export default LanguageAndRegionSettings;