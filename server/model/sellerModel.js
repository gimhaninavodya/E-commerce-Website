import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true
  },
  shopPrice: {
    type: Number,
    default: 100
  },
  paymentMethod: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: [true, "Card number is required"],
    // This removes spaces before validating or saving
    set: (v) => v.replace(/\s+/g, ''),
    match: [/^\d{16}$/, "Please enter a valid 16-digit card number"]
  },
  expiryDate: {
    type: String,
    required: [true, "Expiry date is required"],
    trim: true,
    match: [/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Please use MM/YY format"]
  },
  cvv: {
    type: String,
    required: [true, "CVV is required"],
    trim: true,
    match: [/^\d{3,4}$/, "Invalid CVV"]
  },
}, { timestamps: true });

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;