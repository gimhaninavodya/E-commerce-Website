import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css"; 
import hearticon from "../../assets/heart-icon.png";
import carticon from "../../assets/cart-icon.png";
import profileicon from "../../assets/profile-icon.png";
import shopicon from "../../assets/shop-icon.png";

const Header = () => {
    const { isAuthenticated, userData } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="h-wrapper">
            <div className="h-container">
                {/* Logo */}
                <div className="h-logo">
                    <h1>COMPANY NAME</h1>
                </div>
    
                {/* Menu Button */}
                <button className="menu-btn" onClick={toggleMenu}>
                    &#9776; {/* Hamburger Icon */}
                </button>

                {/* Navigation */}
                <nav className={`h-nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/category1">Cloths</Link></li>
                        <li><Link to="/category2">Bags & Shoes</Link></li>
                        <li><Link to="/category3">Accessories</Link></li>
                        <li><Link to="/category4">Stationary</Link></li>
                        <li><Link to="/category5">Furniture</Link></li>
                        
                        <li><div className="h-icons">
                            <Link to="/favorites">
                                <img src={hearticon} alt="Favorites" />
                            </Link>
                        </div></li>
                            

                        <li><div className="h-icons">
                            <Link to="/cart">
                                <img src={carticon} alt="Cart" />
                            </Link>
                        </div></li>

                        <li>
                            <div className="h-icons">
                                {isAuthenticated && userData.role !== "user" && (
                                <Link to="/mysells">
                                    <img src={shopicon} alt="Shop" />
                                </Link>
                                )}
                            </div>
                        </li>

                        <li><div >
                            {isAuthenticated ? (
                                <Link to="/profile" className="h-icons">
                                    <img src={profileicon} alt="Profile" />
                                </Link>
                            ) : (
                                <Link to="/register" className="h-nav">
                                    <button className="h-signin-btn">Sign In</button>
                                </Link>
                            )}</div>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Header;
