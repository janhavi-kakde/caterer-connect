import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Caterer from "../models/Caterer.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  console.log("REGISTER HIT", req.body);

  try {
    const { name, email, password, role, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

 const user = await User.create({ name, email, password, role, phone });

// 🔥 If caterer → create business automatically
if (role === "caterer") {
  const caterer = await Caterer.create({
    name: name + "'s Catering",
    owner: user._id,
    cuisine: "",
    price: 0,
    menu: [],
  });

  // link to user
  user.catererId = caterer._id;
  await user.save();
}

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      catererId: user.catererId,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
const { email, password, role } = req.body;

const user = await User.findOne({ email });

// FIRST check user exists
if (!user || !(await user.matchPassword(password))) {
  return res.status(401).json({ message: "Invalid email or password" });
}

// THEN check role
if (role && user.role !== role) {
  return res.status(401).json({
    message: `You are not registered as a ${role}`,
  });
}

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
        catererId: user.catererId, 
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;