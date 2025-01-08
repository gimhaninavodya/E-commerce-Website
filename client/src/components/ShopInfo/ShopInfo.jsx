import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import shop1 from "../../assets/shop1.jpg";
import shop2 from "../../assets/shop2.jpg";
import shop3 from "../../assets/shop3.jpg";
import "./ShopInfo.css";

const ShopInfo = () => {
  const { userData, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="shop-info-container">
      <h1>Start Your Journey as a Seller!</h1>
      <p>
        Becoming a seller opens up a world of opportunities! Create your own
        shop, list your products, and reach a global audience. It's quick and
        easy—just click the button below to get started.
      </p>

      <div className="shop-info-content">
        <img src={shop1} alt="Shop illustration" className="shop-info-image" />
        <div className="shop-info-details">
          <h2>Benefits of Becoming a Seller</h2>
          <ul>
            <li>Sell your products to a global market.</li>
            <li>Access real-time analytics and sales data.</li>
            <li>Promote your brand and grow your business.</li>
            <li>Secure transactions and hassle-free order processing.</li>
            <li>Dedicated tools for product management.</li>
          </ul>
        </div>
      </div>

      <div className="shop-info-content">
        <div className="shop-info-details">
          <h2>How to Become a Seller</h2>
          <ul>
            <li>Log in to your account on our platform.</li>
            <li>By click the "Become a Seller" button below you agree to the seller terms and conditions. Mack sure you read it!</li>
            <li>After that you can manage your shop by adding your products.</li>
            <li>Make sure that you are responsible for your products correctness and track, increase your sells profit.</li>
          </ul>
        </div>
        <img src={shop2} alt="Shop illustration" className="shop-info-image" />
      </div>

      <br />
      <br />
      <div className="">
        <h2>Our Terms and Conditions</h2>
        <ul>
          <li>Log in to your account on our platform.</li>
          <li>By click the "Become a Seller" button below you agree to the seller terms and conditions.</li>
          <li>After that you can manage your shop by adding your products.</li>
          <li>Make sure that you are responsible for your products correctness and track, increase your sells profit.</li>
        </ul>
      </div>
      <br />

      <div className="shop-content">
        <div className="shop-image">
          <img src={shop3} alt="shop" />
        </div>
      
        <div className="shop-info">
        {userData && !userData.isSeller ? (
          <>
            <h3 className="sellercon">I want to become a seller!</h3>
            <button
              className="become-seller-button"
              onClick={() => navigate("/seller")}
              disabled={loading}
            >
              {loading ? "Processing..." : "Become a Seller"}
            </button>

            {successMessage && (
              <div
                className={`message ${
                  successMessage.includes("error")
                    ? "error-message"
                    : "success-message"
                }`}
              >
                {successMessage}
              </div>
            )}
          </>
        ) : (
          <>
          <h3 className="sellercon">You are a seller! Manage and track your sells now!</h3>
            <button
              className="become-seller-button"
              onClick={() => navigate("/mysells")}
            >
              Go to my shop!
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
