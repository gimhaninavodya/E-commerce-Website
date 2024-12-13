import express from "express";
import {
  getUserById,
  becomeSeller,
  toggleLikedItem,
  getLikedItems,
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/userController.js";

const router = express.Router();

// Get user by ID
router.get("/:id", getUserById);

// Update user role to 'seller'
router.patch("/:id/become-seller", becomeSeller);

// Add and remove likes
router.post("/toggle-like", toggleLikedItem);

// Get user's liked items
router.get("/:id/liked-items", getLikedItems);

router.post("/cart", addToCart);

router.get("/:userId/cart", getCart);

router.patch("/cart/update", updateCartQuantity);

router.delete("/cart/remove", removeFromCart);

export default router;
