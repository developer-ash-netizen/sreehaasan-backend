import express from "express";
import { getProjects, addProject } from "../controllers/projectsController.js";

const router = express.Router();

// Routes
router.get("/", getProjects);
router.post("/", addProject);

export default router;
