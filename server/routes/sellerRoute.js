import express from "express";
import { createSeller, getAllSellers } from "../controllers/sellerController.js";

const router = express.Router();

router.post("/addSeller", createSeller);

router.get("/getSeller", getAllSellers);

export default router;
