import React, { useState, useRef, useEffect } from 'react';
import '../../../../Styles/Pages/VerticalNavbar/VerticalNav.css';
import DropdownMenu from './DropdownMenu';
import { FaHome } from 'react-icons/fa'; // Import the home icon from react-icons

const VerticalNav = ({ showContent }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHomeClick = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <div className="vertical-nav">
      {showContent && (
        <>
          <div className="vertical-nav-item">
            <img src="./images/company1.png" alt="company logo" className="vertical-nav-icon" />
            <div className='open-switch'></div>
          </div>
          <div className="vertical-nav-item">
            <img
              src="./images/addmore.png"
              alt="add more"
              className="vertical-nav-icon"
              onClick={toggleDropdown}
            />
            <div ref={dropdownRef}>
              {dropdownVisible && <DropdownMenu />}
            </div>
          </div>
        </>
      )}
      {/* Home icon at the bottom */}
      <div className="vertical-nav-home" onClick={handleHomeClick}>
        <FaHome className="home-icon" />
      </div>
    </div>
  );
};

export default VerticalNav;
