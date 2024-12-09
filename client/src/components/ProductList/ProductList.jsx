import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const ProductList = () => {
  const { userData } = useAuth(); // Extract userData from AuthContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/getAll"
        );
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
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

    fetchProducts();
    fetchUserLikedItems();
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div>
      <h3 style={{ textAlign: "left", marginTop: "50px", fontWeight:"500", paddingLeft:"120px", color:"GrayText"}}>Popular Items</h3>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleAddToCart={(item) => console.log("Adding to cart:", item)}
            userId={userData?._id}
            likedItems={likedItems}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
