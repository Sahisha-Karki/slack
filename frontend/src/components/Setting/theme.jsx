import React, { useState,useEffect } from 'react';
import { SketchPicker } from 'react-color';
import '../../../src/Styles/Setting/theme.css';
// import DropdownMenu from '../../pages/Main/Navbars/VerticalNavbar/Dropdown/DropdownMenu';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


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


  
  useEffect(() => {
    // Fetch initial theme
    fetchTheme();
  }, []);

 const fetchTheme = async () => {
  try {
    const token = localStorage.getItem('token'); // Assume you store the token in localStorage after login
    const response = await fetch(`${API_URL}/api/themes/get-themes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch theme');
    }
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error('Error fetching theme:', error);
  }
};

useEffect(() => {
  // Fetch the saved theme from the backend when the component is mounted
  const fetchAndApplyTheme = async () => {
    const savedTheme = await fetchTheme();
    if (savedTheme) {
      // Apply the saved theme to the UI
      if (savedTheme.customTheme) {
        // Apply custom theme
        applyCustomTheme(savedTheme.customTheme);
      } else {
        // Apply predefined theme (light or dark)
        applyTheme(savedTheme.theme);
      }
    }
  };
  fetchAndApplyTheme();
}, []);


  const applyCustomTheme = (theme) => {
    const SideNav = document.querySelector('.side-nav');
    const TopNavbar = document.querySelector('.top-nav-header');
    const VerticalNav = document.querySelector('.vertical-nav');
    const main = document.querySelector('.main-container');
    const channel = document.querySelector('.add-channel');
    const member = document.querySelector('.add-member');
    const buttonContainer = document.querySelector('.top-nav-header-buttons');
    const header = document.querySelector('.channel-header h3');
    const direct = document.querySelector('.direct-messages h3');
  
    if (SideNav) {
      SideNav.style.background = `${theme.systemNavigation.color}66`;
      SideNav.style.color = '#ffffff';
    }
    if (TopNavbar) {
      TopNavbar.style.background = theme.systemNavigation.color;
      TopNavbar.style.color = '#ffffff';
    }

  
    // Ensure that emojis and icons retain their original colors
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach((emoji) => {
      emoji.style.filter = 'none';
    });
  
    const navIcons = document.querySelectorAll('.nav-list .nav-item img');
    navIcons.forEach((icon) => {
      icon.style.filter = 'none';
    });
  };

  const applyTheme = (theme) => {
    const  SideNav = document.querySelector(' .side-nav ');
    const TopNavbar = document.querySelector('.top-nav-header');
    const VerticalNav = document.querySelector('.vertical-nav');
    const main = document.querySelector('.main-container');
    const channel= document.querySelector('.add-channel');
    const member = document.querySelector('.add-member');
    const buttonContainer  = document.querySelector('.top-nav-header-buttons');
    const header  = document.querySelector('.channel-header h3');
    const direct  = document.querySelector('.direct-messages h3');






    
    if (theme === 'light') {
      applyLightTheme( SideNav, TopNavbar, VerticalNav,main,channel,member,buttonContainer );
    } else if (theme === 'dark') {
      applyDarkTheme( SideNav, TopNavbar, VerticalNav,main,channel,member,buttonContainer,header,direct );
    } else {
      applySolidColorTheme(theme,  SideNav, TopNavbar, VerticalNav,main,channel,member,buttonContainer );
    }
  };
  
  const applyLightTheme = ( SideNav, TopNavbar, VerticalNav,main,channel,member,buttonContainer ) => {
    if ( SideNav) {
       SideNav.style.background = '#FAFAFA';
       SideNav.style.color = '#000000';
    }
    if (TopNavbar) {
      TopNavbar.style.background = '#EEEAEA';
      TopNavbar.style.color = '#000000';
    }

    if (buttonContainer) {
      const buttons = buttonContainer.querySelectorAll('button');  // Select all buttons inside the container
      buttons.forEach((btn) => {
        btn.style.background = '#EEEAEA';  // Apply light theme styles
        btn.style.color = '#000000';  // Text color
      });
    }
    if (VerticalNav) {
      VerticalNav.style.background = '#EEEAEA';
      VerticalNav.style.color = '#000000';
    }
    if (main){
      main.style.background='#EEEAEA';
    }

    
    if (channel) {
      channel.style.background = '#FAFAFA'; // Light background for channel
      channel.style.color = '#000000'; // Set text color to black for channel in light mode
    }

    if(member){
      member.style.background='#FAFAFA';
      member.style.color = '#000000';
    }

    const navIcons = document.querySelectorAll('.nav-list .nav-item img');
    const navTexts = document.querySelectorAll('.nav-list .nav-item span');
  
    navIcons.forEach((icon) => {
      icon.style.filter = 'none'; // Original color (black) for icons in light mode
    });
  
    navTexts.forEach((text) => {
      text.style.color = '#000000'; // Make text black
    });

    // Apply styles to images inside buttons
    const images = document.querySelectorAll('.top-nav-header-actions button img');
    images.forEach((img) => {
      img.style.filter = 'brightness(0.3) contrast(1.5)'; // Darken images by reducing brightness and increasing contrast
      img.style.transition = 'filter 0.3s ease'; // Smooth transition for image filters
    });
  };
  
 const applyDarkTheme = (SideNav, TopNavbar, VerticalNav, main, channel, member, buttonContainer, header,direct) => {
  if (SideNav) {
    SideNav.style.background = '#1A1616'; // Dark background
    SideNav.style.color = '#ffffff'; // Text color
  }
  if (TopNavbar) {
    TopNavbar.style.background = '#121010'; // Dark background
    TopNavbar.style.color = '#ffffff'; // Text color
  }


  if (buttonContainer) {
    const buttons = buttonContainer.querySelectorAll('button');
    buttons.forEach((btn) => {
      btn.style.background = '#121010'; // Dark background
      btn.style.color = '#ffffff'; // Text color
    });
  }

  if (VerticalNav) {
    VerticalNav.style.background = '#121010'; // Dark background
    VerticalNav.style.color = '#ffffff'; // Text color
  }
  if (main) {
    main.style.background = '#121010'; // Dark background
  }
  if (channel) {
    channel.style.background = '#1A1616'; // Dark background
    channel.style.color = '#ffffff'; // Text color
  }

  if (header) {
    header.style.color = '#ffffff'; // Text color
  }

  if (direct) {
    direct.style.color = '#ffffff'; // Text color
  }


  if (member) {
    member.style.background = '#1A1616'; // Dark background
    member.style.color = '#ffffff'; // Text color
  }

  // Ensure icons and text in dark mode are white
  const navIcons = document.querySelectorAll('.nav-list .nav-item img');
  const navTexts = document.querySelectorAll('.nav-list .nav-item span');

  navIcons.forEach((icon) => {
    icon.style.filter = 'brightness(0) invert(1)'; // White icons
  });

  navTexts.forEach((text) => {
    text.style.color = '#ffffff'; // White text
  });

  const images = document.querySelectorAll('.top-nav-header-actions button img');
  images.forEach((img) => {
    img.style.filter = 'none'; // Reset image filters
  });
};


  const applySolidColorTheme = (color,  SideNav, TopNavbar, VerticalNav,main,channel,member,buttonContainer) => {
     if ( SideNav) {
       SideNav.style.background = `${color}66`;
       SideNav.style.color = '#ffffff';
     }
    if (TopNavbar) {
      TopNavbar.style.background = color;
      TopNavbar.style.color = '#ffffff';
    }
    if (buttonContainer) {
      const buttons = buttonContainer.querySelectorAll('button');  // Select all buttons inside the container
      buttons.forEach((btn) => {
        btn.style.background = color;  // Apply solid color theme
        btn.style.color = '#ffffff';  // Text color
      });
    }
    if (VerticalNav) {
      VerticalNav.style.background = color; 
      VerticalNav.style.color = '#ffffff';
    }
    if (main){
      main.style.background=`${color}B3`;
      VerticalNav.style.color = '#ffffff';
    }
    if (channel) {
      channel.style.background = `${color}33` ; 
      channel.style.color = '#ffffff';  
    }
    if (member) {
      member.style.background = `${color}33` ; 
      member.style.color = '#ffffff';  
    }

      // Ensure that the nav icons and text in solid color mode are white
  const navIcons = document.querySelectorAll('.nav-list .nav-item img');
  const navTexts = document.querySelectorAll('.nav-list .nav-item span');

  navIcons.forEach((icon) => {
    icon.style.filter = 'brightness(0) invert(1)'; // Make icons white
  });

  navTexts.forEach((text) => {
    text.style.color = '#ffffff'; // Make text white
  });

    const images = document.querySelectorAll('.top-nav-header-actions button img');
    images.forEach((img) => {
      img.style.filter = 'none'; // Reset to original image
    });

 
  };

  const handleThemeChange = (theme) => {
    applyTheme(theme);
    saveTheme(theme);
  };
  

  // const handleCustomThemeChange = async (color, key) => {
  //   const newColor = color.hex;
  //   const newCustomTheme = {
  //     ...customTheme,
  //     [key]: { name: newColor, color: newColor }
  //   };
  //   setCustomTheme(newCustomTheme);
  //   setColorMode('custom');
  
  //   applyCustomTheme(newCustomTheme);
  
  //   try {
  //       await fetch('http://localhost:3001/api', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ theme: 'custom', customTheme: newCustomTheme }),
  //     });
  //   } catch (error) {
  //     console.error('Error saving custom theme:', error);
  //   }
  // };

  

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
        const newColor = getRandomColor();
        const newTheme = {
          ...customTheme,
          systemNavigation: { name: newColor, color: newColor }
        };
        setCustomTheme(newTheme);
        applyTheme(newColor);
        saveTheme('custom', newTheme);
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
    const newColor = color.hex;
    const newCustomTheme = {
      ...customTheme,
      [key]: { 
        ...customTheme[key],
        color: newColor,
        name: newColor
      }
    };
    setCustomTheme(newCustomTheme);
    
    if (key === 'systemNavigation') {
      applyTheme(newColor);
      saveTheme('custom', newCustomTheme);
    }
  };


  const saveTheme = async (theme, customTheme = null) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/themes/post-themes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ theme, customTheme }),
      });
      if (!response.ok) {
        throw new Error('Failed to save theme');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving theme:', error);
    }
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
        <button 
          className={colorMode === 'light' ? 'active' : ''}
          onClick={() => handleThemeChange('light')}
        >
          ☀️ Light
        </button>
        <button 
          className={colorMode === 'dark' ? 'active' : ''}
          onClick={() => handleThemeChange('dark')}
        >
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
                  <div key={theme.name} className="theme-color-button"
                  onClick={() => handleThemeChange(theme.color)}
>
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
                  {editingColor === 'systemNavigation' && (
                     <div className="color-picker-container">
                <SketchPicker
                  color={customTheme.systemNavigation.color}
                  onChangeComplete={(color) => handleColorChange(color, 'systemNavigation')}
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
