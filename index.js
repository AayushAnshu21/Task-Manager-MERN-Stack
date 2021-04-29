const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const path = require("path");

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost/task_app", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true, useFindAndModify: false, });

app.get('/tasks', async (req, res) => {
  let tasks = await Task.find({}).sort("-updatedAt");
  res.json(tasks)

})

app.post("/task", async (req, res) => {
  const { name, priority, due_date } = req.body;
  try {
    let newtask = new Task({ name, priority, due_date });
    let task = await newtask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("server error", err.message);
  }
});

app.patch("/task/:id", async (req, res) => {
  try {
    let updatetask = await Task.findById(req.params.id);
    updatetask["task_status"] = req.body["task_status"];
    let task = await updatetask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("server error", err.message);
  }
});

if (process.env.NODE_ENV === "production") {
  
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => {
  console.log("Server is up on port " + port);
});


