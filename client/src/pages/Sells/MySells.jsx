import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MySells.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import MyProductCard from "../../components/ProductCard/MyProductCard";
import UpdateProductModal from "../../components/UpdateProductModal/UpdateProductModal";
import Swal from 'sweetalert2';

const MySells = () => {
  const { userData } = useAuth(); // Extract userData from AuthContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    // Fetch products by the logged-in user
    const fetchUserProducts = async () => {
      if (!userData || !userData._id) return;
  
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${userData._id}`
        );
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch user products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Get the user's liked items if userData is available
    const fetchUserLikedItems = async () => {
      if (!userData || !userData._id) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userData._id}`
        );
        setLikedItems(response.data.likedItems || []);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUserProducts();
    fetchUserLikedItems();
  }, [userData]);

  const updateProduct = (product) => {
    setUpdatedProduct(product);
    handleShowModal();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({
        ...prev,
        [name]: value,
    }));
  };

  const saveUpdatedProduct = async () => {
    try {
      await axios.put(`http://localhost:3000/api/product/updateProduct/${updatedProduct._id}`, updatedProduct);
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
        console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#59646f",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/product/deleteProduct/${productId}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#59646f"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    });
  };

  return (
    <div>
      {/* Shop Details Section */}
      <div className="shop-details">
        <div className="text-content">
          <h2>My Shop</h2>
          <br />
          <p>
            <strong>Welcome to Your Shop!</strong> Here, you can manage your
            products and showcase them to potential buyers. To get started,
            click on the "Add Product" button to list a new product. You can add
            as many products as you'd like and update or delete them at any
            time.
            <br />
            <br />
            Make sure to provide clear product details and set competitive
            prices to attract customers.
          </p>
        </div>
        <Link to="/addProduct">
          <button>Add Product</button>
        </Link>
      </div>

      {/* Loading State */}
      {loading && <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>Loading...</p>}

      {/* No Products Case */}
      {!loading && products.length === 0 && <p style={{margin: "120px", textAlign: "center", fontSize: "1.1rem", fontWeight:"300", color:"gray" }}>No products available yet!</p>}

      <UpdateProductModal
        show={showModal}
        handleClose={handleCloseModal}
        updatedProduct={updatedProduct}
        handleChange={handleChange}
        saveUpdatedProduct={saveUpdatedProduct}
      />

      {/* Product List */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product) => (
          <MyProductCard
            key={product._id}
            product={product}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            userId={userData?._id}
            likedItems={likedItems}
          />
        ))}
      </div>
    </div>
  );
};

export default MySells;
