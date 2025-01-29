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
  clearCart,
  updateUserById,
  deleteUser,
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

router.post("/cart/clear", clearCart);

router.put("/update/:id", updateUserById);

router.delete("/deleteUser/:id", deleteUser);

export default router;
