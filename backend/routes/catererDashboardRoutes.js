import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// GET ORDERS
router.get("/orders/:catererId", async (req, res) => {
  try {
    const orders = await Order.find({ caterer: req.params.catererId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.log("ERROR FETCHING ORDERS:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE STATUS
router.patch("/order/:orderId/status", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log("ERROR UPDATING STATUS:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;