import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import "./Seller.css";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerForm = () => {
  const { userData, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    ShopPrice: 100,
    businessType: "individual",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      // Update ShopPrice based on the selected businessType
      if (name === "businessType") {
        const newShopPrice = value === "company" ? 250 : 100;
        return { ...prevFormData, [name]: value, ShopPrice: newShopPrice };
      }
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const sellerData = {
        ...formData,
        date: new Date(),
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/seller/addSeller`, sellerData);

      Swal.fire({
        title: "Seller Registration Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/shopinfo");
        handleBecomeSeller();
      });

      setFormData({
        name: "",
        email: "",
        businessName: "",
        businessType: "individual",
        ShopPrice: 100,
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: "credit-card",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while registering.");
    }
  };

  const handleBecomeSeller = async () => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/user/${userData._id}/become-seller`
      );
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
    <div className="Seller-container">
      <Container>
        <h1 style={{ fontSize: "30px" }}>Seller Registration</h1>
        <h5>Enter your and the shop details</h5>
        <br />
        <Form className="Seller-form" onSubmit={(e) => handleSubmit(e, formData)}>
          <Form.Group>
            {/* Seller Name */}
            <Form.Control
              className="Seller-field"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {/* Seller Email */}
            <Form.Control
              className="Seller-field"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* Business Name */}
            <Form.Control
              className="Seller-field"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
            {/* Business Type */}
            <Form.Label htmlFor="businessType">Business Type</Form.Label>
            <Form.Select
              className="Seller-field"
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
            >
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </Form.Select>

            {/* Shop Price */}
            <Form.Label htmlFor="businessPrice">Seller Fee</Form.Label>
            <Form.Control
              className="Seller-field"
              placeholder="Shop Price"
              value={`$${formData.ShopPrice}`}
              disabled
            />

            {/* Payment Method */}
            <Form.Label htmlFor="paymentMethod">Payment Method</Form.Label>
            <Form.Select
              className="Seller-field"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </Form.Select>

            {/* Conditional Payment Details */}
            {(formData.paymentMethod === "credit-card" ||
              formData.paymentMethod === "debit-card") && (
              <>
                <br />
                <h4>Payment Details</h4>
                <Form.Control
                  className="Seller-field"
                  placeholder="Card Number"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  className="Seller-field"
                  placeholder="Expiry Date (MM/YY)"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  className="Seller-field"
                  placeholder="CVV"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {/* Submit Button */}
            <div className="seller-form button">
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Become a Seller"}
              </button>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default SellerForm;
