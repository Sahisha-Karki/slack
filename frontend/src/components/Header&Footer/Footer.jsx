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
          <p className="footer-contact-item"><FontAwesomeIcon icon={faEnvelope} className="contact-icon" /> contact@bramhabytes.com</p>
          <p className="footer-contact-item"><FontAwesomeIcon icon={faPhone} className="contact-icon" /> +977-91232065656</p>
          <p className="footer-contact-item"><FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" /> Itahari, Sunsari, Sunsari, Nepal</p>
          <p className="footer-contact-item"><FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" /> Shanishchare Road, Birtamode, Jhapa, Nepal</p>
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
            <h2 className="footer-services-title">Services</h2>
            <div className="footer-links">
              <p className="footer-link-item">Product</p>
              <p className="footer-link-item">Features</p>
              <p className="footer-link-item">Solutions</p>
              <p className="footer-link-item">Resources</p>
              <p className="footer-link-item">Company</p>
              <p className="footer-link-item">Why Slack?</p>
              <p className="footer-link-item">About Us</p>
              <p className="footer-link-item">Privacy</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-subscribe-section">
        <p className="footer-subscribe-title">Subscribe for Latest News and Resources</p>
        <div className="footer-subscribe">
          <input type="email" placeholder="Your Email" className="footer-subscribe-input" />
          <button className="footer-subscribe-button">Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
