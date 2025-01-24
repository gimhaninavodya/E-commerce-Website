import Feedback from "../model/feedbackModel.js";

export const addFeedback = async (req, res) => {
  const { name, email, roll, rating, message,status } = req.body;

  if (!name || !email || !roll  || !rating || !message ) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const newFeedback = new Feedback({
    name,
    email,
    roll ,
    rating,
    message,
    status,
  });

  try {
    await newFeedback.save();
    res.status(201).json({ success: true, message: "Feedback added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};