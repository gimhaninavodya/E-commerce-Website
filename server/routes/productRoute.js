import express from "express";
import { addItem, deleteProduct, getAllItems, getItemsByCategory, getProductById, getUserItems, updateProduct } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/getAll", getAllItems);

router.post("/create", upload.array("images", 3), addItem);

router.get("/:userId", getUserItems);

router.get("/category/:category", getItemsByCategory);

router.get("/category/:category/:subCategory", getItemsByCategory);

router.get("/get/:id", getProductById);

router.delete("/deleteProduct/:id", deleteProduct);

router.put("/updateProduct/:id", updateProduct);


export default router;
