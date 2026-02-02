import React from "react";
import SideMenu from "../Profile/SideMenu";
import "./Settings.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const deleteAccount = async () => {
    if (!userData || !userData._id) {
      console.error("User ID not found.");
      return;
    }

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
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deleteUser/${userData._id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
            confirmButtonColor: "#59646f",
          }).then(() => {
            handleLogout();
          });
        } catch (error) {
          console.error("Error deleting account:", error);
          Swal.fire("Error", "Failed to delete account. Try again later.", "error");
        }
      }
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="profile-container d-flex">
      <SideMenu />

      {/* Right side activity content */}
      <div className="profile-content" style={{ flex: 8 }}>
        <div className="activities-container">
          <h2>Settings</h2>

          {/* Delete Account Section */}
          <div className="delete-account-section">
            <h4>Delete Account</h4>
            <p>Deleting your account is permanent. All your data will be removed.</p>
            <button className="delete-account-btn" onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
