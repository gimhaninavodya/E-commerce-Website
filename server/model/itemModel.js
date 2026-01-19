import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  subCategory: {
    type: String,
    required: true
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, "Price cannot be negative"]
  },
  stock: { 
    type: Number, 
    required: true,
    min: [0, "Stock cannot be negative"]
  },
  sold: { 
    type: Number, 
    default: 0,
    min: 0
  },
  likes: { 
    type: Number, 
    default: 0,
    min: 0
  },
  likesCount: {
    type: Number,
    default: 0,
    min: 0
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  images: {
    type: [String],
    required: [true, "At least one image is required"],
  },
}, {timestamps: true});

const Item = mongoose.model("Item", itemSchema);
export default Item;