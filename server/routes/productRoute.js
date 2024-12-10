import express from "express";
import { addItem, getAllItems, getItemsByCategory, getUserItems } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/getAll", getAllItems);

router.post("/create", upload.array("images", 3), addItem);

router.get("/:userId", getUserItems);

router.get("/category/:category", getItemsByCategory);

router.get("/category/:category/:subCategory", getItemsByCategory)


export default router;
