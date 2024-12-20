import express from "express";
import { makePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", makePayment);

export default router;