import React from "react";
import { Modal, Form } from "react-bootstrap";
import "../UpdateProductModal/UpdateProductModal.css";

export default function UpdateFeedbackModal(props) {
  const {show,handleClose,updatedFeedback,handleChange,saveUpdatedFeedback,renderStars } = props;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update your Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingLeft: "30px", paddingRight: "30px" }}>
        <Form>
          <Form.Group>
            <label>Feedback Name</label>
            <Form.Control
              name="name"
              type="text"
              value={updatedFeedback.name || ""}
              style={{ marginBottom: "2rem", color: "GrayText" }}
              onChange={(e) => handleChange(e)}
            />
            <label>Feedback email</label>
            <Form.Control
              name="email"
              type="text"
              value={updatedFeedback.email || ""}
              style={{ marginBottom: "2rem", color: "GrayText" }}
              onChange={(e) => handleChange(e)}
              disabled
            />
            <Form.Select
              name="roll"
              value={updatedFeedback.roll || ""}
              onChange={(e) => handleChange(e)}
              style={{ marginBottom: "2rem", color: "GrayText" }}
            >
              <option value="">Select Your Roll</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="both">Both</option>
            </Form.Select>

            <div className="servicerate">
              <label>Rate Our platform : </label>
              {renderStars(updatedFeedback.rating)}
            </div>

            <label>Feedback message</label>
            <Form.Control
              name="message"
              placeholder="Feedback"
              as="textarea"
              value={updatedFeedback.message || ""}
              style={{ marginBottom: "2rem", color: "GrayText" }}
              onChange={(e) => handleChange(e)}
            />

          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ paddingLeft: "30px", paddingRight: "30px" }}>
        <div className="product-update-btns">
          <button className="product-submit-btn" onClick={handleClose}>
            Close
          </button>
          <button className="product-submit-btn" onClick={saveUpdatedFeedback}>
            Save Changes
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
