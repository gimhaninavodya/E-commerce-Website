import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/Sells/MySells.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import UpdateProductModal from "../../components/UpdateProductModal/UpdateProductModal";
import Swal from "sweetalert2";
import seller from '../../assets/seller.jpg';
import InventoryProduct from "../ProductCard/InventoryProduct";
import "./Inventory.css";

const Inventory = () => {
    const { userData } = useAuth(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [sellerDetails, setSellerDetails] = useState(null);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [updatedProduct, setUpdatedProduct] = useState({});
    
    useEffect(() => {
        const fetchUserProducts = async () => {
            if (!userData || !userData._id) return;
            if (!userData?.email) return;

            try {
                setLoading(true);

                const sellerResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/seller/getByEmail/${userData.email}`
                );

                console.log("Seller Data received:", sellerResponse.data);

                setSellerDetails(sellerResponse.data);

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/product/${userData._id}`
                );
                setProducts(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Failed to fetch user products:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProducts();
    }, [userData, userData?.email]);

    const updateProduct = (product) => {
        setUpdatedProduct(product);
        handleShowModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveUpdatedProduct = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/product/updateProduct/${updatedProduct._id}`,
                updatedProduct
            );
            handleCloseModal();
            Swal.fire({
                title: "Your updated Product is saved!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <div className="shop-ad-container-sells">
                <div className="shop-ad-text">
                    <h1>{sellerDetails?.businessName || "My Shop"}</h1>
                    <p>Welcome to Your Shop! Here, you can manage your products and showcase them to potential buyers. Make sure to provide clear product details and set competitive prices to attract customers.</p>
                    <br />
                    <div className="shop-main-btns">
                        <Link to="/addProduct">
                            <button className="shop-ad-button">Add Product</button>
                        </Link>
                        <Link to="/inventory">
                            <button className="shop-ad-button">Inventory</button>
                        </Link>
                    </div>
                </div>
                <div className="shop-ad-image">
                    <img src={seller} alt="Become a Seller" />
                </div>
            </div>

            {loading && (
                <p className="loading-text">Loading...</p>
            )}

            {!loading && products.length === 0 && (
                <p className="loading-text">No products available yet!</p>
            )}

            <UpdateProductModal
                show={showModal}
                handleClose={handleCloseModal}
                updatedProduct={updatedProduct}
                handleChange={handleChange}
                saveUpdatedProduct={saveUpdatedProduct}
            />

            {/* Product Grid Layout */}
            <div className="inventory-grid">
                {products.map((product) => (
                    <InventoryProduct
                        key={product._id}
                        product={product}
                        updateProduct={updateProduct}
                        userId={userData?._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Inventory;
