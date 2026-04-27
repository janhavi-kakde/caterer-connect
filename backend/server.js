import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import catererRoutes from "./routes/catererRoutes.js";
// import authRoutes from "./routes/auth.js";
import authRoutes from "./routes/authRoutes.js";       // ← ADD
import orderRoutes from "./routes/orderRoutes.js";  
import catererDashboardRoutes from "./routes/catererDashboardRoutes.js";


dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/caterers", catererRoutes);       // 🔹 for listing caterers
app.use("/api/caterer", catererDashboardRoutes); // 🔹 for dashboard/orders
app.use("/api/auth", authRoutes);                      // ← ADD
app.use("/api/orders", orderRoutes);  
// 🔥 CONNECT MONGO
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Mongo Connected");
  console.log("DB Name:", mongoose.connection.name);
})
.catch(err => console.log("DB ERROR:", err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});