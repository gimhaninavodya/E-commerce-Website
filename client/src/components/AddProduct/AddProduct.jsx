import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "./AddProduct.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

const AddProduct = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    seller: '',
    images: [],
  });

  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set seller ID when userData is available
  useEffect(() => {
    if (userData && userData._id) {
      setFormData((prev) => ({ ...prev, seller: userData._id }));
    }
  }, [userData]);

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setErrorMessage("You can upload a maximum of 3 images.");
      return;
    }
  
    const newPreviews = files.map((file) => URL.createObjectURL(file)); // Create preview URLs

    // Update state to append new files and previews
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };
  
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.name || !formData.description || formData.price <= 0 || formData.stock <= 0 || !formData.seller || formData.images.length === 0) {
      setErrorMessage('Please fill in all fields and upload at least one image.');
      return;
    }

    // Prepare form data
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData.images.forEach((image) => formDataToSend.append('images', image));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:3000/api/product/create', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false){
        setErrorMessage(data.message);
        return;
      }
      setSuccessMessage('Product added successfully!');
      window.location.reload();
      //can add navigater -> navigatee("/");
    } catch (error) {
      setErrorMessage(
        error.message || 'Something went wrong. Try again later.'
      );
    }
  };

  return (
    <div>
        <header className='product_form_title'>
            <h2>Add your new Product!</h2>
        </header>
        <div className='product-form-all'>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <Form className='product-form'>
            <Form.Group>  
              <Form.Control
                className='product-field'
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            
              <Form.Control
                className='product-field'
                name="description"
                as="textarea"
                placeholder="Product Description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            
              <Form.Control
                className='product-field'
                type='number'
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />

              <Form.Control
                className='product-field'
                type='number'
                name="stock"
                placeholder="Product Stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
              />

              <Form.Control
                name="seller"
                value={formData.seller}
                type="hidden"
              />

              {/* Image Upload */}
              <Form.Control
                className="product-field"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="image-previews">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>

              <div className='product-btns'>
                <Button
                  className='product-submit-btn'
                  variant='warning'
                  onClick={() => navigate(-1)}
                >BACK
                </Button>
                <Button
                  className='product-submit-btn'
                  variant='warning'
                  onClick={handleSubmit}
                >ADD PRODUCT
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
    </div>
  );
};

export default AddProduct;
