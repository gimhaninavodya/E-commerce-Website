import React from "react";
import "./MainFeedback.css";
import { Link } from "react-router-dom";

const MainFeedback = () => {
  return (
    <div>
      <h3 className="titleH3">Meet Our Customers</h3>
      <div className="feedback-title">
        <p>Meet our valuble customers, Wanna give a review ? </p>
        <Link to="/reviews">
          <button>Learn More</button>
        </Link>
        </div>
      </div>
  );
};

export default MainFeedback;
