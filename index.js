const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost/tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useFindAndModify: false,
});


app.post("/tasks", async (req, res) => {
  const { name, priority, due_date } = req.body;
  d = Date.parse(due_date);
  console.log(name , priority,due_date,d)
  try {
    let newtask = new Task({ name, priority, due_date: d });
    let task = await newtask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("server error", err.message);
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
