const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(400).json({ message: "Invalid" });

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});

module.exports = router;