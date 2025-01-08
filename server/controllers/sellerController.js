import Seller from "../model/sellerModel.js";

export const createSeller = async(req, res) => {
    const {name, email, businessName, businessType, ShopPrice, paymentMethod, cardNumber, expiryDate, cvv } = req.body;
    const newSeller = new Seller({
        name,email,businessName,businessType,ShopPrice,paymentMethod,expiryDate,cardNumber,cvv
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
