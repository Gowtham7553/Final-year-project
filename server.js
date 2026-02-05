import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import volunteerRoutes from "./routes/volunteerroutes.js";
import homeRoutes from "./routes/homeroutes.js";
import donorRoutes from "./routes/donorroutes.js";
import authRoutes from "./routes/authroutes.js";
import donationRoutes from "./routes/donationroutes.js";

dotenv.config();
connectDB();

const app = express();

/* ========= MIDDLEWARE ========= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========= STATIC IMAGE ========= */
app.use("/uploads", express.static("uploads"));

/* ========= ROUTES ========= */
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);

/* ========= SERVER ========= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on ${PORT}`);
});
