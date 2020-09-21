const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
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
