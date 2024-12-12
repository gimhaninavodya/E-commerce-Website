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
      setLoading(true);
      try {
        if (!userId) {
          throw new Error("User ID is missing.");
        }
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}/cart`
        );
        console.log("API Response:", response);
        setCart(response.data || []);
      } catch (error) {
        console.error("Failed to fetch cart data:", error.message);
        setError(error.message || "Failed to load cart data.");
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

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/cart/update`,
        {
          userId,
          productId,
          quantity: newQuantity,
        }
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId?._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error.message);
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
        <div>
          {cart.map((item) => (
            <div
              key={item.productId?._id || item._id}
              className="cart-item"
            >
              <div className="cart-item-details">
                <img
                  src={`http://localhost:3000/${item.productId?.images?.[0] || "default-image.jpg"}`}
                  alt={item.productId?.name || "Product Image"}
                  className="cart-item-image"
                />
                <div>
                  <h4>{item.productId?.name || "Product Name"}</h4>
                  <p>
                    Quantity:
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange(
                          item.productId?._id,
                          item.quantity - 1
                        );
                      }}
                      className="quantity-button"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange(
                          item.productId?._id,
                          item.quantity + 1
                        );
                      }}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </p>
                  <p>Price: ${item.productId?.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.productId?._id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
