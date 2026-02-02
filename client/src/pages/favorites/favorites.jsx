import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAuth } from "../../contexts/AuthContext";

const Favorites = () => {
  const { userData } = useAuth();
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const fetchLikedItems = async () => {
      if (!userData || !userData._id) return; // Ensure user is logged in
      setLoading(true);
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/${userData._id}/liked-items`
        );
        setFilteredItems(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch liked items.");
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


    fetchLikedItems();
    fetchUserLikedItems();
  }, [userData]);

  return (
    <div>
      <h3 className="titleH3">Favorite Items</h3>
      {loading ? (
        <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Loading...</div>
      ) : error ? (
        <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Error: {error}</div>
      ) : filteredItems.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
          {filteredItems.map((item) => (
              <ProductCard
                  key={item._id}
                  product={item}
                  handleAddToCart={(item) => console.log("Adding to cart:", item)}
                  userId={userData?._id}
                  likedItems={likedItems}
                  // Refresh the list when an item is unliked
                  onToggle={(updatedLikes) => {
                    setLikedItems(updatedLikes);
                    // Remove the item from the display list if it's no longer liked
                    setFilteredItems(prev => prev.filter(i => i._id !== item._id));
                  }}
              />
          ))}
        </div>
      ) : (
        <div style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>No items found.</div>
      )}
    </div>
  );
};

export default Favorites;
