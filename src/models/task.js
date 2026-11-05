const { mongoose } = require("../db");

const task = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    done: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", task);

module.exports = Task;
