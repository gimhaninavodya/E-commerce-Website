import Membership from "../model/membershipModel.js";

export const getMemberahip = async(req, res) => {
    const { name, email, membershipType, membershipPrice, paymentMethod, cardNumber, expiryDate, cvv,} = 
    req.body;

    if (!name || !email || !membershipType || !paymentMethod || !membershipPrice || !cardNumber || !cvv) {
        return res.status(400).json({ message: "All fields are required, including cart details." });
    }

    try {
        const newMembership = await Membership.create({
          name,
          email,
          membershipType,
          paymentMethod,
          cardNumber,
          expiryDate,
          cvv,
          membershipPrice,
        });
    
        res.status(201).json({ message: "Membership placed successfully!", membership: newMembership });
    } catch (err) {
        res.status(500).json({ message: "Failed to place the membership request.", error: err.message });
    }
}