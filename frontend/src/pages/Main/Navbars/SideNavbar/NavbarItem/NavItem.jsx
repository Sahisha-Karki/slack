import React from 'react';
import './NavItem.css';

const NavItems = ({ onNavItemClick }) => {
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
      <li className="nav-item" onClick={() => onNavItemClick('more')}>
        <img src="./images/more.png" alt="More Icon" className="nav-icon" />
        <span>More</span>
      </li>
    </ul>
  );
};

export default NavItems;
