import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Checkout.css";
import { useAuth } from "../../contexts/AuthContext";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit-card",
  });
  const { userData } = useAuth();
  const userId = userData?._id;
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
      const fetchCart = async () => {
        if (!userId) {
          setError("User ID is missing.");
          setLoading(false);
          return;
        }
  
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/api/user/${userId}/cart`
          );
          setCart(response.data || []);
          calculateTotalPrice(response.data);
        } catch (err) {
          setError(err.message || "Failed to load cart data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchCart();
    }, [userId]);
  

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const orderData = {
        ...formData,
        cart,
        totalPrice,
        date: new Date(),
      };
  
      // Send order and payment data to the backend
      const response = await axios.post("http://localhost:3000/api/payment/checkout", orderData);
  
      // Clear the user's cart after successful payment
      await axios.post("http://localhost:3000/api/user/cart/clear", { userId });
  
      setMessage("Order placed successfully! Payment processed.");
      setCart([]); // Update the UI to reflect the empty cart
      setFormData({
        name: "",
        email: "",
        address: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: "credit-card",
      });
    } catch (err) {
      setMessage("Failed to place the order or process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };    

  if (loading) return <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Loading your cart...</p>;
  if (error) return <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>{error}</p>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {message && <p className="checkout-message">{message}</p>}
      <div className="checkout-content">
        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.productId?._id || item._id}>
                  {item.productId?.name} - {item.quantity} x ${item.productId?.price.toFixed(2)} = $
                  {(item.quantity * (item.productId?.price || 0)).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>

        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Billing Details</h3>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>

          {formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card" ? (
            <>
              <h3>Payment Details</h3>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </>
          ) : null}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;