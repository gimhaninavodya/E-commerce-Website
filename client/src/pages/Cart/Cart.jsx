import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import close from "../../assets/close.png";
import "./Cart.css";
import { Link } from "react-router-dom";

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

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };  

  if (loading) return <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Loading your cart...</p>;
  if (error) return <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>{error}</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Your cart is empty.</p>
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
                  <h4>{product?.name || "Product Name1"}</h4>
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
                    <img src={close} alt="close button" style={{width: "20px", height: "20px"}}/>
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cart-summary">
            <div className="cart-left">
              <h4>Pay  ${(calculateTotal() + (calculateTotal() * (2/100)) + (calculateTotalQuantity() * 4)).toFixed(2)} now in here!</h4>
              <Link to="/checkout">
                <button className="checkout-button">Check Out</button>
              </Link>
            </div>
            <div className="cart-right">
              <div className="cart-summary-price">
                <h5>Sub Total Price: </h5>
                <h5>${calculateTotal().toFixed(2)}</h5>
              </div><br />
              <div className="cart-summary-price">
                <h5>Shipping Cost: </h5>
                <h5>${(calculateTotalQuantity() * 4).toFixed(2)}</h5>
              </div><br />
              <div className="cart-summary-price">
                <h5>Tax Price: </h5>
                <h5>${(calculateTotal() * (2/100)).toFixed(2)}</h5>
              </div><br />
              <div className="cart-summary-price">
                <h5>Total Price: </h5>
                <h5>${(calculateTotal() + (calculateTotal() * (2/100)) + (calculateTotalQuantity() * 4)).toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
