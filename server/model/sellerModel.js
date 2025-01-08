import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
  businessName: { 
    type: String, 
    required: true 
},
  businessType: { 
    type: String, 
    required: true 
},
  ShopPrice: {
    type: Number,
    default: 100
},
  paymentMethod: { 
    type: String, 
    required: true 
},
  cardNumber: { 
    type: String 
},
  expiryDate: { 
    type: String 
},
  cvv: { 
    type: String 
},
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
