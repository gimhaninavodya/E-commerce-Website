import Seller from "../model/sellerModel.js";

export const createSeller = async(req, res) => {
    const {name, email, businessName, businessType, shopPrice, paymentMethod, cardNumber, expiryDate, cvv } = req.body;
    const newSeller = new Seller({
        name,email,businessName,businessType,shopPrice,paymentMethod,expiryDate,cardNumber,cvv
    });
  try {
    await newSeller.save();
    res.status(201).json({ message: "Seller registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register seller." });
  }
}


export const getAllSellers = async(req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sellers." });
  }
}

export const getSellerByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    // Fetch seller details by email
    const seller = await Seller.findOne({ email: email });

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found." });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch seller details." });
  }
};
