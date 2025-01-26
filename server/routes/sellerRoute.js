import express from "express";
import { createSeller, getAllSellers, getSellerByEmail } from "../controllers/sellerController.js";

const router = express.Router();

router.post("/addSeller", createSeller);

router.get("/getSeller", getAllSellers);

router.get("/getByEmail/:email", getSellerByEmail);

export default router;
