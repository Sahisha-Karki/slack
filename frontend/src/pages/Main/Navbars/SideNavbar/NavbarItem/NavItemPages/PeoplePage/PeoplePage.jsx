import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faSort, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './PeoplePage.css';

const peopleData = [
  {
    id: 1,
    name: 'Lizzie Austin',
    role: 'Global Community Lead',
    pronouns: 'she/her',
    image: './images/profile1.jpg',
    verified: true
  },
  {
    id: 2,
    name: 'Adi Williams',
    role: 'Global Community Lead',
    pronouns: 'she/her',
    image: './images/profile2.jpg',
    verified: true
  },
  {
    id: 3,
    name: 'Vova Lisa',
    role: 'Global Community Lead',
    pronouns: 'she/her',
    image: './images/profile1.jpg',
    verified: true
  },
  {
    id: 4,
    name: 'Lisa Jameson',
    role: 'Community Manager',
    pronouns: 'she/her',
    image: './images/profile2.jpg',
    verified: false
  },
  {
    id: 5,
    name: 'Jason Simpson',
    role: 'Design Director & Creative Lead',
    subRole: 'Superside | Design',
    image: './images/profile1.jpg',
    verified: true
  }
];

const PeoplePage = () => {
  const [people] = useState(peopleData);

  return (
    <div className="people-page">
      <h1 className="page-title">People</h1>
      <div className="people-page-search-bar">
        <div className="people-page-search-input-container">
          <input type="text" placeholder="Search people" className="people-page-search-input" />
          <FontAwesomeIcon icon={faSearch} className="people-page-search-icon" />
        </div>
        <div className="people-page-action-buttons">
        <button className="people-page-action-button"><FontAwesomeIcon icon={faFilter} /> Filter</button>
        <button className="people-page-action-button"><FontAwesomeIcon icon={faSort} /> Sort By</button>
        <button className="people-page-action-button"><FontAwesomeIcon icon={faStar} /> Recommended</button>
        <button className="people-page-action-button"><FontAwesomeIcon icon={faUserPlus} /> Invite</button>
        </div>
      </div>
      <div className="info-banner">
        <p>You can search people and connect with people here <span className="learn-more">Learn More</span></p>
      </div>
      <div className="people-grid">
        {people.map((person) => (
          <div key={person.id} className="person-card">
            <img src={person.image} alt={person.name} className="person-image" />
            <div className="person-info">
              <h3 className="person-name">
                {person.name}
                {person.verified && <span className="verified-icon"></span>}
              </h3>
              <p className="person-role">{person.role}</p>
              {person.subRole && <p className="person-subrole">{person.subRole}</p>}
              {person.pronouns && <p className="person-pronouns">{person.pronouns}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="people-page-pagination">
        <button className="page-number">1</button>
        <button className="page-number">2</button>
      </div>
    </div>
  );
};

export default PeoplePage;
