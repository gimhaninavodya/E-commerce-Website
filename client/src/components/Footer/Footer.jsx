import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaMediumM } from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Head Office */}
        <div className="footer-section">
          <h3 className="footer-title">Head Office</h3>
          <p>No, 12, Flower Road, Colombo, Sri Lanka</p>
          <p>info@lydia.com</p>
          <p>+94 71 2345 678</p>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-title">Categories</h3>
          <ul>
            <li><Link to="/fashion">Fashion</Link></li>
            <li><Link to="/home">Home & Kitchen</Link></li>
            <li><Link to="/beauty">Beauty & Personal Care</Link></li>
            <li><Link to="/electronics">Electronics</Link></li>
            <li><Link to="/sports">Sports & Outdoors</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/mysells">Shop</Link></li>
            <li><Link to="/reviews">Feedback</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* We Are Open */}
        <div className="footer-section">
          <h3 className="footer-title">We are open</h3>
          <p>Mon - Fri : 9.00 - 17.00</p>
          <p>Sat : 9.00 - 12.00</p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="footer-icons">
        <FaTwitter />
        <FaInstagram />
        <FaFacebookF />
        <FaYoutube />
        <FaMediumM />
      </div>

      {/* Footer Text */}
      <p className="footer-text">
        Shop from over 100+ best brands with Fashion, Home & Kitchen, Beauty & Personal Care,
        Electronics and the Sports & Outdoors Products
      </p>

      {/* Bottom Links */}
      <p className="footer-bottom">
        Terms & Conditions | Privacy Policy | © 2025 Lydia. All rights reserved.
      </p>

      {/* Brand Name */}
      <h2 className="footer-brand">LYDIA</h2>
    </footer>
  );
};

export default Footer;