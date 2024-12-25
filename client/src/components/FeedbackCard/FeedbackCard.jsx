import React from "react";
import "./FeedbackCard.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const FeedbackCard = ({ feedbacks }) => {
  const renderStars = (rating) => {
    return Array(5)
      .fill()
      .map((_, index) =>
        rating >= index + 1 ? (
          <AiFillStar key={index} className="FillStar" size="1.2rem" />
        ) : (
          <AiOutlineStar key={index} className="OutlineStar" size="1.2rem" />
        )
      );
  };

  return (
    <div className="feedback-container">
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-item">
            <p>"{feedback.message}"</p>
            <h6>
              - {feedback.name} -
              <span>{renderStars(feedback.rating)}</span>
            </h6>
          </div>
        ))
      ) : (
        <p>No feedbacks available</p>
      )}
    </div>
  );
};

export default FeedbackCard;
