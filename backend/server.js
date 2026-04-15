import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import catererRoutes from "./routes/catererRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/caterers", catererRoutes);

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