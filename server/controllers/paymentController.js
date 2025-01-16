import Item from "../model/itemModel.js";
import Payment from "../model/paymentModel.js";

export const makePayment = async (req, res) => {
  const { name, email, address, paymentMethod, cardNumber, expiryDate, cvv, totalPrice, cart } = req.body;

  if (!name || !email || !address || !paymentMethod || !totalPrice || !cart || cart.length === 0) {
    return res.status(400).json({ message: "All fields are required, including cart details." });
  }

  try {
    // Save order to database
    const newOrder = await Payment.create({
      name,
      email,
      address,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      totalPrice,
      cart,
    });

    // Update stock and sold count for each item
    const updatePromises = cart.map(async (cartItem) => {
      const item = await Item.findById(cartItem.productId);
      if (item) {
        item.stock = Math.max(0, item.stock - cartItem.quantity); // Decrease stock
        item.sold = (item.sold || 0) + cartItem.quantity; // Increase sold count
        await item.save();
      }
    });

    await Promise.all(updatePromises);

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to place the order.", error: err.message });
  }
};
