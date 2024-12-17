import React from "react";
import { useNavigate } from "react-router-dom";
import seller from '../../assets/seller.jpg';
import "./ShopAd.css";

const ShopAd = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/shopinfo");
  };

  return (
    <div className="shop-ad-container">
      {/* Left Side: Text Content */}
      <div className="shop-ad-text">
        <h2>Want to become a seller? Now you can have your own shop!</h2>
        <p>Sell your own products on our platform.</p>
        <button className="shop-ad-button" onClick={handleLearnMore}>
          Learn More
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="shop-ad-image">
        <img
          src={seller}
          alt="Become a Seller"
        />
      </div>
    </div>
  );
};

export default ShopAd;
