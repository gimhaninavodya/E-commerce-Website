import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./Cart.css";

const Cart = () => {
  const { userData } = useAuth();
  const userId = userData?._id;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const updateCartItem = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.patch(`http://localhost:3000/api/user/cart/update`, {
        userId,
        productId,
        quantity,
      });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId?._id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err.message);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/cart/remove`, {
        data: { userId, productId },
      });
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId?._id !== productId)
      );
    } catch (err) {
      console.error("Failed to remove item:", err.message);
    }
  };

  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => {
            const product = item.productId;
            return (
              <div key={product?._id || item._id} className="cart-item">
                <div className="cart-item-image-container">
                  <img
                    src={`http://localhost:3000/${product?.images?.[0] || "default-image.jpg"}`}
                    alt={product?.name || "Product"}
                    className="cart-item-image"
                  />
                </div>
                <div className="cart-item-info">
                  <h4>{product?.name || "Product Name"}</h4>
                  <div className="quantity-control">
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => updateCartItem(product?._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => updateCartItem(product?._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p>${(product?.price * item.quantity).toFixed(2)}</p>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeCartItem(product?._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cart-summary">
            <h3>Total Price: ${calculateTotal().toFixed(2)}</h3>
            <button className="checkout-button">Check Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
