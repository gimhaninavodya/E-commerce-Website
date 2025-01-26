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


export const getAllPayments = async (req, res) => {
  try {
    const payment = await Payment.find();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPaymentByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const payment = await Payment.find({ email });

    if (!payment || payment.length === 0) {
      return res.status(404).json({ success: false, message: "No payment found." });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch payment." });
  }
};
