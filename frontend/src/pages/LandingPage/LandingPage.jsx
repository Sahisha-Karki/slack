// src/pages/LandingPage/LandingPage.js
import React from "react";
import "./LandingPage.css";
import Footer from "../../components/Header&Footer/Footer";
import Header from "../../components/Header&Footer/Header"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faArrowRight, faUsers, faLock } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  return (
    <div className="landing-page-main-container">
      <div className="landing-page">
        <Header /> 

        <section className="landing-hero">
          <div className="landing-hero-content">
            <h1>Revolutionize Team Communication with Slack</h1>
            <p>An innovative chat platform with advanced features for seamless collaboration</p>
            <div className="landing-button-container">
              <button className="landing-contact-button">
                <span className="landing-button-text"> Start Demo </span>
              </button>
              <button className="landing-email-button">
                <span className="landing-button-text">Get Started</span>
                <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
              </button>
            </div>
          </div>
          <div className="landing-hero-image">
            <img
              src="./images/polygon.png"
              alt="Polygon"
              className="polygon-img"
            />
            <img
              src="./images/top-rectangle.png"
              alt="Website interface"
              className="polygon-top-img"
            />
          </div>
        </section>

{/*         
        <section className="landing-info">
          <div className="landing-info-image">
            <img
              src="./images/semirectangle.png"
              alt="Semirectangle"
              className="Semi-rectangle-img"
            />
            <img
              src="./images/semirectangletop.png"
              alt="Seamless Messaging"
              className="semi-rectangle-top-img"
            />
          </div>
          <div className="landing-info-content">
            <h1 className="info-heading">Seamless Messaging</h1>
            <p className="info-subheading">Work together in dedicated spaces</p>
            <p className="info-description">
              Channels are flexible spaces for all the people, tools and files you need to get work done—no matter how you work.
            </p>
            <div className="info-channels">
              <p className="channel">
                <img src="./images/public.png" alt="Public" className="channel-icon"  />
                Public channels
              </p>
              <p className="channel">
                <img src="./images/private.png" alt="Private" className="channel-icon" />
                Private channels
              </p>
            </div>
            <button className="info-learn-more-button">Learn More</button>
          </div>
        </section> */}

      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
