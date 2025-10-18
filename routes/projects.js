import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Simple admin API key (you can make this secure later)
const ADMIN_KEY = process.env.ADMIN_KEY;

// ✅ Add a new project
router.post("/", async (req, res) => {
  const { adminKey } = req.headers;
  if (adminKey !== ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project added successfully!", project });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
