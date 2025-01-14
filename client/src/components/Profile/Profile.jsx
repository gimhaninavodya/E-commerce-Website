import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userData._id}`
        );
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserDetails();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/update/${userData._id}`,
        formData
      );
      setUser(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="profile-container d-flex">
      {/* Left side menu */}
      <div className="side-menu" style={{ flex: 2 }}>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/profile" className="menu-link">
              Profile
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/dashboard" className="menu-link">
              Dashboard
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/activities" className="menu-link">
              Activities
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/settings" className="menu-link">
              Settings
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/tips-blogs" className="menu-link">
              Tips & Blogs
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/analysis" className="menu-link">
              Analysis
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" className="menu-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Right side profile content */}
      <div className="profile-content" style={{ flex: 8 }}>
        <div className="profile-header">
          {/* Avatar Section */}
          <div className="profile-top-left">
            <img src={profile} alt="Profile Avatar" className="avatar" />
            <div>
              <h2>My Profile</h2>
              <p>We are happy to hear about you</p>
              {/* User Roles */}
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <span className="role-badge customer">Customer</span>
                {user.isSeller && (
                  <span className="role-badge seller">Seller</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="profile-top-right">
            <div className="account-status">
              <span>Account Status</span>
              <h3>{user.accountStatus}</h3>
            </div>
            <Button size="large" className="profile-btn" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <br />

        <Form className="profile-form">
          <Form.Group className="form-item">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="form-item">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              disabled
            />
          </Form.Group>

          <Form.Group className="form-item">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="form-item-sub">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-item-sub">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="form-item-sub">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="postcode"
                  value={formData.postcode || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-item-sub">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="form-buttons mt-4">
            {isEditing ? (
              <div className="edit-save-btn">
                <Button className="form-btn" onClick={handleSubmit}>
                  Save
                </Button>
                <Button
                  className="form-btn ms-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                className="form-btn edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
