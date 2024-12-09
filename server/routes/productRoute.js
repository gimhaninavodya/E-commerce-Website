import express from "express";
import { addItem, getAllItems, getUserItems } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Get all items
router.get("/getAll", getAllItems);

// Create a new item
router.post("/create", upload.array("images", 3), addItem); // Allow up to 3 images

router.get("/:userId", getUserItems);

export default router;
