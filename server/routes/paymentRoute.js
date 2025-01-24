import express from "express";
import { getAllPayments, makePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", makePayment);

router.get("/getPayment", getAllPayments);

export default router;