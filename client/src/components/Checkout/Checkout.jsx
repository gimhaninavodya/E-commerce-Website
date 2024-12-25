import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Checkout.css";
import "../../pages/Cart/Cart.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch cart data when the component mounts and when userId changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setError("User ID is missing. Please log in to continue.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}/cart`
        );
        setCart(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load cart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("User ID is missing. Please log in to place an order.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const totalPrice =
        calculateTotal() +
        calculateTotal() * (2 / 100) +
        calculateTotalQuantity() * 4;

      const orderData = {
        ...formData,
        cart,
        totalPrice,
        date: new Date(),
      };

      // Send order and payment data to the backend
      await axios.post("http://localhost:3000/api/payment/checkout", orderData);

      // Clear the user's cart after successful payment
      await axios.post("http://localhost:3000/api/user/cart/clear", { userId });

      Swal.fire({
        title: "Placed Your Order Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
      });

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
      setMessage(
        "Failed to place the order or process payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p
        style={{
          margin: "120px",
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: "300",
          color: "gray",
        }}
      >
        Loading your cart...
      </p>
    );

  if (error)
    return (
      <p
        style={{
          margin: "120px",
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: "300",
          color: "gray",
        }}
      >
        {error}
      </p>
    );

  return (
    <div className="checkout-container">
      {message && <p className="checkout-message">{message}</p>}
      <div className="checkout-content">
        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <br />
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => {
                const product = item.productId;
                return (
                  <div key={product?._id || item._id} className="cart-item">
                    <div className="cart-item-image-container">
                      <img
                        src={`http://localhost:3000/${
                          product?.images?.[0] || "default-image.jpg"
                        }`}
                        alt={product?.name || "Product"}
                        className="cart-item-image"
                      />
                    </div>
                    <div className="cart-item-info">
                      <h4>{product?.name || "Product Name"}</h4>
                      <div className="quantity-control">
                        <span className="quantity-value">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <p>${(product?.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="summary-des">
            <div className="checkout-allprice">
              <div className="cart-summary-price">
                <h5>Sub Total Price: </h5>
                <h5>${calculateTotal().toFixed(2)}</h5>
              </div>
              <br />
              <div className="cart-summary-price">
                <h5>Shipping Cost: </h5>
                <h5>${(calculateTotalQuantity() * 4).toFixed(2)}</h5>
              </div>
              <br />
              <div className="cart-summary-price">
                <h5>Tax Price: </h5>
                <h5>${(calculateTotal() * (2 / 100)).toFixed(2)}</h5>
              </div>
              <br />
              <div className="cart-summary-price">
                <h5>Total Price: </h5>
                <h5>
                  $
                  {(
                    calculateTotal() +
                    calculateTotal() * (2 / 100) +
                    calculateTotalQuantity() * 4
                  ).toFixed(2)}
                </h5>
              </div>
            </div>
          </div>
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

          {(formData.paymentMethod === "credit-card" ||
            formData.paymentMethod === "debit-card") && (
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
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
