import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import volunteerRoutes from "./routes/volunteerroutes.js";
import homeRoutes from "./routes/homeroutes.js";
import donorRoutes from "./routes/donorroutes.js";
import authRoutes from "./routes/authroutes.js";
import donationRoutes from "./routes/donationroutes.js";
import aiRoutes from "./routes/ai.js";
import helpRequestRoutes from "./routes/helprequestroutes.js";

/* ===== DEBUG ENV ===== */
console.log("🌍 GROQ KEY:", process.env.GROQ_API_KEY ? "LOADED ✅" : "MISSING ❌");

/* ===== DB ===== */
connectDB();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== STATIC ===== */
app.use("/uploads", express.static("uploads"));

/* ===== ROUTES ===== */
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/ai", aiRoutes); // ✅ GROQ CONNECTED HERE
app.use("/api/helprequests", helpRequestRoutes);
/* ===== TEST ===== */
app.get("/", (req, res) => {
  res.send("Server running with Groq AI ✅");
});

/* ===== START ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on ${PORT}`);
});