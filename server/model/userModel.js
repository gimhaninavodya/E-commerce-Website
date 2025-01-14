import mongoose, { Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  isSeller: { 
    type: Boolean,
    default: false 
  },
  accountStatus:{
    type: String,
    default: "active"
  },
  likedItems: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  }],
  cart: [cartItemSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
