import React, { useEffect, useState } from "react";
import "./MainFeedback.css";
import { Link } from "react-router-dom";
import axios from "axios";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const MainFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/feedback/getFeedback");
      const filteredFeedbacks = response.data.filter((feedback) => feedback.rating === 5).slice(0, 2);
      setFeedbacks(filteredFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  return (
    <div>
      <h3 className="titleH3">Meet Our Customers</h3>
      <div className="feedback-title">
        <p>Meet our valuable customers, Wanna give a review?</p>
        <Link to="/reviews">
          <button>Learn More</button>
        </Link>
      </div>
      <FeedbackCard feedbacks={feedbacks} />
    </div>
  );
};

export default MainFeedback;
