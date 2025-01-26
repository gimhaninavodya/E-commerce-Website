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
import UpdateFeedbackModal from "../UpdateFeedbackModal/UpdateFeedbackModal";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const Activities = () => {
  const [payments, setPayments] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [seller, setSeller] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [updatedFeedback, setUpdatedFeedback] = useState({});
  const { userData } = useAuth();

  useEffect(() => {
    fetchPayments();
    fetchFeedback();
    fetchSeller();
  }, [userData]);

  const fetchPayments = async () => {
    if (!userData || !userData.email) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/payment/getPaymentByEmail/${userData.email}`
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
    if (!userData || !userData.email) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/feedback/getFeedbackByEmail/${userData.email}`
      );

      const data = response.data;
      if (Array.isArray(data)) {
        setFeedbackList(data);
      } else {
        setFeedbackList([]);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackList([]);
    }
  };

  const fetchSeller = async () => {
    if (!userData || !userData.email) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/seller/getByEmail/${userData.email}`
      );
      setSeller(response.data);
    } catch (error) {
      console.error("Error fetching seller:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleRatingChange(i)}>
          {i <= rating ? (
            <AiFillStar className="FillStar" />
          ) : (
            <AiOutlineStar className="OutlineStar" />
          )}
        </span>
      );
    }
    return stars;
  };

  const handleRatingChange = (rating) => {
    setUpdatedFeedback((prev) => ({
      ...prev,
      rating: rating,
    }));
  };

  const updateFeedback = (feedback) => {
    setUpdatedFeedback(feedback);
    handleShowModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveUpdatedFeedback = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/feedback/updateFeedback/${updatedFeedback._id}`,
        updatedFeedback
      );
      handleCloseModal();
      Swal.fire({
        title: "Your updated Feedback is saved!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const deleteFeedback = async (feedbackId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#59646f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:3000/api/feedback/deleteFeedback/${feedbackId}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
            confirmButtonColor: "#59646f",
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error deleting feedback:", error);
        }
      }
    });
  };

  return (
    <div className="profile-container d-flex">
      <SideMenu />

      <UpdateFeedbackModal
        show={showModal}
        handleClose={handleCloseModal}
        updatedFeedback={updatedFeedback}
        handleChange={handleChange}
        saveUpdatedFeedback={saveUpdatedFeedback}
        renderStars={renderStars}
      />

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
                  <th>No. of Items</th>
                  <th>Payment Method</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
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
              {feedbackList.length > 0 ? (
                feedbackList.map((feedback) => (
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
                        <img
                          src={edit}
                          alt="Edit feedback"
                          onClick={() => updateFeedback(feedback)}
                        />
                        <img
                          src={remove}
                          alt="Remove feedback"
                          onClick={() => deleteFeedback(feedback._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No feedback found.</p>
              )}
            </div>
          </div>

          <div className="recent-purchases">
            <h3>Membership Payments</h3>
            <table className="purchases-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Business Type</th>
                  <th>Payment Method</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {seller ? ( // Check if seller data exists
                  <tr>
                    <td>{seller.name}</td>
                    <td>{seller.businessType}</td>
                    <td>{seller.paymentMethod}</td>
                    <td>${seller.ShopPrice}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5">No payment details available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
