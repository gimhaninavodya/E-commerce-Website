import express from "express";
import { addFeedback, deleteFeedback, getAllFeedback, getFeedbackByEmail, updateFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/addFeedback", addFeedback);

router.get("/getFeedback", getAllFeedback);

router.delete("/deleteFeedback/:id", deleteFeedback);

router.put("/updateFeedback/:id", updateFeedback);

router.get("/getFeedbackByEmail/:email", getFeedbackByEmail);

export default router;