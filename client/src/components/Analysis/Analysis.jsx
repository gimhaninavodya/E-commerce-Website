import React from "react";
import SideMenu from "../Profile/SideMenu";

const Analysis = () => {
  return (
    <div className="profile-container d-flex">
      <SideMenu />
      {/* Right side activity content */}
      <div className="profile-content" style={{ flex: 8 }}>
        <div className="activities-container">
          <h2>Sales Report</h2>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
