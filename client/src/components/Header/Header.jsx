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

    const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);};
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <section className="h-wrapper">
            <div className="h-container">
                <div className="h-logo">
                    <h1><Link to="/" onClick={closeMenu}>Lydia</Link></h1>
                </div>

                <button className="menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                <nav className={`h-nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul onClick={closeMenu}>
                        <li><Link to="/fashion">Fashion</Link></li>
                        <li><Link to="/home">Home & Kitchen</Link></li>
                        <li><Link to="/beauty">Beauty & Personal Care</Link></li>
                        <li><Link to="/electronics">Electronics</Link></li>
                        <li><Link to="/sports">Sports & Outdoors</Link></li>

                        {/* Icons for Web View */}
                        <div className="h-icons desktop-only">
                            <Link to="/favorites"><img src={hearticon} alt="Favorites" /></Link>
                            <Link to="/cart"><img src={carticon} alt="Cart" /></Link>
                            {isAuthenticated && userData.role !== "user" && (
                                <Link to="/mysells"><img src={shopicon} alt="Shop" /></Link>
                            )}
                            {isAuthenticated ? (
                                <Link to="/profile"><img src={profileicon} alt="Profile" /></Link>
                            ) : (
                                <Link to="/register"><button className="h-signin-btn">Sign In</button></Link>
                            )}
                        </div>

                        {/* Labeled Icons for Mobile Drawer */}
                        <li className="mobile-only-item">
                            <Link to="/favorites"><img src={hearticon} alt="" /> Favorites</Link>
                        </li>
                        <li className="mobile-only-item">
                            <Link to="/cart"><img src={carticon} alt="" /> Cart</Link>
                        </li>
                        {isAuthenticated && userData.role !== "user" && (
                            <li className="mobile-only-item">
                                <Link to="/mysells"><img src={shopicon} alt="" /> Shop</Link>
                            </li>
                        )}
                        <li className="mobile-only-item">
                            {isAuthenticated ? (
                                <Link to="/profile"><img src={profileicon} alt="" /> Profile</Link>
                            ) : (
                                <Link to="/register">Sign In</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Header;
