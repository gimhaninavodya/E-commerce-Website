import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductView.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const ProductView = () => {
  const { id } = useParams();
  const { userData } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/get/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const userId = userData._id;

  const addToCart = async (product) => {
    if (!userId) {
      Swal.fire({
        title: "Error",
        text: "User ID is missing. Please log in.",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }

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

  const buyNow = (product) => {
    if (!userId) {
      Swal.fire({
        title: "Error",
        text: "User ID is missing. Please log in.",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  if (loading) return <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Loading...</div>;
  if (error) return <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Error: {error}</div>;

  return (
    <div className="product-container">
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <img
            src={`http://localhost:3000/${product.images[0]}`}
            alt={product.name}
          />
        ) : (
          <div className="placeholder-image"></div>
        )}
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-tags">
          <span className="tag">{product.category}</span>
          <span className="tag">{product.subCategory}</span>
        </div>
        <p className="product-stock">{product.stock} Available only.</p>
        <p className="seller-info">
          <strong>Seller, </strong>
          <br />
          {product.seller?.name || "Unknown"}
          <br />
          {product.seller?.email || "Not provided"}
        </p>
        <div className="product-buttons">
          <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="buy-now" onClick={() => buyNow(product)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
