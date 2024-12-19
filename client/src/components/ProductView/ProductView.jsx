import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductView.css"; // Import the CSS file

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <p className="product-stock">{product.stock} Available only</p>
        <div className="seller-info">
          <p>
            <strong>Seller name - </strong>
            {product.seller?.name || "Unknown"}
          </p><br />
        </div>
        <div className="product-tags">
          <span className="tag">{product.category}</span>
          <span className="tag">{product.subCategory}</span>
        </div><br /><br />
        <p className="product-price">Price: ${product.price}.00</p>
        <div className="product-buttons">
          <button className="buy-now">Buy now</button>
          <button className="add-to-cart">Add to cart</button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductView;
