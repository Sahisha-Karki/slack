import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Header&Footer/Header.css"; 
const Header = ({ customButtonText, customButtonAction, additionalButton }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (customButtonAction) {
      customButtonAction();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="landing-header">
      <div className="landing-logo">
        <img src="./images/slack.svg.png" alt="Slack Logo" />
      </div>
      <nav className="landing-nav">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
        <a href="#services">Services</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <div className="landing-buttons">
        {additionalButton && <button className="landing-learn-more">{additionalButton}</button>}
        <button className="landing-sign-in" onClick={handleSignIn}>{customButtonText || "Sign In"}</button>
      </div>
    </header>
  );
};

export default Header;
