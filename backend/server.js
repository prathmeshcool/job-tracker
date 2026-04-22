const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const Job = require("./models/Job");

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Create job
app.post("/jobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete job
app.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job
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

// Start server only after DB connects
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("MongoDB connection error:");
    console.log(error);
  }
};

startServer();