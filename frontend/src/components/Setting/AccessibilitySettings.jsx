import React from 'react';
import '../../../src/Styles/Setting/accessibility.css';

function AccessibilitySettings() {
  return (
    <div className="accessibility-container">
    <div className="accessibility-form">
      <div className="accessibility-section">
        <h3>Zoom</h3>
        <div className="zoom-options">
          <label><input type="radio" name="zoom" /> 70%</label>
          <label><input type="radio" name="zoom" /> 80%</label>
          <label><input type="radio" name="zoom" /> 90%</label>
          <label><input type="radio" name="zoom" defaultChecked /> 100% Default</label>
          <label><input type="radio" name="zoom" /> 110%</label>
          <label><input type="radio" name="zoom" /> 125%</label>
          <label><input type="radio" name="zoom" /> 150%</label>
          <label><input type="radio" name="zoom" /> 175%</label>
          <label><input type="radio" name="zoom" /> 200%</label>
        </div>
        <p>You can also change the zoom level by pressing Ctrl + scroll</p>
      </div>
      
      <hr />

      <div className="accessibility-section">
        <h3>Links</h3>
        <label><input type="checkbox" /> Underline links to websites</label>
      </div>
      
      <hr />

      <div className="accessibility-section">
        <h3>Tab Previews</h3>
        <label><input type="checkbox" /> Enable previews when using a mouse to hover over items in the tab bar</label>
      </div>
      
      <hr />

      <div className="accessibility-section">
        <h3>Animations</h3>
        <label><input type="checkbox" /> Automatically play animations in Slack</label>
        <p>Including animated GIFs, emojis, and in-product animation.</p>
      </div>
      
      <hr />

      <div className="accessibility-section">
        <h3>Screen Reader</h3>
        <label>Customize your screen reader experience</label>
      </div>
      
      <hr />

      <div className="accessibility-section">
        <h3>Message Format</h3>
        <label><input type="checkbox" /> Sender, message, and then date and time</label>
        <label><input type="checkbox" /> Sender, date and time, and then message</label>
      </div>
      
      <hr />

      <div className="accessibility-section">
        <h3>Sessions Announcements</h3>
        <label><input type="checkbox" /> Read emoji reactions out loud</label>
        <label><input type="checkbox" /> Play a sound when an emoji is sent or received</label>
      </div>
      </div>
    </div>
  );
}

export default AccessibilitySettings;
