import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { Link } from "react-router-dom";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import axios from "axios";
import feedback from "../../assets/feedback.jpg";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback/getFeedback`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <div className="feedback-container-main">
        {/* Left Side: Text Content */}
        <div className="feedback-text">
          <h1>What Our Customers Say,</h1>
          <p>Welcome to Lydia! Here, you can get idea about 
            our business and how it benefit to our potential buyers. 
            Give a feedback about us. We will happy to here you and 
            improve of quality of service.</p>
          <br />
          <Link to="/addReview">
            <button className="feedback-button">Give Feedback</button>
          </Link>
        </div>
      
        {/* Right Side: Image */}
        <div className="feedback-image">
          <img src={feedback} alt="feedback" />
        </div>
      </div>

      {loading ? (
        <p
          style={{
            margin: "120px",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "300",
            color: "gray",
          }}
        >
          Loading...
        </p>
      ) : feedbacks.length === 0 ? (
        <p
          style={{
            margin: "120px",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "300",
            color: "gray",
          }}
        >
          No reviews available yet!
        </p>
      ) : (
        <div>
        <FeedbackCard feedbacks={feedbacks} />
        </div>
      )}
    </div>
  );
};

export default Feedback;
