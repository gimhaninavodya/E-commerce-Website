import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const MyProductCard = ({ product, updateProduct, deleteProduct, userId }) => {
  return (
    <div className="card" style={{ position: "relative" }}>
      <Link to={`/product/${product._id}`} className="product-link">
      <img
        src={product.images[0]}
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
        <div className="row">
          <div className="left">
            <button onClick={() => updateProduct(product)} className="addButton">
                Update
            </button>
          </div>
          <div className="right">
            <button onClick={() => deleteProduct(product._id)} className="addButton">
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;
