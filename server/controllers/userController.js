import User from "../model/userModel.js";


// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

// Update user role to 'seller'
export const becomeSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role: "seller", isSeller: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User is now a seller", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error });
  }
};

// Toggle liked item
export const toggleLikedItem = async (req, res) => {
  const { userId, productId } = req.body; // Changed `itemId` to `productId`

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const likedIndex = user.likedItems.indexOf(productId);

    if (likedIndex === -1) {
      // Add to liked items
      user.likedItems.push(productId);
    } else {
      // Remove from liked items
      user.likedItems.splice(likedIndex, 1);
    }

    await user.save();
    res.status(200).json({ likedItems: user.likedItems });
  } catch (error) {
    res.status(500).json({ message: "Error updating liked items", error });
  }
};

// Get liked items of a user
export const getLikedItems = async (req, res) => {
  const { id } = req.params; // User ID
  try {
    const user = await User.findById(id).populate("likedItems");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.likedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching liked items", error });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (cartItemIndex > -1) {
      // Update quantity if the item is already in the cart
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("cart.productId"); // Ensure product details are populated
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.cart); // Returning the cart with populated product data
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Update cart item quantity
export const updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (cartItemIndex > -1) {
      if (quantity === 0) {
        user.cart.splice(cartItemIndex, 1); // Remove item if quantity is zero
      } else {
        user.cart[cartItemIndex].quantity = quantity;
      }
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the cart item index and remove it
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

// Clear user's cart
export const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = []; // Clear the cart
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart.", error });
  }
};
