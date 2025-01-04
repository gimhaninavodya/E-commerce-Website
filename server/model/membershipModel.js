import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    required: true,
  },
  membershipPrice: {
    type: Number,
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
      return (
        this.paymentMethod === "credit-card" ||
        this.paymentMethod === "debit-card"
      );
    },
  },
  expiryDate: {
    type: String,
    required: function () {
      return (
        this.paymentMethod === "credit-card" ||
        this.paymentMethod === "debit-card"
      );
    },
  },
  cvv: {
    type: String,
    required: function () {
      return (
        this.paymentMethod === "credit-card" ||
        this.paymentMethod === "debit-card"
      );
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;