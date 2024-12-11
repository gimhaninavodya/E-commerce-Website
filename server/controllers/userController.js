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
