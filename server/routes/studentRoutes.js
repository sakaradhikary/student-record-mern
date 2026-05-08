const express = require("express");
const Student = require("../models/student");
const auth = require("../middleware/auth");

const router = express.Router();

// IMPORTANT: protect ALL student routes
router.use(auth);

// GET
router.get("/", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

module.exports = router;