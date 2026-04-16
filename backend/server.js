import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import catererRoutes from "./routes/catererRoutes.js";
// import authRoutes from "./routes/auth.js";
import authRoutes from "./routes/authRoutes.js";       // ← ADD
import orderRoutes from "./routes/orderRoutes.js";  

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/caterers", catererRoutes);
app.use("/api/auth", authRoutes);                      // ← ADD
app.use("/api/orders", orderRoutes);  

// 🔥 CONNECT MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB ERROR:", err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});