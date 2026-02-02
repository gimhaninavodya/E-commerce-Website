import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoute.js";
import prodRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import analysisRoute from "./routes/analysisRoute.js";
import path from "path";
import { fileURLToPath } from 'url';


dotenv.config();

mongoose.set('strictQuery', false);

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middlewares
app.use(cors({
    origin: "https://lydia-three.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/auth", authRouter);
app.use("/api/product", prodRoute);
app.use("/api/user", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/analysis", analysisRoute);


// Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}!`);
});
