import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTh, FaList } from 'react-icons/fa';
import './Files.css';

const Files = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('list');
  const [recentlyViewed, setRecentlyViewed] = useState('none');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/files/get-all-files');
        setFiles(response.data);
        setFilteredFiles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    let updatedFiles = [...files];

    if (searchTerm) {
      updatedFiles = updatedFiles.filter(file =>
        file.filename.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      updatedFiles = updatedFiles.filter(file => file.mimetype.startsWith(filterType));
    }

    if (sortBy === 'name') {
      updatedFiles.sort((a, b) => a.filename.localeCompare(b.filename));
    } else if (sortBy === 'date') {
      updatedFiles.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }

    setFilteredFiles(updatedFiles);
  }, [searchTerm, filterType, sortBy, files]);

  // Pagination logic
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastFile = currentPage * itemsPerPage;
  const indexOfFirstFile = indexOfLastFile - itemsPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>Error fetching files: {error.message}</p>;

  return (
    <div className="files-container">
      <div className="toolbar">
        <div className="toolbar-controls">
          <div className="toolbar-nav">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <select
              value={recentlyViewed}
              onChange={(e) => setRecentlyViewed(e.target.value)}
              className="recently-viewed-select"
            >
              <option value="none">Recently Viewed</option>
              <option value="1">File 1</option>
              <option value="2">File 2</option>
              {/* Add more options as needed */}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="application/pdf">PDFs</option>
              <option value="text/html">HTML</option>
              <option value="text/css">CSS</option>
              <option value="application/javascript">JS</option>
              <option value="application/zip">ZIP</option>
              <option value="application/msword">DOCS</option>
              <option value="text/plain">TXT</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
            </select>
            <div className="view-toggle">
              <FaList
                className={`view-icon ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              />
              <FaTh
                className={`view-icon ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="file-banner">
        <p>Any files shared in Slack can be found right here. <a href="#">Learn More</a></p>
      </div>

      <div className={`files-list ${viewMode}`}>
        {currentFiles.map((file) => (
          <div key={file._id} className={`file-item ${viewMode}`}>
            {file.mimetype.startsWith('image/') ? (
              <img src={file.url} alt={file.filename} className="file-image" />
            ) : file.mimetype.startsWith('video/') ? (
              <video controls className="file-video">
                <source src={file.url} type={file.mimetype} />
                Your browser does not support the video tag.
              </video>
            ) : file.mimetype === 'application/pdf' ? (
              <div className="file-preview">
                <img src="./images/pdf.png" alt="PDF" className="file-icon" />
              </div>
            ) : file.mimetype === 'text/html' ? (
              <div className="file-preview">
                <img src="./images/html.png" alt="HTML" className="file-icon" />
              </div>
            ) : file.mimetype === 'text/css' ? (
              <div className="file-preview">
                <img src="./images/css.png" alt="CSS" className="file-icon" />
              </div>
            ) : file.mimetype === 'application/javascript' ? (
              <div className="file-preview">
                <img src="./images/js.png" alt="JS" className="file-icon" />
              </div>
            ) : file.mimetype === 'application/zip' ? (
              <div className="file-preview">
                <img src="./images/zip.png" alt="ZIP" className="file-icon" />
              </div>
            ) : file.mimetype === 'application/msword' ? (
              <div className="file-preview">
                <img src="./images/docs.png" alt="DOCS" className="file-icon" />
              </div>
            ) : file.mimetype === 'text/plain' ? (
              <div className="file-preview">
                <img src="./images/txt.png" alt="TXT" className="file-icon" />
              </div>
            ) : (
              <div className="file-preview">
                <img src="./images/filep.png" alt="File" className="file-icon" />
              </div>
            )}
            <div className="file-info">
              <div className="file-name">{file.filename}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
