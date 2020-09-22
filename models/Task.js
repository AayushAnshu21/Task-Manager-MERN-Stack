const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      immutable: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
      immutable: true,
    },
    due_date: {
      type: String,
      required: true,
      immutable: true,
    },
    task_status: {
      type: String,
      enum: ["To Do", "Review", "Completed"],
      default: "To Do",
    },
  },
  { timestamps: true }
);

module.exports = Task = mongoose.model("tasks", TaskSchema);
