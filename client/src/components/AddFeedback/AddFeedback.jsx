import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./AddFeedback.css";

const AddFeedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    roll: "",
    message: "",
    rating: 0,
  });

  const navigate = useNavigate();

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle changes in rating
  const handleRatingChange = (index, aspect) => {
    setForm((prev) => ({
      ...prev,
      [aspect]: index + 1,
    }));
  };

  // Function to render star icons for rating
  const renderStars = (rating, handleRatingChange) => {
    return Array(5)
      .fill()
      .map((_, index) =>
        rating >= index + 1 ? (
          <AiFillStar
            key={index}
            onClick={() => handleRatingChange(index)}
            className="FillStar"
            size="25px"
          />
        ) : (
          <AiOutlineStar
            key={index}
            onClick={() => handleRatingChange(index)}
            className="OutlineStar"
            size="25px"
          />
        )
      );
  };

  // Function to handle form submission
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/feedback/addFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        return;
      }
    } catch (error) {
      setError(error.message || "An error occurred.");
    }
    Swal.fire({
      icon: "success",
      title: "Feedback submitted successfully !",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/reviews");
    });
  };

  return (
    <div>
      <header className="feedback_form_title">
        <h2>Give your Feedback !</h2>
      </header>
      <div className="feedback-form-all">
        <Form className="feedback-form">
          <Form.Group>
            <Form.Control
              name="name"
              value={form.name}
              placeholder="Name"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />

            <Form.Control
              name="email"
              value={form.email}
              type="email"
              placeholder="Email"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />

            {/* Dropdown for Categories */}
            <Form.Select
              className="product-field"
              name="roll"
              value={form.roll}
              onChange={handleChange}
              required
            >
              <option value="">Select Your Roll</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="both">Both</option>
            </Form.Select>

            <div className="servicerate">
              <label>Rate Our platform : </label>
              {renderStars(form.rating, (index) =>
                handleRatingChange(index, "rating")
              )}
            </div>

            <Form.Control
              name="message"
              value={form.message}
              as="textarea"
              rows={4}
              placeholder="Message"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />

            <div className="feedback-btns">
              <button
                className="feedback-submit-btn"
                onClick={() => navigate(-1)}
              >
                BACK
              </button>
              <button className="feedback-submit-btn" onClick={handleClick}>
                ADD FEEDBACK
              </button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default AddFeedback;
