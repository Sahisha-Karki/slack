import React, { useState } from 'react';
import '../../../src/Styles/Setting/AdvancedSettings.css';
import TagInput from './TagInput'; // Import the TagInput component

const AdvancedSettings = () => {
  const [downloadPath, setDownloadPath] = useState('Downloads');
  const [chooseLocationEachTime, setChooseLocationEachTime] = useState(false);

  const handleDownloadChange = async () => {
    try {
      // Ensure that the directory picker API is available and compatible
      if (window.showDirectoryPicker) {
        const directoryHandle = await window.showDirectoryPicker({
          mode: 'readwrite', // Request readwrite access to the directory
        });
        if (directoryHandle) {
          // Check if the selected directory is the "Downloads" folder
          if (directoryHandle.name === 'Downloads') {
            // If it is, prompt the user to select a different directory
            alert('Cannot select the "Downloads" folder as it contains system files. Please choose a different directory.');
            return;
          }
          setDownloadPath(directoryHandle.name);
        }
      } else {
        // Provide a fallback or notify the user if the API is not supported
        alert('Directory picker API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error opening directory picker:', error);
      alert('Unable to open the folder. Please check your permissions and try again.');
    }
  };

  return (
    <div className="settings-container">
      <section className="settings-section">
        <h2>Input options</h2>
        <div className="input-options">
          <label>
            <input type="checkbox" />
            When typing code with “`, Enter should not send the message.
            <span className="subtext">With this checked use Shift + Enter to send</span>
          </label>
          <label>
            <input type="checkbox" />
            Format message with markup
            <span className="subtext">The text formatting toolbar won't show in the composer.</span>
          </label>
          <p>When writing a message, press Enter to..</p>
          <label>
            <input type="radio" name="enter-option" />
            Send message
          </label>
          <label>
            <input type="radio" name="enter-option" />
            Start a new line (use Ctrl + Enter)
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Search options</h2>
        <div className="search-options">
          <label>Exclude these channels from search results: </label>
          <TagInput />
        </div>
      </section>

      <section className="settings-section">
        <h2>Download Location</h2>
        <div className="download-location">
          <label>
            <input
              type="checkbox"
              checked={chooseLocationEachTime}
              onChange={() => setChooseLocationEachTime(!chooseLocationEachTime)}
            />
            Choose location for each download
          </label>
          <input type="text" value={chooseLocationEachTime ? "You'll choose each time." : downloadPath} readOnly />
          {!chooseLocationEachTime && (
            <button className="change-button" onClick={handleDownloadChange}>Change</button>
          )}
          <p className="note">
            Note: this setting is for this computer only and affects all workspaces you are signed in to.
          </p>
        </div>
      </section>

      <section className="settings-section">
        <h2>Confirmations and warnings</h2>
        <div className="confirmations-warnings">
          <label>
            <input type="checkbox" defaultChecked />
            Show me a confirmation when I use Ctrl + Z to unsend a message I just sent
          </label>
          <label>
            <input type="checkbox" />
            Ask if I want to toggle my away status when I login in after having set myself away
          </label>
          <label>
            <input type="checkbox" />
            Warn me about potentially malicious links
          </label>
          <label>
            <input type="checkbox" />
            Warn me when sharing files with external organizations
          </label>
          <label>
            <input type="checkbox" />
            Warn me when sharing canvases with external organizations
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Other options</h2>
        <div className="other-options">
          <label>
            <input type="checkbox" defaultChecked />
            Send me occasional channel suggestion via Slackbot
          </label>
          <label>
            <input type="checkbox" />
            Send me occasional surveys via Slackbot
            <span className="subtext">
              We're always working to make Slack better, and we'd love your thoughts.
            </span>
          </label>
          <label>
            <input type="checkbox" />
            Disable hardware acceleration
          </label>
        </div>
      </section>
    </div>
  );
};

export default AdvancedSettings;
