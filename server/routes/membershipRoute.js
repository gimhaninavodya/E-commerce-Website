import express from "express";
import { getMemberahip } from "../controllers/membershipController.js";

const router = express.Router();

router.post("/getMembership", getMemberahip);

export default router;