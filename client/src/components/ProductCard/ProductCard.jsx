import React from "react";
import "./ProductCard.css";
import HeartButton from "../Heart/HeartButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import defaultProfile from "../../assets/profile.jpg";

const ProductCard = ({ product, handleAddToCart, userId, likedItems }) => {
  const isLiked = likedItems.includes(product._id);
  const isOutOfStock = product.stock <= 0;

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:3000/api/user/cart", {
        userId,
        productId: product._id,
        quantity: 1,
      });
      Swal.fire({
        title: "Product Item Added to Cart!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      {isOutOfStock && <div className="sold-out-badge">Sold Out</div>}
      {/* TOP HEART: Visible on Web, Hidden on Mobile */}
      <div className="heart-button-wrapper desktop-heart">
        <HeartButton
            productId={product._id}
            userId={userId}
            isLiked={isLiked}
            onToggle={(updatedLikes) => console.log("Updated likes:", updatedLikes)}
        />
      </div>
      <Link to={`/product/${product._id}`} className="product-link">
        <img
            src={`http://localhost:3000/${product.images[0]}`}
            alt={product.name}
            className={`image ${isOutOfStock ? "grayscale" : ""}`}
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
        <div className="card-footer-action">
          <button
              onClick={() => !isOutOfStock && addToCart(product)}
              className={`addButton ${isOutOfStock ? "disabled" : ""}`}
              disabled={isOutOfStock}
          >
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
          <div className="seller-info-container">
            {/* BOTTOM HEART: Hidden on Web, Visible on Mobile */}
            <div className="mobile-heart-inline">
              <HeartButton
                  productId={product._id}
                  userId={userId}
                  isLiked={isLiked}
                  onToggle={(updatedLikes) => console.log("Updated likes:", updatedLikes)}
              />
            </div>
            <div className="seller-info">
              <span className="seller-name">{product.seller?.name || "Seller"}</span>
              <img src={defaultProfile} alt="seller" className="seller-avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
