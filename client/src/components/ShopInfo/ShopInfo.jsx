import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import shop from "../../assets/ad1.jpg";
import "./ShopInfo.css";
import { Button } from "react-bootstrap";

const ShopInfo = () => {
  const { userData, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleBecomeSeller = async () => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/${userData._id}/become-seller`
      );
      // Update user data locally
      login(userData.token, { ...userData, role: "seller", isSeller: true });
      setSuccessMessage("Congratulations! You are now a seller.");
    } catch (error) {
      console.error("Error becoming a seller:", error);
      setSuccessMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shop-info-container">
      <h1>Start Your Journey as a Seller!</h1>
      <p>
        Becoming a seller opens up a world of opportunities! Create your own
        shop, list your products, and reach a global audience. It's quick and
        easy—just click the button below to get started.
      </p>

      <div className="shop-info-content">
        <img src={shop} alt="Shop illustration" className="shop-info-image" />
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
            <li>By click the "Become a Seller" button below you agree to the seller terms and conditions. Meck sure you read it!</li>
            <li>After that you can manage your shop by adding your products.</li>
            <li>Make sure that you are responsible for your products correctivenes and track, increase your sells profit.</li>
          </ul>
        </div>
        <img src={shop} alt="Shop illustration" className="shop-info-image" />
      </div>

      <br />
      <br />
      <div className="">
        <h2>Our Terms and Conditions</h2>
        <ul>
          <li>Log in to your account on our platform.</li>
          <li>By click the "Become a Seller" button below you agree to the seller terms and conditions.</li>
          <li>After that you can manage your shop by adding your products.</li>
          <li>Make sure that you are responsible for your products correctivenes and track, increase your sells profit.</li>
        </ul>
      </div>
      <br />

      <div>
        {userData && !userData.isSeller ? (
          <>
            <button
              className="become-seller-button"
              onClick={handleBecomeSeller} // Pass the function reference
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
            <h3>You are a seller! Manage and track your sells now!.</h3>
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
  );
};

export default ShopInfo;
