import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import "./UpdateProductModal.css";

export default function UpdateProductModal(props) {
    const { show, handleClose, updatedProduct, handleChange, saveUpdatedProduct} = props;

    // Define subcategories for each category
    const subcategoryOptions = {
        fashion: ['Cloths', 'Bags', 'Shoes', 'Accessories'],
        home: ['Furniture', 'Decor', 'Kitchen Appliances'],
        beauty: ['Skincare', 'Makeup', 'Haircare'],
        electronics: ['Mobiles', 'Laptops', 'Cameras'],
        sports: ['Fitness', 'Outdoor', 'Team Sports'],
    };

    return (
        <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update your Product</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{paddingLeft: "30px", paddingRight: "30px"}}>
                    <Form>
                        <Form.Group>
                            <label>product Name</label>
                            <Form.Control 
                                name="name"
                                type="text"
                                value={updatedProduct.name || ""}
                                style={{ marginBottom: "2rem", color:"GrayText" }}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>Product Description</label>
                            <Form.Control 
                                name="description"
                                placeholder="Feedback" 
                                as="textarea"
                                value={updatedProduct.description || ""}
                                style={{ marginBottom: "2rem", color:"GrayText" }}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>Select Product Category</label>
                            <Form.Select
                                name="category"
                                value={updatedProduct.category || ""}
                                onChange={(e) => handleChange(e)}
                                style={{ marginBottom: "2rem", color:"GrayText" }}
                            >
                                <option value="">Select Category</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home & Kitchen</option>
                                <option value="beauty">Beauty & Personal Care</option>
                                <option value="electronics">Electronics</option>
                                <option value="sports">Sports & Outdoors</option>
                            </Form.Select>
                            <label>Select Product Sub Category</label>
                            <Form.Select
                                name="subCategory"
                                value={updatedProduct.subCategory || ""}
                                onChange={(e) => handleChange(e)}
                                style={{ marginBottom: "2rem", color:"GrayText" }}
                                disabled={!updatedProduct.category}
                            >
                                <option value="">Select Subcategory</option>
                                {subcategoryOptions[updatedProduct.category]?.map((sub) => (
                                    <option key={sub} value={sub}>
                                    {sub}
                                    </option>
                                ))}
                            </Form.Select>
                            <label>Product Price</label>
                            <Form.Control 
                                name="price"
                                type="number"
                                value={updatedProduct.price || ""}
                                min="0"
                                style={{ marginBottom: "2rem", color:"GrayText" }}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>Product Stock</label>
                            <Form.Control 
                                name="stock"
                                type="number"
                                value={updatedProduct.stock || ""}
                                min="0"
                                style={{  color:"GrayText" }}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{paddingLeft: "30px", paddingRight: "30px"}}>
                    <div className='product-update-btns'>
                        <button
                            className='product-submit-btn'
                            onClick={handleClose}
                        >Close
                        </button>
                        <button
                            className='product-submit-btn'
                            onClick={saveUpdatedProduct}
                        >Save Changes
                        </button>
                    </div>
                </Modal.Footer>
        </Modal>
    );
}
