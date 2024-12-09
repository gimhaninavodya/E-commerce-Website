import React from "react";
import { Link } from "react-router-dom";
import "./MySells.css";

const MySells = () => {
  return (
    <div>
      <div className="shop-details">
        <div className="text-content">
          <h2>My Shop</h2>
          <br />
          <p>
            <strong>Welcome to Your Shop!</strong> Here, you can manage your
            products and showcase them to potential buyers. To get started,
            click on the "Add Product" button to list a new product. You can add
            as many products as you'd like and update or delete them at any
            time.
            <br /><br />
            Make sure to provide clear product details and set competitive
            prices to attract customers.
          </p>
        </div>
        <Link to="/addProduct">
          <button>Add Product</button>
        </Link>
      </div>
    </div>
  );
};

export default MySells;
