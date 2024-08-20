import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faWhatsapp, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../../Styles/Header&Footer/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-left">
        <img src="./images/slack.svg.png" alt="Company Logo" className="footer-logo" />
        <div className="footer-contact">
          <p><FontAwesomeIcon icon={faEnvelope} className="contact-icon" /> contact@bramhabytes.com</p>
          <p><FontAwesomeIcon icon={faPhone} className="contact-icon" /> +977-91232065656</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" /> Itahari, Sunsari, Sunsari, Nepal</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" /> Shanishchare Road, Birtamode, Jhapa, Nepal</p>
        </div>
      </div>
      <div className="footer-center">
      <div className="footer-social">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
            <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </div>
          <div className="footer-services">
            <div className="inner-footer-service">
            <h2>Services</h2>
    <div className="footer-links">
        <p>Product</p>
        <p>Features</p>
        <p>Solutions</p>
        <p>Resources</p>
        <p>Company</p>
        <p>Why Slack?</p>
        <p>About Us</p>
        <p>Privacy</p>
    </div>
            </div>
    
</div>

      </div>
      <div className="footer-subscribe-section">
          <p>Subscribe for Latest News and Resources</p>
          <div className="footer-subscribe">
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
