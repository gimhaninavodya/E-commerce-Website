import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const InventoryProduct = ({ product, updateProduct, userId }) => {
  // Calculate remaining stock
  const remainingStock = product.stock - product.sold;

  // Determine stock status
  const isSoldOut = remainingStock <= 0;
  const isLowStock = remainingStock > 0 && remainingStock <= 15;

  return (
    <div className="card" style={{ position: "relative" }}>
      {isSoldOut && <div className="sold-out-badge">Sold Out</div>}

      <Link to={`/product/${product._id}`} className="product-link">
        <img
            src={`http://localhost:3000/${product.images[0]}`}
            alt={product.name}
            className={`image ${isSoldOut ? "grayscale" : ""}`}
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
        {/* Dynamic Stock Status Bar */}
        <div className="row">
          <span
              style={{ width: "auto" }}
              className={`stock-status ${
                  isSoldOut ? "low-stock" : isLowStock ? "low-stock" : "in-stock"
              }`}
          >
            {isSoldOut ? "Sold Out!" : isLowStock ? "Low Stock!" : "In Stock"}
          </span>
        </div>

        <div className="row">
          <div className="left">
            <h6>Remaining Stock</h6>
            <h2 style={{ color: isSoldOut ? "red" : "inherit" }}>
              {product.stock > 0 ? product.stock : 0}
            </h2>
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
