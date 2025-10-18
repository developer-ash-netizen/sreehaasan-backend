// server.js or app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS securely
app.use(cors({
  origin: ["https://sreehaasan.netlify.app", "http://localhost:5173"], // frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
  credentials: true, // if you ever use cookies or auth
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/projects", projectRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
