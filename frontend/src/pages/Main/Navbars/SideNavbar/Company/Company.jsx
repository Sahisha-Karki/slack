import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation for accessing route state
import axios from "axios";
import "./Company.css";

const CompanyHeading = () => {
  const [workspace, setWorkspace] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Access route state
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleMouseEnter = () => setIsSubOpen(true);
  const handleMouseLeave = () => setIsSubOpen(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsSubOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Check if workspace data is passed through navigation state
    if (location.state && location.state.workspace) {
      setWorkspace(location.state.workspace);
      setLoading(false);
    } else {
      // Fetch workspace data if not passed through location state
      const fetchWorkspaceData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/workspaces/current-workspace", {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setWorkspace(response.data.workspace);
        } catch (error) {
          setError(error.message || 'Failed to fetch workspace');
        } finally {
          setLoading(false);
        }
      };

      fetchWorkspaceData();
    }
  }, [location.state]);

  const handleNavigate = () => {
    if (workspace) {
      navigate("/main", { state: { workspace } }); // Pass workspace data to Main page
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="company-heading-container" ref={dropdownRef}>
      <div className="company-heading-header" onClick={handleNavigate}>
        <span className="company-heading-name">{workspace?.name || "Your Company"}</span>
        <img
          src="./images/v.png"
          alt="Dropdown"
          className="company-heading-dropdown-icon"
        />
      </div>
      {isOpen && (
        <div className="company-heading-dropdown-menu">
          <div className="company-heading-dropdown-item">
            <img src={workspace?.logo || "./images/default-logo.png"} alt="Logo" className="company-heading-logo-icon" />
            <div className="company-heading-dropdown-content">
              <span className="company-heading-company-name">{workspace?.name || "Your Company"}</span>
              <span className="company-heading-email">{workspace?.email || "yourcompany@gmail.com"}</span>
            </div>
          </div>
          <div className="company-heading-dropdown-item">
            <img src="./images/update.png" alt="Update" />
            <div className="company-heading-dropdown-content">
              <span>Update</span>
              <p>Explore more features of Slack</p>
            </div>
          </div>
          <div className="company-heading-dropdown-item">
            <img
              src="./images/invite.png"
              alt="Invite"
              className="company-heading-dropdown-icon"
            />
            Invite People
          </div>
          <div className="company-heading-dropdown-item">
            <img
              src="./images/setting.png"
              alt="Preferences"
              className="company-heading-dropdown-icon"
            />
            Preferences
          </div>
          <div
            className="company-heading-dropdown-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="./images/tool.png"
              alt="Tools and Settings"
              className="company-heading-dropdown-icon"
            />
            Tools and Settings
            <img
              src="./images/rightfill.png"
              alt="Sub-dropdown"
              className={`company-heading-dropdown-sub-icon ${isSubOpen ? "rotate" : ""}`}
            />
            {isSubOpen && (
              <div className="company-heading-sub-dropdown-menu">
                <div className="company-heading-dropdown-heading">Tools and Settings</div>
                <div className="company-heading-dropdown-item">Customize workspace</div>
                <div className="company-heading-dropdown-item">Workspace analytics</div>
              </div>
            )}
          </div>
          <div className="company-heading-dropdown-item">
            <img
              src="./images/signout.png"
              alt="Sign Out"
              className="company-heading-dropdown-icon"
            />
            Sign Out
          </div>
          {error && <div className="company-heading-error">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default CompanyHeading;