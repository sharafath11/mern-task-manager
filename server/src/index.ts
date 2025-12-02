import "reflect-metadata";
import express from "express";
import "./core/di/container"; 
import authRoutes from "./routes/auth.Routes";
import taskRoutes from "../src/routes/task.routes"
import { connectDB } from "./config/database";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path";
import { startOverdueCron } from "./cron/overdueCron";

dotenv.config()
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"], 
    credentials: true, 
  })
);
startOverdueCron();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
connectDB()
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
