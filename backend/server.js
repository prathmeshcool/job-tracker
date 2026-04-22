const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const Job = require("./models/Job");

app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/jobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


