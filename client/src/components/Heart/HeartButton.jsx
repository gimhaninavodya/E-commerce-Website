import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const HeartButton = ({ userId, productId, isLiked, onToggle }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleToggleLike = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/toggle-like", {
        userId,
        productId, // Ensure this matches the backend
      });
      setLiked(!liked);
      if (onToggle) onToggle(response.data.likedItems); // Update parent state if needed
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <button
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
      onClick={handleToggleLike}
    >
      <FaHeart color={liked ? "red" : "white"} size={25}/>
    </button>
  );
};

export default HeartButton;
