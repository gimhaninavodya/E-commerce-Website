import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <div className="side-menu" style={{ flex: 2 }}>
            <ul className="menu-list">
            <li className="menu-item">
                <Link to="/profile" className="menu-link">
                Profile
                </Link>
            </li>
            <li className="menu-item">
                <Link to="/activities" className="menu-link">
                Activities
                </Link>
            </li>
            <li className="menu-item">
                <Link to="/analysis" className="menu-link">
                Analysis
                </Link>
            </li>            
            <li className="menu-item">
                <Link to="/tips-blogs" className="menu-link">
                Tips & Blogs
                </Link>
            </li>
            <li className="menu-item">
                <Link to="/settings" className="menu-link">
                Settings
                </Link>
            </li>
            </ul>
        </div>
    );
};

export default SideMenu;