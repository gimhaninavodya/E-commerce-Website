import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  images: {
    type: [String], // Array to store image paths
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;