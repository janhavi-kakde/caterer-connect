import express from "express";
import Caterer from "../models/Caterer.js";

const router = express.Router();

// ✅ GET ALL FIRST
router.get("/", async (req, res) => {
  try {
    const data = await Caterer.find();
    console.log("ALL DATA:", data); // 🔍 DEBUG
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET BY ID AFTER
router.get("/:id", async (req, res) => {
  try {
    const data = await Caterer.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST
router.post("/", async (req, res) => {
  try {
    const newCaterer = new Caterer(req.body);
    await newCaterer.save();
    res.json(newCaterer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;