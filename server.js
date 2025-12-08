// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// JSON parsing for non-file routes
app.use(express.json());

// Serve uploaded files statically at /uploads/*
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Mount routes
app.use("/api/projects", projectRoutes);

app.use("/api/projects", projectRoutes);
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB and start
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
