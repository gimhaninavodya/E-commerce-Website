import express from "express";
import {
  getUserById,
  becomeSeller,
  toggleLikedItem,
} from "../controllers/userController.js";

const router = express.Router();

// Get user by ID
router.get("/:id", getUserById);

// Update user role to 'seller'
router.patch("/:id/become-seller", becomeSeller);

router.post("/toggle-like", toggleLikedItem);


export default router;
