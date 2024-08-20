import React, { useState,useEffect } from 'react';
import { SketchPicker } from 'react-color';
import '../../../src/Styles/Setting/theme.css';

function ThemesContent() {
  const [colorMode, setColorMode] = useState('light');
  const [activeTab, setActiveTab] = useState('slack');
  const [editingColor, setEditingColor] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importThemeString, setImportThemeString] = useState('');
  const [customTheme, setCustomTheme] = useState({
    systemNavigation: { name: 'Blue', color: '#1C3E92' },
    selectedItems: { name: 'Gray', color: '#8A8D91' },
    presenceIndication: { name: 'Purple', color: '#6A1B9A' },
    notifications: { name: 'Peach', color: '#FF9E80' },
  });


  




  const slackThemes = [
    { category: 'Single color', themes: [
      { name: 'Blue', color: '#1C3E92' },
      { name: 'Yellow', color: '#A4CF30' },
      { name: 'Gray', color: '#8A8D91' },
      { name: 'Purple', color: '#6A1B9A' },
      { name: 'Peach', color: '#FF9E80' },
      { name: 'Orange', color: '#F4511E' },
    ]},
    { category: 'Vision assistance', themes: [
      { name: 'gradient 1', color: 'linear-gradient(to right, #FF5F6D, #FFC371)' },
      { name: 'gradient 2', color: 'linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B)' },
    ]},
    { category: 'Fun and new', themes: [
      { name: 'Blue', color: '#1C3E92' },
      { name: 'Yellow', color: '#A4CF30' },
      { name: 'Gray', color: '#8A8D91' },
      { name: 'Purple', color: '#6A1B9A' },
      { name: 'Peach', color: '#FF9E80' },
      { name: 'Orange', color: '#F4511E' },
    ]},
  ];

  const [importError, setImportError] = useState('');

    // Function to generate a random color
    const getRandomColor = () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
      }

       // Random button functionality
  const handleRandomTheme = () => {
    setCustomTheme({
      systemNavigation: { name: getRandomColor(), color: getRandomColor() },
      selectedItems: { name: getRandomColor(), color: getRandomColor() },
      presenceIndication: { name: getRandomColor(), color: getRandomColor() },
      notifications: { name: getRandomColor(), color: getRandomColor() },
    });
  };

    // Share button functionality
    const handleShare = () => {
        const themeString = Object.values(customTheme).map(item => item.color).join(', ');
        navigator.clipboard.writeText(themeString).then(() => {
          alert('Theme colors copied to clipboard!');
        });
      };

      // Import button functionality
  const handleImport = () => {
    setIsImportModalOpen(true);
  };

 
  const handleColorChange = (color, key) => {
    setCustomTheme(prevTheme => ({
      ...prevTheme,
      [key]: { 
        ...prevTheme[key], 
        color: color.hex,
        name: color.hex  // We're now setting the name to be the hex code
      }
    }));
  };

  const handleImportApply = () => {
    const colors = importThemeString.split(',').map(color => color.trim());
    if (colors.length === 4 && colors.every(color => /^#[0-9A-F]{6}$/i.test(color))) {
      const newTheme = {
        systemNavigation: { name: colors[0], color: colors[0] },
        selectedItems: { name: colors[1], color: colors[1] },
        presenceIndication: { name: colors[2], color: colors[2] },
        notifications: { name: colors[3], color: colors[3] },
      };
      setCustomTheme(newTheme);
      setIsImportModalOpen(false);
      setImportThemeString('');
      setImportError('');
    } else {
      setImportError('Invalid theme string');
    }
  };

  const handleEditClick = (key) => {
    setEditingColor(editingColor === key ? null : key);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.color-picker-container')) {
      setEditingColor(null);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="themes-content">
      <div className="color-mode-container">
        <h3>Color Mode</h3>
        <p>Choose if Slack's appearance should be light or dark, or follow your computer's settings.</p>
        <div className="color-mode-buttons">
          <button className={colorMode === 'light' ? 'active' : ''} onClick={() => setColorMode('light')}>
            ☀️ Light
          </button>
          <button className={colorMode === 'dark' ? 'active' : ''} onClick={() => setColorMode('dark')}>
            🌙 Dark
          </button>
        </div>
      </div>

      <div className="theme-selection-container">
        <div className="theme-tabs">
          <button 
            className={activeTab === 'slack' ? 'active' : ''} 
            onClick={() => setActiveTab('slack')}
          >
            Slack themes
          </button>
          <button 
            className={activeTab === 'custom' ? 'active' : ''} 
            onClick={() => setActiveTab('custom')}
          >
            Custom theme
          </button>
        </div>
        
        {activeTab === 'slack' ? (
          slackThemes.map((category) => (
            <div key={category.category} className="theme-category">
              <h4>{category.category}</h4>
              <div className="theme-colors">
                {category.themes.map((theme) => (
                  <div key={theme.name} className="theme-color-button">
                    <div className="color-circle" style={{ background: theme.color }}></div>
                    <span>{theme.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="custom-theme">
            <div className="custom-theme-header">
              <h4>Theme colors</h4>
              <div className="custom-theme-actions">
              <button onClick={handleShare}>🔗 Share</button>
            <button onClick={handleImport}>↑ Import</button>
            <button onClick={handleRandomTheme}>🔀 Random</button>
              </div>
            </div>
            <div className="custom-theme-colors">
              {Object.entries(customTheme).map(([key, value]) => (
                <div key={key} className="custom-theme-color">
                  <span>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  <div className="color-selector">
                    <div className="color-circle" style={{ background: value.color }}></div>
                    <span>{value.name}</span>
                    <button className="theme-edit-button" onClick={() => handleEditClick(key)}>✎</button>
                  </div>
                  {editingColor === key && (
                     <div className="color-picker-container">
                <SketchPicker
                  color={value.color}
                  onChangeComplete={(color) => handleColorChange(color, key)}
                />
              </div>
                  )}
                </div>
              ))}
            </div>

            {isImportModalOpen && (
        <div className="import-modal">
          <div className="import-modal-content">
          <div className="import-modal-header">

            <h2>Import theme</h2>
            <button className="close-button" onClick={() => setIsImportModalOpen(false)}>×</button>
            </div>

            <p>Paste in a theme string</p>
            <input 
              type="text" 
              value={importThemeString}
              onChange={(e) => setImportThemeString(e.target.value)}
              placeholder="#123456, #234567, #345678, #456789"
              className={importError ? 'error' : ''}

            />
                  {importError && <p className="error-message">{importError}</p>}

            <p>Import Slack theme strings. We'll adapt the colors as best we can to preserve contrast.</p>
            <div className="import-modal-actions">
              <button onClick={() => setIsImportModalOpen(false)}>Cancel</button>
              <button onClick={handleImportApply}>Apply</button>
            </div>
          </div>
        </div>
      )}

            <div className="window-gradient">
              <input type="checkbox" id="window-gradient" />
              <label htmlFor="window-gradient">Window gradient</label>
              <p>Blend Window Background and selected items colors together in windows backgrounds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

 
export default ThemesContent;



 