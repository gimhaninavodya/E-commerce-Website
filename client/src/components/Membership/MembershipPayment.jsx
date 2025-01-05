import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Container } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const MembershipPaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit-card",
  });
  const location = useLocation();
  const { userData, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const plan = location.state?.plan || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const membershipType = plan.title;
  const membershipPrice = plan.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const membershipData = {
        ...formData,
        membershipType,
        membershipPrice,
        date: new Date(),
      };

      await axios.post(
        "http://localhost:3000/api/membership/getMembership",
        membershipData
      );

      Swal.fire({
        title: "Membership Request Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/shopinfo");
        handleBecomeSeller();
      });

      setCart([]);
      setFormData({
        name: "",
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: "credit-card",
      });
    } catch (err) {
      setMessage("Failed to get the membership. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="checkout-container">
    <Container >
      <h1 style={{fontSize:"30px"}}>Membership Payment</h1><br />
      <h4>Membership Type Details</h4><br />
      <h6>
        Membership Type: <strong>{plan.title}</strong>
      </h6>
      <h6>
        Membership Price: <strong>${plan.price}/month</strong>
      </h6>
      <Form className="Checkout-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className="Checkout-field"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Form.Control
            className="Checkout-field"
            name="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Label htmlFor="paymentMethod">Payment Method</Form.Label>
          <Form.Select
            className="Checkout-field"
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

          {(formData.paymentMethod === "credit-card" ||
            formData.paymentMethod === "debit-card") && (
            <>
              <br />
              <h4>Payment Details</h4>

              <Form.Control
                className="Checkout-field"
                placeholder="Card Number"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              <Form.Control
                className="Checkout-field"
                placeholder="Expiry Date (MM/YY)"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
              <Form.Control
                className="Checkout-field"
                placeholder="CVV"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className="checkout-form button">
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </Form.Group>
      </Form>
    </Container>
    </div>
  );
};

export default MembershipPaymentForm;
