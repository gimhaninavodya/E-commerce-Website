import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import "./CategoryStyle.css";

const Fashion = () => {
  const [items, setItems] = useState([]); // All items fetched from the backend
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items for display
  const [subcategories] = useState(["All", "Cloths", "Bags", "Shoes", "Accessories"]); // Static subcategories
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth(); // Auth context for user data
  const [likedItems, setLikedItems] = useState([]); // User's liked items

  useEffect(() => {
    // Fetch all fashion items
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/category/fashion`);
        setItems(response.data);
        setFilteredItems(response.data); // Initially display all items
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    // Get the user's liked items if userData is available
    const fetchUserLikedItems = async () => {
      if (!userData || !userData._id) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userData._id}`);
        setLikedItems(response.data.likedItems || []);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchItems();
    fetchUserLikedItems();
  }, [userData]);

  const handleTabClick = (subCategory) => {
    setSelectedSubcategory(subCategory);
    setError(null);

    if (subCategory === "All") {
      setFilteredItems(items); // Show all items
    } else {
      // Filter items by subcategory
      const filtered = items.filter(
        (item) => item.subCategory.toLowerCase() === subCategory.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div>
      <div className="category-tabs">
        {subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => handleTabClick(sub)}
            className="category-tab-button"
          >
            {sub}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Loading...</div>
      ) : error ? (
        <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Error: {error}</div>
      ) : filteredItems.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {filteredItems.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              handleAddToCart={(item) => console.log("Adding to cart:", item)}
              userId={userData?._id}
              likedItems={likedItems}
            />
          ))}
        </div>
      ) : (
        <div>No items found.</div>
      )}
    </div>
  );
};

export default Fashion;
