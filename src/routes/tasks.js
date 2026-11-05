const express = require("express");
const mongoose = require("mongoose");

const Task = require("../models/task");

const router = express.Router();

router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res
      .status(503)
      .json({ error: "Database is unavailable. Start MongoDB and try again." });
  }

  next();
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/add", async (req, res, next) => {
  const title =
    req.body && typeof req.body.title === "string" ? req.body.title.trim() : "";

  if (!title) {
    return res.status(400).json({ error: "Task title is required." });
  }

  if (title.length > 160) {
    return res
      .status(400)
      .json({ error: "Task title must be 160 characters or fewer." });
  }

  try {
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  if (!req.body || typeof req.body.done !== "boolean") {
    return res
      .status(400)
      .json({ error: "Task completion must be true or false." });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { done: req.body.done },
      { new: true, runValidators: true },
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
