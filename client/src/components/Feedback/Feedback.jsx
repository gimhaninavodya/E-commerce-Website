import React, { useState } from "react";
import "./Feedback.css";
import { Link } from "react-router-dom";

const Feedback = () => {

  const [loading, setLoading] = useState(true);

  return (
    <div>
      <div className="review-details">
        <div className="text-content">
          <h2>Review Our Service</h2>
          <br />
          <p>
            <strong>Tell us how we are doing!</strong> Here, you can manage your
            reviews and showcase them to our users. To get started,
            click on the "Add Review" button to give your thoughts. You can give
            as many reviews as you'd like and update or delete them at any
            time on your profile.
            <br />
            <br />
            Make sure to provide clear reviews it help both customers and us to improve the service.
          </p>
          <p>Thank you!</p>
        </div>
        <Link to="/addReview">
          <button>Give Review</button>
        </Link>
      </div>

      {loading && (
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
      )}

      {!loading && products.length === 0 && (
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
      )}
    </div>
  );
};

export default Feedback;
