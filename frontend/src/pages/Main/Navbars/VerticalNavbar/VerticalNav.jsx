import React, { useState, useRef, useEffect } from 'react';
import './VerticalNav.css';
import DropdownMenu from './Dropdown/DropdownMenu';

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

  return (
    <div className="vertical-nav">
      {showContent && (
        <>
          <div className="vertical-nav-item">
            <img src="./images/company1.png" alt="company logo" className="vertical-nav-icon" />
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
    </div>
  );
};

export default VerticalNav;
