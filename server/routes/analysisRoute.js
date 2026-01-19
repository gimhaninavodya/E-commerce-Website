import {getSellerAnalysis} from "../controllers/analysisController.js";
import express from "express";

const router = express.Router()

router.get('/seller/:sellerId', getSellerAnalysis)

export default router;