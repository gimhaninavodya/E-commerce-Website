import React from "react";
import "./ContactUs.css";
import contact from "../../assets/contact.jpg";
import phone from "../../assets/telephone.png";
import gmail from "../../assets/email.png";
import location from "../../assets/location.png";

const ContactUs = () => {
  return (
    <div>
      <h3 className="titleH3">Contact Us</h3>
      <div className="contact-title">
        <p>
          wanna say hello to us! send a quick message to us. we are happy to
          hear you.
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-image">
          <img src={contact} alt="Contact" />
        </div>

        <div className="contact-info">
          {/* Phone Section */}
          <div className="info-item">
            <i className="icon">
              <div className="img-icon">
                <img src={phone} alt="Phone" />
              </div>
            </i>
            <div>
              <h3>Phone</h3>
              <p>+94 71 2345 678</p>
            </div>
            <a href="tel:+94712345678" className="action-btn">
              ➤
            </a>
          </div>

          {/* Email Section */}
          <div className="info-item">
            <i className="icon">
              <div className="img-icon">
                <img src={gmail} alt="Gmail" />
              </div>
            </i>
            <div>
              <h3>Gmail</h3>
              <p>info@lydia.com</p>
            </div>
            <a href="mailto:info@lydia.com" className="action-btn">
              ➤
            </a>
          </div>

          {/* Location Section */}
          <div className="info-item">
            <i className="icon">
              <div className="img-icon">
                <img src={location} alt="Location" />
              </div>
            </i>
            <div>
              <h3>Location</h3>
              <p>No.12, Flower Road, Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
