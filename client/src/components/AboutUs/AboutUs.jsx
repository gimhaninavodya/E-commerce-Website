import React from "react";
import about from "../../assets/about.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <h3 className="titleH3">
        Who We Are
      </h3>
      <div className="about-container">
        {/* Left Side: Image */}
        <div className="about-image">
          <img src={about} alt="aboutUs pic" />
        </div>

        {/* Right Side: Text Content */}
        <div className="about-text">
          <p>Welcome to our platform!</p>
          <p>In this shop you can buy fashion, home and kitchen, beauty and personal care, electronics and sports and outdoor items. 
            Also users can be a seller and sell there own products in our platform!</p>
          <p>In this shop you can buy fashion, home and kitchen, beauty and personal care, electronics and sports and outdoor items. 
            Also users can be a seller and sell there own products in our platform!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
