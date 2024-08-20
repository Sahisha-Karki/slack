import React, { useState } from 'react';
import '../../../src/Styles/Setting/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faUniversalAccess, faPalette, faVideo, faCommentDots, faGlobe, faLock, faCog } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ onSectionChange }) {
  const sections = [
    { name: 'Account', icon: faUser },
    { name: 'Notifications', icon: faBell },
    { name: 'Accessibility', icon: faUniversalAccess },
    { name: 'Themes', icon: faPalette },
    { name: 'Audio & Video', icon: faVideo },
    { name: 'Messages & media', icon: faCommentDots },
    { name: 'Language & Region', icon: faGlobe },
    { name: 'Privacy & Safety', icon: faLock },
    { name: 'Advanced', icon: faCog },
  ];

  const [activeSection, setActiveSection] = useState('Account');

  const handleSectionClick = (section) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  return (
    <div className="settings-sidebar">
      <ul>
        {sections.map((section) => (
          <li
            key={section.name}
            onClick={() => handleSectionClick(section.name)}
            className={activeSection === section.name ? 'active' : ''}
          >
            <span className="settings-sidebar-icon">
              <FontAwesomeIcon icon={section.icon} />
            </span>
            {section.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
