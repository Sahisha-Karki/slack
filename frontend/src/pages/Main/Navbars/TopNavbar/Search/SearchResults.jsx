import React, { useState, useEffect } from 'react';
import './SearchResults.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faChevronDown, faChevronRight, faTimes, faFileAlt, faFilePdf, faFileImage, faFileAudio, faFileVideo, faFilePowerpoint, faFileWord, faFileExcel, faFileCode } from '@fortawesome/free-solid-svg-icons';

const fakeResults = [
  { id: 1, category: 'General', date: 'Jul 22 at 7:55 AM', sharedBy: 'Gaurav Dahal', type: 'document', title: 'Shared by Gaurav Dahal today', file: 'image.png' },
  { id: 2, category: 'General', date: 'Jul 22 at 7:55 AM', sharedBy: 'John Doe', type: 'document', title: 'hello', file: 'image.png' },
  { id: 3, category: 'General', date: 'Jul 22 at 7:55 AM', sharedBy: 'Gaurav Dahal', type: 'document', title: 'Worker List.xlsx', file: 'image.png' },
  { id: 4, category: 'Daily-attendance', date: 'Jul 15 at 10:55 AM', sharedBy: 'Niraj', type: 'document', title: 'hello', file: 'image.png' },
  { id: 5, category: 'General', date: 'Jul 21 at 9:55 AM', sharedBy: 'Jesish Khadka', type: 'document', title: 'hello', file: 'image.png' },
  { id: 6, category: 'Projects', date: 'Jul 20 at 3:15 PM', sharedBy: 'Alice Johnson', type: 'pdf', title: 'Project Report 2024', file: 'image.png' },
  { id: 7, category: 'Meeting Notes', date: 'Jul 19 at 2:30 PM', sharedBy: 'Bob Smith', type: 'document', title: 'Meeting Notes - July', file: 'image.png' },
  { id: 8, category: 'Design', date: 'Jul 18 at 11:00 AM', sharedBy: 'Emily Davis', type: 'image', title: 'Design Mockups', file: 'image.png' },
  { id: 9, category: 'General', date: 'Jul 17 at 9:00 AM', sharedBy: 'Michael Brown', type: 'audio', title: 'Team Meeting Recording', file: 'image.png' },
  { id: 10, category: 'Research', date: 'Jul 16 at 4:45 PM', sharedBy: 'Sarah Wilson', type: 'document', title: 'Research Findings', file: 'image.png' }
];


const resultsPerPage = 5; // Number of results per page

const SearchResults = ({ query }) => {
  const [sortBy, setSortBy] = useState('A-Z');
  const [filterBy, setFilterBy] = useState('');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isFilesDropdownOpen, setIsFilesDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.sort-by-container') &&
        isSortDropdownOpen
      ) {
        setIsSortDropdownOpen(false);
      }
      if (
        !event.target.closest('.filter-container') &&
        isFilterDropdownOpen
      ) {
        setIsFilterDropdownOpen(false);
        setIsDateDropdownOpen(false);
        setIsFilesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortDropdownOpen, isFilterDropdownOpen, isDateDropdownOpen, isFilesDropdownOpen]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsSortDropdownOpen(false);
  };

  const handleFilterChange = (value) => {
    setFilterBy(value);
    setIsDateDropdownOpen(value === 'date');
    setIsFilesDropdownOpen(value === 'type');
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(prevState => !prevState);
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(prevState => !prevState);
  };

  const toggleDateDropdown = () => {
    setIsDateDropdownOpen(prevState => !prevState);
  };

  const toggleFilesDropdown = () => {
    setIsFilesDropdownOpen(prevState => !prevState);
  };

  const clearFilters = () => {
    setFilterBy('');
    setIsFilterDropdownOpen(false);
    setIsDateDropdownOpen(false);
    setIsFilesDropdownOpen(false);
  };

  const sortResults = (results) => {
    switch (sortBy) {
      case 'A-Z':
        return results.sort((a, b) => a.title.localeCompare(b.title));
      case 'Z-A':
        return results.sort((a, b) => b.title.localeCompare(a.title));
      case 'Newest':
        return results.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'Oldest':
        return results.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return results;
    }
  };

  const paginateResults = (results) => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return results.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(fakeResults.length / resultsPerPage);

  const renderResults = () => {
    if (!query) {
      return <div>Please enter a search query.</div>;
    }

    const results = sortResults(fakeResults);
    const paginatedResults = paginateResults(results);

    if (query && results.length === 0) {
      return (
        <div className="no-results">
          <h4>Nothing turned up.</h4>
          <p>You may want to try using different keywords, checking for typos, or adjusting your filters.</p>
          <a>Learn more about search.</a>
        </div>
      );
    }

    return (
      <div>
        <div className="results-list">
          {paginatedResults.map(result => (
            <div key={result.id} className="result-item">
              <div className="result-icon">
                <img src={`./images/files/${result.file}`} alt={result.title} className="result-icon" />
              </div>
              <div className="result-details">
                <div className="result-category">{result.category}</div>
                <div className="result-title">{result.title}</div>
                <div className="result-shared-by">Shared by {result.sharedBy}</div>
              </div>
              <div className="result-date">{result.date}</div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button 
            className="pagination-button" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index} 
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`} 
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="pagination-button" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="search-results-container">
      <div className="search-results-navbar">
        <a href="#all">All</a>
        <a href="#messages">Messages</a>
        <a href="#notes">Notes</a>
        <a href="#files">Files</a>
        <a href="#channels">Channels</a>
        <a href="#people">People</a>
      </div>
      <div className="search-results-controls">
        {isFilterDropdownOpen && (
          <button className="clear-filters" onClick={clearFilters}>
             Clear Filters
          </button>
        )}
        <div className="filter-container">
          <button className="filter" onClick={toggleFilterDropdown}>
            <img src="./images/filter.png" alt="fliter" className='fa-filter' />Filter
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </button>
          {isFilterDropdownOpen && (
            <div className="filter-dropdown">
              <button onClick={() => handleFilterChange('date')}>
                Date <FontAwesomeIcon icon={faChevronRight} className="side-arrow" />
              </button>
              <button onClick={() => handleFilterChange('type')}>
                Files <FontAwesomeIcon icon={faChevronRight} className="side-arrow" />
              </button>
            </div>
          )}
          {isDateDropdownOpen && (
            <div className="sub-dropdown date-dropdown">
              <label> Today <input type="checkbox" /></label>
              <label> Yesterday <input type="checkbox" /></label>
              <label> Last 7 days <input type="checkbox" /></label>
              <label> Last 15 days <input type="checkbox" /></label>
              <label> Last 30 days <input type="checkbox" /></label>
              <label> Last 3 months <input type="checkbox" /></label>
              <label> Last 12 months <input type="checkbox" /></label>
              <label className="no-checkbox"> On </label>
              <label className="no-checkbox"> Before </label>
              <label className="no-checkbox"> After </label>
              <label className="no-checkbox"> Range </label>
            </div>
          )}
          {isFilesDropdownOpen && (
            <div className="sub-dropdown files-dropdown">
              <label><img src="./images/files/notes.png" alt="Notes & Posts" /> Notes & Posts <input type="checkbox" /></label>
              <label><img src="./images/files/document.png" alt="Documents" /> Documents <input type="checkbox" /></label>
              <label><img src="./images/files/email.png" alt="Emails" /> Emails <input type="checkbox" /></label>
              <label><img src="./images/files/image.png" alt="Images" /> Images <input type="checkbox" /></label>
              <label><img src="./images/files/pdf.png" alt="PDFs" /> PDFs <input type="checkbox" /></label>
              <label><img src="./images/files/file.png" alt="Presentations" /> Presentations <input type="checkbox" /></label>
              <label><img src="./images/files/vector.png" alt="Snippets" /> Snippets <input type="checkbox" /></label>
              <label><img src="./images/files/audio.png" alt="Audios" /> Audios <input type="checkbox" /></label>
              <label><img src="./images/files/video.png" alt="Videos" /> Videos <input type="checkbox" /></label>
            </div>
          )}
        </div>
        <div className="sort-by-container">
          <button className="sort-by" onClick={toggleSortDropdown}>
            Sort By
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </button>
          {isSortDropdownOpen && (
            <div className="sort-dropdown">
              <label>
                <input
                  type="checkbox"
                  checked={sortBy === 'A-Z'}
                  onChange={() => handleSortChange('A-Z')}
                />
                A-Z
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortBy === 'Z-A'}
                  onChange={() => handleSortChange('Z-A')}
                />
                Z-A
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortBy === 'Newest'}
                  onChange={() => handleSortChange('Newest')}
                />
                Newest
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortBy === 'Oldest'}
                  onChange={() => handleSortChange('Oldest')}
                />
                Oldest
              </label>
            </div>
          )}
        </div>
      </div>
      {renderResults()}
    </div>
  );
};

export default SearchResults;