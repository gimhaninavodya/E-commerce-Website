import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const InventoryProduct = ({ product, updateProduct, userId }) => {
  return (
    <div className="card" style={{ position: "relative" }}>
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
        <div className="row">
          <span
            style={{ width: "auto" }}
            className={`stock-status ${
              product.stock - product.sold <= 15 ? "low-stock" : "in-stock"
            }`}
          >
            {product.stock - product.sold <= 15 ? "Low Stock!" : "In Stock"}
          </span>
        </div>

        <div className="row">
          <div className="left">
            <h6>Total Stock</h6>
            <h2>{product.stock - product.sold}</h2>
          </div>
          <div className="right">
            <button
              onClick={() => updateProduct(product)}
              className="addButton"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryProduct;
