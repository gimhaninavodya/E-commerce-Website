import express from "express";
import { getAllPayments, getPaymentByEmail, makePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", makePayment);

router.get("/getPayment", getAllPayments);

router.get("/getPaymentByEmail/:email", getPaymentByEmail);

export default router;