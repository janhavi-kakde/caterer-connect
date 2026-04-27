import express from "express";
import Caterer from "../models/Caterer.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();


// ===============================
// 🔥 1. DASHBOARD (PUT FIRST)
// ===============================
router.get("/dashboard/:catererId", async (req, res) => {
  try {
    const orders = await Order.find({ caterer: req.params.catererId });

    res.json({
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
      pendingOrders: orders.filter(o => o.status === "pending").length,
    });
  } catch (err) {
    console.log("DASHBOARD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 🔥 2. PROFILE
// ===============================
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// 🔥 3. MENU UPDATE
// ===============================
router.patch("/menu/:catererId", async (req, res) => {
  try {
    const { menu, image, location } = req.body;

    const updated = await Caterer.findByIdAndUpdate(
      req.params.catererId,
      {
        $set: {
          menu,
          image,
          location
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Caterer not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("MENU UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// ✅ 4. GET ALL CATERERS (CARDS)
// ===============================
router.get("/", async (req, res) => {
  try {
    const data = await Caterer.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// ❗ 5. GET BY ID (KEEP LAST ALWAYS)
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const data = await Caterer.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;