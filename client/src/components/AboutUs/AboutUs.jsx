import React from "react";
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <h3 className="titleH3">Who We Are</h3>
      <div className="about-container">
        {/* Left Side: Image */}
        <div className="about-image">
          <img src={about1} alt="About Us" />
        </div>

        {/* Right Side: Text Content */}
        <div className="about-text">
          <p>
            Welcome to <strong>Lydiya</strong>, your one-stop destination for
            discovering, buying, and selling amazing products online. We are
            more than just an e-commerce platform; we are a community that
            connects buyers and sellers, empowering individuals and businesses
            to thrive in today’s digital marketplace.
          </p>
          <br />
          <p>
            At <strong>Lydiya</strong>, we believe in making shopping easy,
            enjoyable, and secure. Whether you’re a passionate entrepreneur
            looking to showcase your unique creations or a savvy shopper hunting
            for the best deals, our platform is designed to meet your needs.
          </p>
        </div>
      </div>

      {/* Mission and Join Us Section */}
      <div className="mission-container">
        {/* Left Side: Text */}
        <div className="mission-text">
          <h3>What Sets Us Apart</h3>
          <p>
            At <strong>Lydiya</strong>, we go beyond buying and selling; we
            focus on building trust and fostering connections. Our platform is
            designed for transparency, quality, and customer satisfaction.
          </p>
          <ul>
            <li>
              <strong>Community First:</strong> A platform where buyers and
              sellers can connect and thrive.
            </li>
            <li>
              <strong>Continuous Innovation:</strong> We adapt and evolve with
              new technology for a better shopping experience.
            </li>
          </ul>
          <br />
          <h3>Our Commitment to You</h3>
          <p>
            At <strong>Lydiya</strong>, we promise secure transactions,
            personalized support, and exceptional service. Join our community
            and experience a new way to shop.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="mission-image">
          <img src={about2} alt="Our Mission" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
