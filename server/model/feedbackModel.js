import mongoose, { Schema } from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  roll: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true  
  },
  message: { 
    type: String, 
    required: true 
  },
});
  
const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;