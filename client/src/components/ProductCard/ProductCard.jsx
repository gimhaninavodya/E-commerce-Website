import React from "react";
import "./ProductCard.css";
import HeartButton from "../Heart/HeartButton";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart, userId, likedItems }) => {
  const isLiked = likedItems.includes(product._id);

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:3000/api/user/cart", {
        userId,
        productId: product._id,
        quantity: 1,
      });
      alert(`${product.name} added to cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      <HeartButton
        productId={product._id}
        userId={userId}
        isLiked={isLiked}
        onToggle={(updatedLikes) => console.log("Updated likes:", updatedLikes)}
      />
      <Link to={`/product/${product._id}`} className="product-link">
      <img
        src={`http://localhost:3000/${product.images[0]}`}
        alt={product.name}
        className="image"
      />
      </Link>
      <div className="details">
        <div className="row">
          <div className="left">
            <h2>{product.name}</h2>
          </div>
          <div className="right">
            <span className="price">$ {product.price}.00</span>
          </div>
        </div>
        <p className="description">{product.description.substring(0, 50)}...</p>
        <button onClick={() => addToCart(product)} className="addButton">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
