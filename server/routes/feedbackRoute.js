import express from "express";
import { addFeedback, getAllFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/addFeedback", addFeedback);

router.get("/getFeedback", getAllFeedback);

export default router;