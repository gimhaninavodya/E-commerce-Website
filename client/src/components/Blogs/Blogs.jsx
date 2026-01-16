import React, { useState } from "react";
import SideMenu from "../Profile/SideMenu";
import { blogImages } from "./blogData";
import "./Blogs.css";

const Blogs = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div className="profile-container d-flex">
            <SideMenu />
            <div className="profile-content" style={{ flex: 8, padding: "30px", backgroundColor: "#f9f9f9" }}>
                <div className="activities-container">
                    <h2 style={{ fontWeight: "700", marginBottom: "10px" }}>Tips & Blogs For You!</h2>
                    <p style={{ color: "gray", marginBottom: "30px" }}>We value your time, grow efficient and fast!</p>

                    <div className="blogs-grid">
                        {blogImages.map((blog) => (
                            <div
                                key={blog.id}
                                className="blog-image-card"
                                onClick={() => setSelectedImg(blog.img)}
                            >
                                <img
                                    src={blog.img}
                                    alt={blog.title}
                                    className="blog-thumbnail"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Big View */}
            {selectedImg && (
                <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
                    <button className="close-btn" onClick={() => setSelectedImg(null)}>&times;</button>
                    <img
                        src={selectedImg}
                        alt="Enlarged view"
                        className="modal-image"
                    />
                </div>
            )}
        </div>
    );
};

export default Blogs;