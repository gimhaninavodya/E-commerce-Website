import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductView.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import ProductCard from "../ProductCard/ProductCard";

const ProductView = () => {
  const { id } = useParams();
  const { userData } = useAuth();
  const [product, setProduct] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the main product
        const productResponse = await axios.get(
          `http://localhost:3000/api/product/get/${id}`
        );
        setProduct(productResponse.data);

        // Fetch all products
        const allProductsResponse = await axios.get(
          "http://localhost:3000/api/product/getAll"
        );
        setAllProducts(allProductsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Get the user's liked items if userData is available
        const fetchUserLikedItems = async () => {
          if (!userData || !userData._id) return;
    
          try {
            const response = await axios.get(
              `http://localhost:3000/api/user/${userData._id}`
            );
            setLikedItems(response.data.likedItems || []);
          } catch (error) {
            console.error("Failed to fetch user data:", error.message);
          }
        };
    

    fetchData();
    fetchUserLikedItems();
  }, [id]);

  const userId = userData?._id;
  const isOutOfStock = product?.stock <= 0;

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

  if (loading) return <div style={{ margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight: "300", color: "gray" }}>Loading...</div>;
  if (error) return <div style={{ margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight: "300", color: "gray" }}>Error: {error}</div>;

  // Filter related products based on the same category and subcategory
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.subCategory === product.subCategory && p._id !== product._id
  );

  return (
    <div>
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
          {isOutOfStock ? (
              <p className="product-stock out-of-stock-text">Sold Out</p>
          ) : (
              <p className="product-stock">{product.stock} Available only.</p>
          )}
          <p className="product-price"> $ {product.price}.00 </p>
          <p className="seller-info-1">
            <strong>Seller, </strong>
            <br />
            {product.seller?.name || "Unknown"}
            <br />
            {product.seller?.email || "Not provided"}
          </p>
          <div className="product-buttons">
            <button
                className={`add-to-cart ${isOutOfStock ? "disabled-btn" : ""}`}
                onClick={() => !isOutOfStock && addToCart(product)}
                disabled={isOutOfStock}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
                className={`buy-now ${isOutOfStock ? "disabled-btn" : ""}`}
                onClick={() => !isOutOfStock && buyNow(product)}
                disabled={isOutOfStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct._id}
                product={relatedProduct}
                handleAddToCart={() => addToCart(relatedProduct)}
                userId={userData?._id}
            likedItems={likedItems}
              />
            ))
          ) : (
            <p style={{ margin: "20px", textAlign: "center", color: "gray" }}>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
