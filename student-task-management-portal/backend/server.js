require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/Task");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected Successfully!!");
  }).catch((error) => console.log("MongoDB Failed", error.message));

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to Create" });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to Fetch" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: 'after' }
    );
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to Update" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if(!deleteTask){
      return res.status(404).json({message:"task Not Found"})
    }
    res.json(deleteTask);
  }catch(error){
    res.status(500).json({message:"failed to fetch Data"});
  }
});

app.get("/", (req, res) => {
  res.send("Backend is Working!!");
});

app.listen(5000, () => {
  console.log("Server is Running on Port 5000");
});