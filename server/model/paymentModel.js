import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["credit-card", "debit-card", "paypal"],
    required: true,
  },
  cardNumber: {
    type: String,
    required: function () {
      return this.paymentMethod === "credit-card" || this.paymentMethod === "debit-card";
    },
    match: [/^\d{16}$/, "Please enter a valid 16-digit card number"]
  },
  expiryDate: {
    type: String,
    required: function () {
      return this.paymentMethod === "credit-card" || this.paymentMethod === "debit-card";
    },
    match: [/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Please use MM/YY format"]
  },
  cvv: {
    type: String,
    required: function () {
      return this.paymentMethod === "credit-card" || this.paymentMethod === "debit-card";
    },
    match: [/^\d{3,4}$/, "Invalid CVV"]
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
