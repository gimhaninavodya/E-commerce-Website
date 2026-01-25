import Payment from "../model/paymentModel.js";
import mongoose from "mongoose";

export const getSellerAnalysis = async (req, res) => {
    const { sellerId } = req.params;
    try {
        const stats = await Payment.aggregate([
            { $unwind: "$cart" },
            {
                $lookup: {
                    from: "items",
                    localField: "cart.productId",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            { $unwind: "$itemDetails" },
            { $match: { "itemDetails.seller": new mongoose.Types.ObjectId(sellerId) } },
            {
                $project: {
                    category: "$itemDetails.category",
                    quantity: "$cart.quantity",
                    monthName: { $dateToString: { format: "%b", date: "$date" } },
                    monthNum: { $month: "$date" },
                    year: { $year: "$date" },
                    // Logic: Price - (Price * 0.20) - 10
                    netEarning: {
                        $subtract: [
                            {
                                $subtract: [
                                    "$itemDetails.price",
                                    { $multiply: ["$itemDetails.price", 0.25] }
                                ]
                            },
                            15
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { month: "$monthName", category: "$category", monthNum: "$monthNum", year: "$year" },
                    totalSold: { $sum: "$quantity" },
                    // Total Profit = Net Earning per item * Quantity sold
                    totalProfit: { $sum: { $multiply: ["$netEarning", "$quantity"] } }
                }
            },
            { $sort: { "_id.year": 1, "_id.monthNum": 1 } }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};