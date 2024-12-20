import Payment from "../model/paymentModel.js";

export const makePayment = async (req, res) => {
  const { name, email, address, paymentMethod, cardNumber, expiryDate, cvv, totalPrice, cart } =
    req.body;

  // Validate data
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

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to place the order.", error: err.message });
  }
};
