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

          <p>
            At <strong>Lydiya</strong>, we believe in making shopping easy,
            enjoyable, and secure. Whether you’re a passionate entrepreneur
            looking to showcase your unique creations or a savvy shopper
            hunting for the best deals, our platform is designed to meet your
            needs.
          </p>
        </div>
      </div>

      {/* Mission and Join Us Section */}
      <div className="mission-container">
        {/* Left Side: Text */}
        <div className="mission-text">
          <h3>Our Mission</h3>
          <p>
            We’re on a mission to simplify e-commerce while fostering
            creativity and connection. At <strong>Lydiya</strong>, we
            celebrate individuality and aim to create a vibrant marketplace
            where everyone has the opportunity to thrive.
          </p>

          <h3>Join Us Today</h3>
          <p>
            Become a part of the <strong>Lydiya</strong> community and
            experience a world of convenience and endless possibilities. Let’s
            build a better shopping experience together.
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
