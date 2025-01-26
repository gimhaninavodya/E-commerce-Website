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

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteFeedback = await Feedback.findByIdAndDelete(id);
    if (!deleteFeedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found.' }); 
    }
    res.status(200).json({ success: true, message: 'Feedback deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  const { id } = req.params;

  const { name, email, roll, rating, message,status } = req.body;
  try {
      const existingFeedback = await Feedback.findById(id);
      if (!existingFeedback) {
          return res.status(404).json({ success: false, message: 'Feedback not found.' });
      }

      // Updating Feedback by ID
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, { name, email, roll, rating, message,status }, { new: true });
      if (!updatedFeedback) {
          return res.status(404).json({ success: false, message: 'Feedback not found.' });
      }
      res.status(200).json({ success: true, message: 'Feedback updated successfully.', Feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeedbackByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const feedback = await Feedback.find({ email });

    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ success: false, message: "No feedback found." });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch feedback." });
  }
};
