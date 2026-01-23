import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import "./HeartButton.css";

const HeartButton = ({ userId, productId, isLiked, onToggle }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleToggleLike = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/toggle-like", {
        userId,
        productId,
      });
      setLiked(!liked);
      if (onToggle) onToggle(response.data.likedItems);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
      <button className={`heartbutton ${!liked ? "unliked" : ""}`} onClick={handleToggleLike}>
        <FaHeart color={liked ? "red" : "white"} size={25}/>
      </button>
  );
};

export default HeartButton;
