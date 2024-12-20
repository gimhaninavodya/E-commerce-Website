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
  },
  expiryDate: {
    type: String,
    required: function () {
      return this.paymentMethod === "credit-card" || this.paymentMethod === "debit-card";
    },
  },
  cvv: {
    type: String,
    required: function () {
      return this.paymentMethod === "credit-card" || this.paymentMethod === "debit-card";
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
