import React, { useEffect, useState } from "react";
import SideMenu from "../Profile/SideMenu";
import axios from "axios";
import "./Activities.css";
import shopping from "../../assets/shopping.png";
import rate from "../../assets/rate.png";
import Membership from "../../assets/membership.png";
import edit from "../../assets/editing.png";
import remove from "../../assets/delete.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Activities = () => {
  const [payments, setPayments] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchPayments();
    fetchFeedback();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/payment/getPayment"
      );

      // Sort by date (newest first) and get the most recent 5 payments
      const sortedPayments = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const recentPayments = sortedPayments.slice(0, 5);

      setPayments(recentPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/feedback/getFeedback"
      );
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

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
    <div className="profile-container d-flex">
      <SideMenu />

      {/* Right side activity content */}
      <div className="profile-content" style={{ flex: 8 }}>
        <div className="activities-container">
          <h2>Your Activities</h2>
          <div className="activity-buttons">
            <button className="activity-btn">
              <img src={shopping} alt="Recent Purchases" />
              <div className="button-text">Recent Purchases</div>
            </button>
            <button className="activity-btn">
              <img src={rate} alt="Feedback History" />
              <div className="button-text">Feedback History</div>
            </button>
            <button className="activity-btn">
              <img src={Membership} alt="Membership Payments" />
              <div className="button-text">Membership Payments</div>
            </button>
          </div>

          <div className="recent-purchases">
            <h3>Recent Purchases</h3>
            <table className="purchases-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>No. of Items</th>
                  <th>Payment Method</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                    <td>{payment.name}</td>
                    <td>{payment.cart.length}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>${payment.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="feedback-history-container">
            <h3>Feedback History</h3>
            <div className="feedback-history-list">
              {feedbackList.map((feedback) => (
                <div key={feedback._id} className="feedback-history-card">
                  <div className="feedback-history-content">
                    <div className="feedback-history-rating">
                      <span>{renderStars(feedback.rating)}</span>
                    </div>
                    <p className="feedback-history-description">
                      "{feedback.message}"
                    </p>
                  </div>
                  <div className="feedback-history-actions">
                    <div
                      className={`feedback-history-status ${
                        feedback.status === "Approved"
                          ? "status-approved"
                          : "status-pending"
                      }`}
                    >
                      {feedback.status}
                    </div>
                    <div className="feedback-action-icons">
                      <img src={edit} alt="Edit feedback" />
                      <img src={remove} alt="Remove feedback" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
