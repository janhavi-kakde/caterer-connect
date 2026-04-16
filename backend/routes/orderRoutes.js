import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/orders — Place new order
router.post("/", protect, async (req, res) => {
  try {
    const { caterer, items, totalAmount, eventDate, eventAddress, guestCount, specialInstructions } = req.body;

    const order = await Order.create({
      user: req.user._id,
      caterer,
      items,
      totalAmount,
      eventDate,
      eventAddress,
      guestCount,
      specialInstructions,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/my — Logged-in user's past orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("caterer", "name cuisine price rating image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id — Single order
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("caterer", "name cuisine price rating image");

    if (!order || order.user.toString() !== req.user._id.toString())
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/cancel
router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.user.toString() !== req.user._id.toString())
      return res.status(404).json({ message: "Order not found" });

    if (order.status === "delivered")
      return res.status(400).json({ message: "Cannot cancel a delivered order" });

    order.status = "cancelled";
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;