import React, { useState } from 'react';
import './NavItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faPeopleGroup, faChevronDown, faChevronUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const NavItems = ({ onNavItemClick }) => {
  const [isMoreVisible, setIsMoreVisible] = useState(false);

  const handleMoreClick = () => {
    setIsMoreVisible(!isMoreVisible);
  };

  return (
    <ul className="nav-list">
      <li className="nav-item" onClick={() => onNavItemClick('threads')}>
        <img src="./images/thread.png" alt="Threads Icon" className="nav-icon" />
        <span>Threads</span>
      </li>
      <li className="nav-item" onClick={() => onNavItemClick('direct-messages')}>
        <img src="./images/email.png" alt="Direct Messages Icon" className="nav-icon" />
        <span>Direct Messages</span>
      </li>
      <li className="nav-item" onClick={() => onNavItemClick('mentions-reactions')}>
        <img src="./images/mention.png" alt="Mentions & Reactions Icon" className="nav-icon" />
        <span>Mentions & Reactions</span>
      </li>
      <li className="nav-item" onClick={() => onNavItemClick('drafts')}>
        <img src="./images/send.png" alt="Drafts and Save Icon" className="nav-icon" />
        <span>Drafts and Save</span>
      </li>
      <li className="nav-item" onClick={() => onNavItemClick('files')}>
        <img src="./images/file.png" alt="Files Icon" className="nav-icon" />
        <span>Files</span>
      </li>
      {isMoreVisible && (
        <>
          <li className="nav-item" onClick={() => onNavItemClick('huddles')}>
            <FontAwesomeIcon icon={faUserFriends} className="nav-icon" />
            <span>Huddles</span>
          </li>
          <li className="nav-item" onClick={() => onNavItemClick('people')}>
            <FontAwesomeIcon icon={faPeopleGroup} className="nav-icon" />
            <span>People</span>
          </li>
        </>
      )}
      <li className="nav-item" onClick={handleMoreClick}>
        <FontAwesomeIcon
          icon={isMoreVisible ? faChevronUp : faEllipsisH}
          className="nav-icon"
        />
        <span>{isMoreVisible ? "Less" : "More"}</span>
      </li>
    </ul>
  );
};

export default NavItems;
