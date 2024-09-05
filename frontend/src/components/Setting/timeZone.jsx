import React, { useState } from 'react';
import '../../../src/Styles/Setting/TimeZone.css';
import { FaChevronUp } from 'react-icons/fa';
import TimezoneSelect from 'react-timezone-select';

function TimeZoneSettings() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState({
    value: '(UTC +05:45) Kathmandu',
    label: '(UTC +05:45) Kathmandu'
  });

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTimeZoneChange = (newTimeZone) => {
    setSelectedTimeZone(newTimeZone);
  };

  return (
    <div className="timezone-settings-container">
      <div className="timezone-auth-header">
        <h2>Time Zone</h2>
        <button
          className={`password-toggle-button ${isExpanded ? 'toggle-button-expanded' : ''}`}
          onClick={handleToggleExpand}
        >
          {isExpanded ? <FaChevronUp className="arrow rotate" /> : 'Set'}
        </button>
      </div>
      {isExpanded && (
        <div className="authh-content">
          <p>
            Slack uses your time zone to send summary and notification emails, for times in your activity feeds, and for reminders. Your time zone is currently set to: {selectedTimeZone.label}.
          </p>
          <div className="timezone-dropdown-container">
            <TimezoneSelect
              value={selectedTimeZone}
              onChange={handleTimeZoneChange}
              className="timezone-dropdown"
            />
          </div>
          <div className="try">
            <button className="time-setup-button">
              Set This Time Zone
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeZoneSettings;
